const client = require ('./client.cjs');
const bcrypt = require('bcrypt');
const createUser = async (userName,password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log (encryptedPassword);
    await client.query(`
      INSERT INTO users (name, password)
      VALUES ('${userName}','${password}');
    `);
  } catch (err) {
    console.log(err);
  }
};

const authenticateUser = async(username, password) => {
  try {
      const {rows} = await client.query(`
        SELECT * FROM users 
        WHERE username=${username} AND password=${password};
        `);

        console.log(rows);
  }catch(err) {
    console.log(err);

  }
};
module.exports = {
  createUser
};