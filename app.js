const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes');
const packageRoute = require('./routes/packageRoute');

const app = express();
const port = process.env.PORT || 3005;
app.use(express.json());
app.use(cors());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Package Tracker Platform API',
            version: '1.0.0',
            description: 'RESTful APIs for Package Tracking platform',
        },
    },
    tags: [
        {
            name: "Authentication",
            description: "APIs related to user authentication",
        },
        {
            name: "Package Management",
            description: "APIs related to Package",
        },
    ],
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/auth', authRoutes);
app.use('/api/package', packageRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});