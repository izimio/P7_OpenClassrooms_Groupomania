const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', 'jojo69610', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

  async function test() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      const [results, metadata] = await sequelize.query('SELECT * FROM test');
        console.log(results);
      } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  test();