const client = require('./client.cjs');
const createReview = async (date, itemId, userId, description) => {
  try {
    await client.query(`
      INSERT INTO item
      VALUES (${date}, ${itemId}, ${userId}, ${description});

    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createReview
};
