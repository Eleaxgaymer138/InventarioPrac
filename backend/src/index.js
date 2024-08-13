// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Item = require('./models/Item');
const app = express();
const PORT = process.env.PORT || 5000;

// Importar y configurar Swagger
const setupSwagger = require('./swagger/swagger');
setupSwagger(app);

app.use(cors());
app.use(bodyParser.json());

const populateDatabase = async () => {
    const count = await Item.countDocuments();
    if (count === 0) {
        const items = [
            { name: 'Item 1', quantity: 10, price: 20 },
            { name: 'Item 2', quantity: 5, price: 30 },
            { name: 'Item 3', quantity: 15, price: 40 },
        ];
        await Item.insertMany(items);
        console.log('Database populated with default items');
    }
};

const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
