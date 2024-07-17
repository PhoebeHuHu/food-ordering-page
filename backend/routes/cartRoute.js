import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

/* 1. create express router */
const cartRouter = express.Router();

/* 2. create multiple endpoints */
cartRouter.post('/add', authMiddleware, addToCart)
cartRouter.post('/remove', authMiddleware, removeFromCart)
//why here use post to get the cart data
cartRouter.post('/get', authMiddleware, getCart)

export default cartRouter;