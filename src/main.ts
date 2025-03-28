import express from 'express';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use('/users', routes);
app.listen(3000, () => console.log('Run on 3000'));
