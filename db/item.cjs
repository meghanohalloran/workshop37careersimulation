const client = require('./client.cjs');
const createItem = async (itemName) => {
  try {
    await client.query(`
      INSERT INTO item
      VALUES ('${itemName}')
    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createItem
};