<h1 align="center">
Dawini Application 💉💊
</h1>

<p align="center">

![localhost_4200_(Nest Hub Max)](https://user-images.githubusercontent.com/97320765/222997521-03f52a6c-af35-4c5f-99ca-088dc557c4a8.png)

</p>


### RESTful API Node Express Mongoose Application about Medical organization called Dawini 👩‍💻 ⭐

The project builds RESTful APIs using Node.js, Express and Mongoose,... 🔥⭐  

### Manual Installation 📥👋  :

Clone the repo 🫶 🫡 :

```bash
git clone https://github.com/libeyondea/backend-node-express.git
cd backend-node-express
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

<!--
Generate JWT RS256 key:

```bash
ssh-keygen -t rsa -P "" -b 2048 -m PEM -f storage/jwtRS256.key
ssh-keygen -e -m PEM -f storage/jwtRS256.key > storage/jwtRS256.key.pub
# encode base64
cat storage/jwtRS256.key | base64 # edit JWT_ACCESS_TOKEN_SECRET_PRIVATE in .env
cat storage/jwtRS256.key.pub | base64 # edit JWT_ACCESS_TOKEN_SECRET_PUBLIC in .env
```
-->

## Table of Contents
<div align="center">

|        Commands 📜      |          Environment variables 🌐             |     Project Structure 🧱               |  api endponts  🐉             |           
|-----------------------|------------------------------------------------|----------------------------------------|--------------------------------|
| [Commands](#commands) | [Environment Variables](#environment-variables)| [Project Structure](#project-structure)| [API Endpoints](#api-endpoints)|                         |-----------------------|------------------------------------------------|----------------------------------------|--------------------------------| 
      
</div>

## Commands

Running in development:

```bash
npm run start:dev
```

Running in production:

```bash
npm run start:prod
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
#Environment 
NODE_ENV=development
NODE_ENV=production

# Port
PORT = 8000

# Host
BASE_URL = localhost:8000

# Mongo DB
db_user = your user name of atlas db 
db_password = your password
db_name = your db name
db_url= mongodb+srv://db_user:db_password@cluster0.qjpxegw.mongodb.net/db_name?retryWrites=true&w=majority
local_db_url = mongodb://127.0.0.1:27017/db_name

# JWT
JWT_SECRET = 

# Token expires
JWT_EXPIRE =
JWT_COOKIE_EXPIRE =

# SMTP configuration
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 465
EMAIL_USER = 
EMAIL_PASSWORD = 
```

## Project Structure

 ```
├── E-COMMERCE-MEDICAL
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
|   ├── .env
│   ├── config
│   │   ├── database.js
│   ├── models
│   │   ├── userModel.js
│   │   ├── itemModel.js
│   │   ├── newsItemModel.js
│   │   ├── cartModel.js
│   │   └── orderModel.js
│   ├── middlewares
│   │   ├── errorMiddleware.js
│   │   ├── uploadImageMiddleware.js
│   │   └── validatorMiddleware.js
│   ├── utils
│   │   ├── validators
│   │   │   ├── userValidator.js
│   │   │   ├── adminValidator.js
│   │   │   ├── authValidator.js
│   │   │   ├── itemValidator.js
│   │   │   ├── cartValidator.js
│   │   │   └── orderValidator.js
│   │   ├── ApiError.js
│   │   ├── apiFeatures.js
│   │   ├── sendEmail.js
|   |   ├── generateToken.js
|   |   ├── uploadImgCloudinary.js
│   ├── controllers
│   │   ├── handleFactory.js
│   │   ├── userController.js
│   │   ├── auth.js
│   │   ├── itemController.js
│   │   ├── newItemController.js
│   │   ├── addressController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── router
│   │   ├── authRoute.js
│   │   ├── userRoute.js
│   │   ├── itemRoute.js
│   │   ├── newsItemRoute.js
│   │   ├── addressRoute.js
│   │   ├── cartRoute.js
│   │   └── orderRoute.js
│   ├── uploads
│   │   ├── profile
│   │   ├── items
└──  .gitignore
 ```
 

## API Endpoints on postman :

- [User_Api](https://documenter.getpostman.com/view/25405822/2s93JnUS7q) 
- [Authentication_API](https://documenter.getpostman.com/view/25405822/2s93JnUS7j)
- [Product_API](https://documenter.getpostman.com/view/25405822/2s93JnUS7o)
- [Brand_API](https://documenter.getpostman.com/view/25405822/2s93JnUS7n)
- [Category_API](https://documenter.getpostman.com/view/25405822/2s93JnUSC7)
- [Cart_API](https://documenter.getpostman.com/view/25449871/2s93JnUSC8)
- [Order_API](https://documenter.getpostman.com/view/25450774/2s93JnUSC9)


List of available routes:

**Auth routes**:\
`POST auth/register` - Signup\
`POST auth/login` - Signin\
`POST auth/forgot-password` - Send reset password email\
`PUT auth/reset-password` - Reset password

**User routes**:\
`POST /users` - Create a user\
`GET /users` - Get all users\
`GET /users/:id` - Get user\
`PUT /users/:id` - Update user\
`PUT /users/changePassword/:id` - Update change user password\
`DELETE /users/:id` - Delete user

**Product routes**:\
`POST /products` - Create a product\
`GET /products` - Get all products\
`GET /products/:id` - Get product\
`PUT /products/:id` - Update product\
`DELETE /products/:id` - Delete product

**Category routes**:\
`POST /category` - Create a category\
`GET /category` - Get all categoryies\
`GET /category/:id` - Get category\
`PUT /category/:id` - Update category\
`DELETE /category/:id` - Delete category

**News items**:\
`POST /newsItem` - Create New item\
`GET /newsItem` - Get list of items\
`GET /newsItem/:id` - Get specific item\

**Logged user**:\
`GET /users/getMe` - Get Logged User Data\
`PUT /users/changeMyPassword` - Update Logged User Password\
`PUT /users/updateMe` - Update Logged User Data\

**User addresses**:\
`PUT /addresses` - Add user address\
`DELETE /addresses/:id` - Delete user address\
`GET /addresses` - Get user addresses\


### Find this project useful ? :heart:
* Support it by clicking the :star: button on the upper right of this page. :v:

## License
```
   Copyright (C) 2023 M,F,R,M,M Team ❤️
```
