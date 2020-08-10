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

function find(query, page) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, async function(err, client) {
            assert.equal(null, err);
            let collection = client.db('looc').collection('looc-test-collection');
            let cursor = collection.find(query).sort({'count': -1}).skip(50*(page-1)).limit(50);
            let res = await toArray(cursor)
            resolve(res)
        });  
    })
}

module.exports = async function (context, req) {
    let search = ""
    let page = 1
    if (req.query && req.query.query) {
        search = req.query.query
    }
    if (req.query && req.query.page && req.query.page > 0) {
        page = req.query.page
    }
    context.log('Request search', search);
    let query = {}
    if (search !== "") {
        query = {"domain_name": new RegExp('^' + search)}
    }
    let records = await find(query, page)
    let ret = {
        "total": records.length, 
        "page": 1,
        "perPage": 50,
        "companies": []
    }
    for (i in records) {
        ret.companies[i] = {
            "id": records[i]._id.toString(),
            "position": records[i].position,
            "name": records[i].domain_name,
            "logo": null,
            "commits": records[i].count,
            "website": null,
            "github": null
        }
    }
    
    context.res = {
        status: 200,
        body: JSON.stringify(ret)
    };
};
