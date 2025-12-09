/* Importing express */
import express from 'express';
const app = express();

/* Importing Middleware */
import logger from './middleware/logger.js';
import errorHandlers from './middleware/errorHandler.js';

/* importing routes */
import exerciseRoutes from './routes/exerciseRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

/* Middleware */
app.use(express.json());
app.use(logger);

/* Routes */
app.use('/api/exercises', exerciseRoutes);
app.use('/api/sessions', sessionRoutes);

/* Middleware: errorHandler */
app.use(errorHandlers); 

export default app;