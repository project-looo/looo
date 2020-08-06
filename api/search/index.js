let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let url = process.env.MONGODB_CONNECTION_STRING

function toArray(cursor) {
    return new Promise((resolve, reject) => {
        cursor.toArray(function(err, docs) {
            resolve(docs)
        })
    })
}

function find(query) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, async function(err, client) {
            assert.equal(null, err);
            let collection = client.db('looc').collection('looc-test-collection');
            let cursor = collection.find(query).sort({'count': -1}).limit(10);
            let res = await toArray(cursor)
            resolve(res)
        });  
    })
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let search = ""
    if (req.query && req.query.search) {
        search = req.query.search
    }    
    let query = {}
    if (search !== "") {
        query = {"domain_name": new RegExp('^' + search)}
    }
    console.log("DEBUG", query)
    let res = await find(query)

    context.res = {
        status: 200,
        body: JSON.stringify(res)
    };
        // else {
        //     context.res = {
        //         status: 400,
        //         body: "Please pass a name on the query string or in the request body"
        //     };
        // }
};