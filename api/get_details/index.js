let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
const { ObjectId } = require('mongodb');
let url = process.env.MONGODB_CONNECTION_STRING

function find(query) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, async function(err, client) {
            assert.equal(null, err);
            let collection = client.db('looc').collection('looc-test-collection');
            let doc = await collection.findOne(query);
            let mostActiveRepos = []
            for (i in doc.most_popular_repos) {
                mostActiveRepos[i] = {
                    name: doc.most_popular_repos[i].repo_name,
                    description: null,
                    commits: doc.most_popular_repos[i].commit_count,
                    starts: null,
                    url: null
                }
            }
            resolve({
                "id": doc._id,
                "position": doc.position,
                "name": doc.domain_name,
                "logo": null,
                "commits": doc.count,
                "country": null,
                "website": null,
                "github": null,
                "repos": mostActiveRepos
            })
        });  
    })
}

module.exports = async function (context, req) {
    if (!req.query || !req.query.id) {
        context.res = {
            status: 400,
            body: '{"error": "Id is required"}'
        };
        return
    }
    let id = req.query.id
    context.log('Request get_details', id);

    if (id !== "") {
        query = {"_id": ObjectId(id)}
    }
    let res = await find(query)

    context.res = {
        status: 200,
        body: JSON.stringify(res)
    };
};
