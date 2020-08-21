/* eslint-disable import/no-unresolved */
const { MongoClient, ObjectId } = require('mongodb');
const assert = require('assert');

const url = process.env.MONGODB_CONNECTION_STRING;

function find(query) {
  return new Promise((resolve) => {
    MongoClient.connect(url, async (err, client) => {
      assert.equal(null, err);
      const collection = client.db('looc').collection('looc-test-collection');
      const doc = await collection.findOne(query);
      const mostActiveRepos = [];
      // eslint-disable-next-line
      for (let i in doc.most_popular_repos) {
        mostActiveRepos[i] = {
          name: doc.most_popular_repos[i].repo_name,
          description: null,
          commits: doc.most_popular_repos[i].commit_count,
          starts: null,
          url: null,
        };
      }
      resolve({
        id: doc._id,
        position: doc.position,
        name: doc.domain_name,
        logo: null,
        commits: doc.count,
        country: null,
        website: null,
        github: null,
        repos: mostActiveRepos,
      });
    });
  });
}

module.exports = async (context, req) => {
  if (!req.query || !req.query.id) {
    context.res = {
      status: 400,
      body: '{"error": "Id is required"}',
    };
    return;
  }
  const { id } = req.query;
  context.log('Request get_details', id);

  let query;
  if (id !== '') {
    query = { _id: ObjectId(id) };
  }
  const res = await find(query);

  context.res = {
    status: 200,
    body: JSON.stringify(res),
  };
};
