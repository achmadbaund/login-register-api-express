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

We are creating a blog application where the user can signup, signup, post a blog, comment on the post, with a complete authentication system. We will also be deploying our application on Heroku.

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
