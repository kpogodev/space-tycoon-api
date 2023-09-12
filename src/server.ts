import express from 'express';
import cors from 'cors';

const PORT: number = process.env.PORT ? +process.env.PORT : 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (_, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));