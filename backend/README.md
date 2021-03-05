JoshuaBrionne_7_22022021
==

------------------------------------------------------------------------------------------------------------------------------------------------------------------------
7'th project's backend
===

How to make this work : 
=========

First, `cd backend` *if you're not already in this folder*
--
Next, `npm install`
--
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Inside the terminal write the following command.
`sequelize db:create groupomania`
--
Afterwards : rename the `config/config.json.schema` into => `config.json`
--
Inside of it copy past this and replace the values with your DB's informations
--
```shell{
    "development": {
      "username": "YOUR_USERNAME",
      "password": "YOUR_PASSWORD",
      "database": "YOUR_DB_NAME",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "operatorsAliases": 0
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  ```
 At this point, inside the /backend folder create a file called `.env` and just as before copy past the followings code inside of it, replacing the values with your informations
 ---
 
  ```
  JWT_SECRET="YOU RANDOM SECRET TOKEN"
  PORT= The port for the app
```

And that's it ! 
===

Now just enter `npm run dev` inside the console and the project's backend will be on ! 
--
