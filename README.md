# Inventory Management System
Functioning RESTful API that uses Node.js, Express, and Sequelize to interact with an SQLite database. I used Node.js and Express to run the server and handle routing calls. Sequelize is an ORM used to help interact with the SQLite database in a more object-oriented manner.  

The functionality of this program is to allow for basic CRUDL operations to be performed in accordance with the database. There are three tables with predefined characteristics in our database: Users, Products, and Categorys. Core functionality involves deleting users and creating, reading, uploading, deleting, and listing products.   

## Getting Started
We must first download all dependencies. First, make sure you're in the parent directory that includes `index.js`. Then run the following command:

```
npm install
```

This will install all required dependencies. 

Then, use the following command to run the server:

```
$ npm start
```

Once the server is up and running, you can start making API endpoint calls to interact with the database. I specifically used Postman to test the functionality on my end.

## CRUDL Endpoints
1. Create a user: `POST http://localhost:5000/create_user/<user_id>`
Creates and adds a new user to the database. Must specify the user's id with the `<user_id>` parameter included in the endpoint of the URL.

2. Create a product: `POST http://localhost:5000/create/?user_id=<user_id>`
Creates and adds a new product to the database. This time, `<user_id>` is a query parameter. Whenever `<user_id>` is passed in as a query parameter rather than a normal parameter, it refers to the current user attempting to create the product. This is a temporary way of representing the user to allow base functionality in the MVP.

Must specify the product's information using the `body` element of the API call. The following are the required parameters to submit:

```
{
    "name": <text>,
    "description": <text>,
    "price": <decimal>,
    "quantity": <integer>,
    "category_id": <integer>
}
```

4. Read a product: `GET http://localhost:5000/read/<product_id>`
Reads a product from the database and returns it. Display's the product as a JSON object. 

5. Update a product: `PUT http://localhost:5000/update/<product_id>?user_id=<user_id>`
Updates the information for an existing product in the database. Note that `updated_at` value doesn't need to be manually updated but will automatically update upon use.

Use `body` to store values that need to be updated. Can include, but doesn't have to include all, the following values:

```
{
    "name": <text>,
    "description": <text>,
    "price": <decimal>,
    "quantity": <integer>,
    "category_id": <integer>
}
```

7. Delete a product: `DELETE http://localhost:5000/delete/<product_id>?user_id=<user_id>`
Deletes a product from the database.

8. List all products: `GET http://localhost:5000/list/`
Returns a 2D array of all products, with each entry of the main array consisting of 5 products. Essentially, returns a paginated list with 5 object in each list.

9. Delete a user: `DELETE http://localhost:5000/delete_user/<user_id1>?user_id=<user_id2>`
Deletes a user and all products associated with that user from the database.
