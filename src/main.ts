import express from 'express';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use('/users', routes);
app.listen(process.env.PORT, () => console.log(`Server on in: ${process.env.PORT}`));
