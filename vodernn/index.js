import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import responseTime from 'response-time';

const app = express();
const PORT = 5000 // can set to whatever you want

app.use(bodyParser.json());

// middleware to track response time
app.use(responseTime(function (req, res, time) {
    console.log(time + ' ms');
}));

app.use('/', productRoutes); // for all product-based routes
app.use('/', userRoutes);    // for all user-based routes
app.get('/', (req, res) => {res.send('Homepage');}) // default homescreen message

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
