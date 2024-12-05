import express from 'express';
import Product from '../models/product.js';
import User from '../models/user.js';
import {v4 as uuidv4} from 'uuid';
const router = express.Router();

/** 
 * Returns list of products separated into chunks of 5.
 * 
 * POST http://localhost:5000/list/
 */
router.get('/list/', async (req, res) => {
    const inputArray = await Product.findAll() // gets array of products
    const perChunk = 5 // items per chunk

    // found method on stack overflow to split array into chunks
    const result = inputArray.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index/perChunk)

        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])

    res.send(result);
});

/** 
 * If the user is a seller, add the product to the database.
 * Product information initialized in body of request.
 * 
 * POST http://localhost:5000/create/
 */
router.post('/create/', async (req, res) => {
    const body = req.body; // gets json of req body

    // Temporary user implementation
    const user_id = req.query.user_id; // gets current user from query
    const foundUser = await User.findByPk(user_id); // asummes user will always exist

    if (foundUser.user_type != 'seller') {
        res.status(400);
        res.send('User is not a seller.');
    }
    else {
        Product.create({
            product_id: uuidv4(),
            name: body.name,
            description: body.description,
            price: body.price,
            quantity: body.quantity,
            seller_id: user_id, // should be current user
            category_id: body.category_id
        });

        res.send(`${body.name} has been added to the Database.`);
    }
});

/**
 * Return the product.
 * 
 * GET http://localhost:5000/read/<uuid>/
 */
router.get('/read/:id/', async (req, res) => {
    const { id } = req.params; // gets product id

    const foundProduct = await Product.findByPk(id); // finds product in database

    if (foundProduct === null) { // if no such product, error
        res.status(400)
        res.send(`Product ${id} not found.`);
    } 
    else {res.send(foundProduct);}
});

/** 
 * Updates the product whose id was passed in. 
 * Fails if user doesn't own the product.
 * 
 * POST http://localhost:5000/update/<uuid>/
 */
router.put('/update/:id/', async (req, res) => {
    const { id } = req.params; // gets product id
    const body = req.body; // gets body values to update product
    const foundProduct = await Product.findByPk(id); // finds product in database

    // Temporary user implementation
    const user_id = req.query.user_id; // gets current user from query
    const foundUser = await User.findByPk(user_id); // asummes user will always exist

    if (foundProduct === null) { // if no such product, error
        res.status(400)
        res.send('Product not found.');
    }
    else if (foundUser.user_id != foundProduct.seller_id) { // user doesn't own product
        res.status(400);
        res.send('User is not the owner of the product.');
    }
    else {
        foundProduct.update(body);
        res.send('Product sucessfully updated.');
    }
});

/**
 * Deletes the product whose id was passed in.
 * Fails if user isn't and admin and doesn't own the product.
 * 
 * DELETE http://localhost:5000/delete/<uuid>/
 */
router.delete('/delete/:id/', async (req, res) => {
    const { id } = req.params; // gets product id
    const foundProduct = await Product.findByPk(id); // finds product in database

    // Temporary user implementation
    const user_id = req.query.user_id; // gets current user from query
    const foundUser = await User.findByPk(user_id); // asummes user will always exist

    if (foundProduct === null) { // if no such product, error
        res.status(400)
        res.send('Product not found.');
    }
    else if (foundUser.user_id != foundProduct.seller_id && 
            foundUser.user_type != 'admin') {
        res.status(400)
        res.send('User cannot delete this product.');
    }
    else {
        foundProduct.destroy({
            where: {
                product_id: id
            }
        }); 
        res.send('Product sucessfully deleted.');
    }
});

export default router;
