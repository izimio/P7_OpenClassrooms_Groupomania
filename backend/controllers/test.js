const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', 'jojo69610', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});


    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
        console.log(results);
      } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

exports.all = (req, res, next) => {
    sequelize.connect(function(err) {
        if (err) throw err;
        sequelize.query("SELECT * FROM test", function (err, result, fields) {
         if (err) throw err;
             console.log(result);
             return res.status(201).json({ result })
             });
        });
    };


