# API development using JWT token for authentication in Node.js

In this article, we will be looking at how to handle authentication with Nodejs using JSON Web Token (JWT) by creating a restful APIs for our application.

**Documentation Postman - API test Node Auth JWT**

https://documenter.getpostman.com/view/6699260/UzBsGPf6

**Pre-requisites**

Install Nodejs and npm on your workstation

**What is covered?**

We will be developing Restful APIs, authenticating the users of our app with JSON web tokens (JWT).

Stack

    Node.js
    MongoDB

Topics:

    Creating a database for our application — We will be using MongoDB atlas
    Rest APIs and Mongoose
    JWT Authentication
    
**Brief about the application:**

We are creating a endpoint where can register, login, and verify token. We will also be deploying our application on Heroku.

**Setting Up MongoDB database on MongoDB Atlas**

    SignUp/Login
    Create a new database


**Let’s Install the latest version of packages needed to develop our application**

    npm install express mongodb mongoose jsonwebtoken

**Express Js**

Express.js is a minimal and flexible Nodejs framework which provides lots . of features to develop web and mobile applications. It's easy to create an API with HTTP utility and middlewares with Express.js

**MongoDB**

MongoDB Node.js driver provides callback-based and Promise-based interaction with MongoDB. We will especially use to achieve specific goals with this as we will see further in this tutorial

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
    "mongodb": "^4.7.0",
    "mongoose": "^6.4.0",
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

As you see, in scripts, kindly add dev and start to the scripts.

Creating our database/index.js and .env file in sub directory ``` src ``` which will handle the connectivity to the sql database

    mkdir src
    mkdir src/database
    touch src/database/index.js src/app.js .env

Connect your DB with below code

database/index.js
```php
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
```
**useNewUrlParser**: This will parse the MongoDB connection string

**useCreateIndex**: Mongoose will create the index on the DB and collections

**.env**
```php
MONGO_URI='mongodb+srv://baun:g7h8j91Q@cluster0.uk7pm1e.mongodb.net/nodeauth?retryWrites=true&w=majority'
JWT_SECRET=secret
```
Create a model folder in the sub directory ``` src ``` of our project folder

    mkdir src/models
    touch src/models/users.js

**models/user.js**
```php
const mongoose  = require('mongoose')
const validator = require('validator')
const jwt       = require('jsonwebtoken')
const UserSchema  = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 6,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Please enter your password!')
            }else if(validator.equals(value.toLowerCase(),"password")){
                throw new Error('Password is invalid!')
            }else if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('Password should not contain password!')
            }
        }
    },
    token:{
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;

```


add ```require("dotenv").config();```, ```require("./database/index");```, ```require("./models/users");``` into ```src/app.js```.

**src/app.js**
```php
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./database/index");
require("./models/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hellow",
    });
});

module.exports = app;
```
Set up the index.js with below code

src/index.js
```php
const app = require("./app");

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`apps running in port :${port}`);
});
```

Set up the middleware.js with below code

src/middleware.js
```php
function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}

module.exports = {
    notFound,
    errorHandler
};
```

We will first load out mongoose package and then access the methods/function, we will connect it with our database by providing the URL string with username and password.

From your root folder, kindly run ``` npm run dev ```, and you will see our application up and running with our database connected

```php
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/index.js`
apps running in port :5000
Database connected!

```

Create an api folder and route register, login, and verify token in sub directory ``` src/api ``` of our project folder

    mkdir src/api
    touch src/api/index.js src/api/register.js src/api/login.js src/api/verifyToken.js


For users, we have fields such as username, role, password, tokens. The token array will have all our tokens generated when user sign-in.

**Implement register and login functionality**

We’ll be implementing these two routes in our application. We will be using JWT to sign the credentials and create custom password with 6 character include number and text before storing them in our database.

From the /register route, we will:

    Get user input.
    Validate if the user already exists.
    create custom password with 6 character include number and text.
    Create a user in our database.

Create the /register route structure as shown below.

api/register.js
```php
const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {
        // Get user input
        const {username, role} = req.body;

        // Validate if user exist in our database
        const oldUser = await User.findOne({'username': username});

        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

        // Create user in our database
        var crypto = require("crypto");
        var password = crypto.randomBytes(3).toString('hex')
        const user = new User({
          username,
          role,
          password,
          token : ''
        });

        await user.save();

        // return new user
        res.status(201).json({ username: user.username, role: user.role, password: user.password});

    } catch (err) {
      console.log(err);
    }

});

module.exports = router;
```
To generate the user password, we will be using crypto.randomBytes(3). This will be output with 6 character include number and text before the user is saved into the database.

Output of this route is username (string), role (string) and password (string).

```
{
    "username": "mambaun",
    "role": "admin",
    "password": "94c749"
}
```

For the /login route, we will:

    Get user input.
    Validate if the user exists.
    Verify user password against the password we saved earlier in our database.
    And finally, create a signed JWT token.

Create the /login route structure as shown below.

api/login.js
```php
const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {

    try {
        // Get user input
        const { username, password } = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({ 'username': username });

        if (user && user.password === password) {

            // Create token
            const jwtToken = jwt.sign(
                { _id: user._id, username: user.username },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2m",
                }
            );

            const id = user._id
            //update Token user
            let updatedUser = {}
            updatedUser.token = jwtToken

            User.findByIdAndUpdate(id, updatedUser, function(err, updatedData){
                if(err){
                    // console.log(err)
                }
                else {
                    console.log(updatedData)
                }
            })

            // output
            res.status(201).json({ _id: user._id, username: user.username, token: jwtToken});
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;
```
**jwt.sign**

**Payload**: The first parameter here is the payload, we have provided the id as a string literals

**Secret key**: The second parameter is a secret key

Output of this route is id(int) username (string), token (string).

```
{
    "id": 4,
    "username": "mambaun",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJtYW1iYXVuIiwiaWF0IjoxNjU2MDU0NDQyLCJleHAiOjE2NTYwNTQ1NjJ9.B5xYYkNWy--edc_Urm-7nGQz4W_DN8PXxGETkmU9FG0"
}
```

**Create middleware for authentication**

Our middleware will verify whether the jwt token provided from the request header is authorized or not. If yes, it will authenticate successfully and call next() function to execute further code, otherwise, it throws an error as “jwt expired".

Add the following snippet inside.

    mkdir middleware
    touch middleware/auth.js

auth.js
```php
const jwt = require("jsonwebtoken");
const User = require("../src/models/users");

async function isAuthenticated(req, res, next) {
    try {
        let token = req.get("authorization");
        if (!token) {
            return res.status(404).json({is_valid: false, msg: "Token not found"});
        }
        token = token.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);

        let decoded = jwt.decode(token, { complete: true });

        req.expiredAt = new Date(decoded.payload.exp * 1000)
        req.username = user.username
        next()
    } catch (error) {
        return res.status(401).json({is_valid: false, msg: error.message});
    }
}


module.exports = { isAuthenticated }
```

Now let’s create the /verifyToken route with the following snippet to test the ```middleware/auth.js```. We can now add a token in the header with the key Authentication. Output of this route is paramater is_valid (boolean), expired_at (date), and username (string).

api/verifyToken.js
```php
const express = require("express");
const User = require("../models/users");
const { isAuthenticated } = require("../../middleware/auth");
const router = express.Router();


router.get("/verify-token", isAuthenticated, (req, res) => {

    res.json({ is_valid: true, username: req.username, expiredAt: req.expiredAt });
});


module.exports = router;
```
Output of this route is is_valid(string) username (string), expiredAt (date).

```
{
    "is_valid": true,
    "username": "mambaun1",
    "expiredAt": "2022-06-25T06:06:01.000Z"
}
```

**Javascript Promises to Async/Await**

We will be using Async/Await to work with promises with asynchronous functions.

Putting Async in front of the function expects it to return the promise. This means all async function has a callback
Await can be used for single promises to get resolve or reject and return the data or error
Async/Await behaves like synchronous code execution
There can be multiple await in the single async function
We will be using try/catch construct, which make async/await easy to handle synchronous and asynchronous code
Async/Await helps you to deal with callback hell

**Http Status Code**

These are some of the status code which we will be using for our application

**200**: This is the default status which will be passed to the client

**201**: It indicates that response is created and send back to the client

**400**: It indicates a bad request sent to the server

**500**: It indicates there are some internal server issues, for e.g. server is down

**HTTP Methods**

HyperText Transfer Protocol (HTTP) is a stateless protocol, which means that the client and server know how to handle the data for that instance only. Once the browser initiates the request and sends to the server, the server will send a response back to the client. On every request initialized, a new connection is established between client and server. The widely-used HTTP verbs are GET, POST, PUT, PATCH, DELETE

**GET**: Itis used to retrieve all the information from the server using the URI and does not modify any kind of data

**POST**: It is used to send data to the server

**PATCH**: It is used to update and modifies the resource partially

**PUT**: It is used to replace the resource entirely, unlike the PATCH method

**DELETE**: This will delete the resource

**Create ```api/index``` for Routing refers to the application endpoints.**

api/index.js
```php
const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const verifyToken = require("./verifyToken");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(verifyToken);

module.exports = router;
```

Routing refers to the application endpoints which will pass the request to the server and server will send back the response to the client via those routes. We will be using an express router in our tutorial.

Continue an index.js file into the sub directory ``` src ``` of our project folder “login-register-api-express”.

Import the Login, Register and Verify Token routing in directori ```src/api/index.js``` to our main file — app.js
This is how our final app.js file will look like.

src/app.js
```php
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./database/index");
require("./models/users");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hellow",
    });
});

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
```
#Deploying our application on Heroku

Creating the production environment for our application

Install ```env-cmd```: This makes all our environment variable available all over to our scripts

    npm install env --save-dev

Create a config folder in the root of our project

    mkdir config
    touch config/env.dev

The env.dev file will contain all our environment variables

    MONGO_URI=yoururlstring
    JWT_SECRET=yourtopsecretcode
    PORT=portonwhichtheappwillrun


In package.json, make below changes script

```
"scripts": {
"dev": "env-cmd ./config/dev.env nodemon src/index.js",
"start": "node src/index.js"
}
```

Replace your mongo string url with process.env.MONGODB_URL in the ```src/database/index.js``` file& your jwt-secret with process.env.JWT_SECRET in the ```middleware/auth.js``` & ```src/login.js```

    Signup for your Heroku account.
    Into the root folder of our application “nodejs_auth”, run below commands

````
    heroku create
    
    heroku config:set PORT=5000 MONGO_URI=mongodburlstring JWT_SECRET=yoursecret
    
    git push heroku master
````
