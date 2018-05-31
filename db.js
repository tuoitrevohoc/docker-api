const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL || 'mongodb://localhost';

async function getCounter() {
  console.log('get counter');

  const client = await MongoClient.connect(url);
  const db = client.db('counter');
  const collection = db.collection('counter');
  let counter = 0;

  let data = await collection.findOne({});

  console.log(`data: ${JSON.stringify(data)}`);
  if (data === null) {
    await collection.insertOne({counter});
  } else {
    counter = data.counter;
  }

  counter += 1;

  await collection.findOneAndReplace({}, {counter});
  await client.close(false);
  console.log(`get away with counter : ${counter}`);

  return counter;
}

module.exports = getCounter;
