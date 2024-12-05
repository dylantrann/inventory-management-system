import express from 'express';
import Product from '../models/product.js';
import User from '../models/user.js';
const router = express.Router();

/**
 * Deletes user based on id.
 * 
 * DELETE localhost:5000/delete_user/<user_id>/
 */
router.delete('/delete_user/:id', async (req, res) => {
    const { id } = req.params; // gets user id

    // Temporary user implementation
    const user_id = req.query.user_id; // gets current user from query
    const foundUser = await User.findByPk(user_id); // asummes user will always exist

    if (await User.findByPk(id) === null) { // fails if user doesn't exist
        res.status(400);
        res.send(`User ${id} cannot be found.`);
    }
    else if (foundUser.user_id != id &&
            foundUser.user_type != 'admin') {
        res.status(400);
        res.send(`Current user cannot delete user ${id}.`);
    }
    else { // clears user's data
        await Product.destroy({
            where: {
                seller_id: id
            }
        });

        User.destroy({
            where: {
                user_id: id
            }
        }); 
        res.send(`User ${id} has been deleted.`);
    }
});

/**
 * Adds new user. Used to test delete.
 */
router.post('/create_user/:id', (req, res) => {
    const { id } = req.params; // gets user id

    User.create({
        user_id: id,
        user_name: 'dummy',
        user_type: 'seller'
    });

    res.send(`User ${id} has been added to the Database.`);
});

/**
 * Finds user. Used to test delete.
 */
router.get('/find_user/:id', async (req, res) => {
    const { id } = req.params; // gets user id

    const foundUser = await User.findByPk(id);

    res.send((foundUser));
});

export default router;