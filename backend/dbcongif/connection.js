const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', 'jojo69610', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

async function testConnection() {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      let [results, metadata] = await sequelize.query('SELECT * FROM test');
      console.log(results);
      let [results2, metadata2] = await sequelize.query("UPDATE test SET nom = 'marc' WHERE nom = 'bob' AND id % 2 = 0 ");
      console.log(results2);
      } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}

testConnection();