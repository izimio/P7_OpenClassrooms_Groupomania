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
  Inside the terminal write the following command.
`sequelize db:create *YOUR DB NAME*`
--
 At this point, inside the /backend folder create a file called `.env` and just as before copy past the followings code inside of it, replacing the values with your informations
 ---
 
  ```
    JWT_SECRET= "YOUR JWT SECRET KEY"
```

And that's it ! 
===

Now just enter `npm run dev` inside the console and the project's backend will be on ! 
--

```diff
- Last thing, go to a random controller file and restart nodemon by __CTRL + S__ to create all the tables inside your DB
```
