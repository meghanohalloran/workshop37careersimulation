const client = require('./client.cjs');
const createReview = async (date, itemId, userId, description) => {
  try {
    await client.query(`
      INSERT INTO review (date, item_id, user_id, description)
      VALUES ('${date}', ${itemId}, ${userId}, '${description}');

    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createReview
};
