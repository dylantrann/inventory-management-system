# Inventory Management System
Functioning RESTful API that uses Node.js, Express, and Sequelize to interact with an SQLite database. I used Node.js and Express to run the server and handle routing calls. Sequelize is an ORM used to help interact with the SQLite database in a more object-oriented manner.  

The functionality of this program is to allow for basic CRUDL operations to be performed in accordance with the database. There are three tables with predefined characteristics in our database: Users, Products, and Categorys. Core functionality involves deleting users and creating, reading, uploading, deleting, and listing products.   

## Getting Started
Use the following command to run the server:

```
$ npm start
```

Once the server is up and running, you can start making API endpoint calls to interact with the database. I personally used Postman to test the functionality.

## CRUDL Endpoints
1. Create a user: `POST http://localhost:5000/create_user/<user_id>`
Creates and adds a new user with `user_id = <user_id>`, which is a parameter included in the URI.

2. Create a product: `POST http://localhost:5000/create/?user_id=<user_id>`

3. Read a product: `GET http://localhost:5000/read/<product_id>`

4. Update a product: `PUT http://localhost:5000/update/<product_id>?user_id=<user_id>`

5. Delete a product: `DELETE http://localhost:5000/delete/<product_id>?user_id=<user_id>`

6. List all products: `GET http://localhost:5000/list/`

7. Delete a user: `DELETE http://localhost:5000/delete_user/<user_id1>?user_id=<user_id2>`
