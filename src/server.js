import express from 'express';
import studentRoutes from './routes/student.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

app.use((req, res) => { // n°1
    res.status(404).send('Not found');
});

app.use((err, req, res, next) => { // n°2
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});