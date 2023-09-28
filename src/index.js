const express = require('express');
const cors = require('cors');
const app = express();
//const routes = require('./routes/routes');
const routes = require('./routes/routes');
const users = require('./routes/users');
const products = require('./routes/products');
const cart = require('./routes/cart');
const admin = require('./routes/admin');
const db = require('./db/database')


main();
async function main() {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}



app.use(express.json());
app.use(cors());

app.use('/api', routes);
app.use('/users', users);
app.use('/products', products);
app.use('/cart', cart);
app.use('/admin', admin);

app.listen(3030, () => {
    console.log(`Server Started at ${3030}`)
})