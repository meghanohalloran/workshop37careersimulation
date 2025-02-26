const client = require('./client.cjs');
const { createUser } = require('./users.cjs');
const { createItem } = require('./item.cjs');
const { createReview } = require('./review.cjs')

const dropTables = async() => {
try {

await client.query(`
  DROP TABLE IF EXISTS review;
  DROP TABLE IF EXISTS item;
  DROP TABLE IF EXISTS users;
  `);
  console.log('drop tables');

} catch(err) {
console.log(err);
}
 
}

const createTables = async() => {

  try {
    await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(60) NOT NULL
      );
  
      CREATE TABLE item (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

    CREATE TABLE review (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      item_id INTEGER REFERENCES item(id),
      user_id INTEGER REFERENCES users(id),
      description VARCHAR(500) NOT NULL
  );
    `);
    console.log('create tables');
  } catch(err) {
    console.log(err);
  }
  
}
const syncAndSeed = async() => {

  await client.connect();
  console.log('connected to the db');

  await dropTables();
  await createTables();
  await createUser('Bob', 'bob123');
  await createUser('Ann', 'ann123');
  await createUser('Tom', 'tom123');
  await createUser('Mary', 'mary123');
  console.log('created users');

  await createItem('shirt');
  await createItem('pants');
  await createItem('socks');
  await createItem('shoes');
  console.log('created items');

  await createReview('2023-12-01', 1, 3, 'not good');
  await createReview('2022-11-11', 2, 4, 'excellent');
  await createReview('2023-08-06', 3, 2, 'good');
  await createReview('2023-11-09', 4, 1, 'fair');
  console.log('created user review');
  

  await client.end();
  console.log('disconnect db');
}

syncAndSeed();
