const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const translationRouter = require('./routes/translation.route');
BigInt.prototype.toJSON = function() {
    return this.toString();
}
const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

if(ENV === 'development') {
    app.use(cors());
} else if (ENV === 'production') {
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        methods: ['GET','POST','PATCH','PUT','DELETE'],
        credentials: true
    }));
    app.options("*", cors());
    app.use(helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false
    }));
}

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many request from this IP. Try again after 15 minutes.'
}))


app.use(express.json());

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/products',productRoutes);
app.use('/api/v1/translations',translationRouter);

app.listen(PORT, () => console.log(`Server started at port no: ${PORT}`));