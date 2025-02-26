const client = require ('./client.cjs');
const createUser = async (userName,password) => {
  try {
    await client.query(`
      INSERT INTO users (name, password)
      VALUES ('${userName}','${password}');
    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser
};