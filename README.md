# API development using JWT token for authentication in Node.js

In this article, we will be looking at how to handle authentication with Nodejs using JSON Web Token (JWT) by creating a restful APIs for our application

<b>Pre-requisites</b>

Install Nodejs and npm on your workstation

<b>What is covered?</b>

We will be developing Restful APIs, authenticating the users of our app with JSON web tokens (JWT), perform CRUD operations via authenticated routes.

Stack

    Node.js
    MySQL

Topics:

    Creating a database for our application — We will be using MySQL
    Rest APIs
    JWT Authentication
    
<b>Brief about the application:</b>

We are creating a endpoint where can register, login, verify token. We will also be deploying our application on Heroku.

<b>Setting Up database on MySQL</b>

    SignUp/Login
    Create a new database
    
<b>Let’s Install the latest version of packages needed to develop our application</b>

```php
npm install express
```

<b>Express Js</b>

Express.js is a minimal and flexible Nodejs framework which provides lots . of features to develop web and mobile applications. It's easy to create an API with HTTP utility and middlewares with Express.js

Here’s how our package.json will look like:

```php
{
  "name": "login-register-api",
  "version": "1.0",
  "description": " A authentication API Node JS",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "lint": "eslint --fix src",
    "test": "mocha --exit"
  },
  "keywords": [],
  "author": "Baun",
  "repository": {
    "type": "git",
    "url": "https://github.com/achmadbaund/login-register-api-express"
  },
  "license": "MIT",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^4.2.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "mysql2": "^2.2.5",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "sequelize": "^6.3.5"
  },
  "devDependencies": {
    "eslint": "^7.14.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-plugin-import": "^2.22.1",
    "mocha": "^8.2.1",
    "nodemon": "^2.0.6",
    "supertest": "^6.0.1"
  }
}
```

As you see, in scripts, kindly add dev and start to the scripts

Create an index.js file into the root of our project folder “login-register-api-express”:
```php
mkdir src
touch src/index.js
```

Set up the express server with below code

```php
const app = require("./app");

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`apps running in port :${port}`);
});
```
