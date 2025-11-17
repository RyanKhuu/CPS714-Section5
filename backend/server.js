import express, { request } from 'express';

const app = express();

// ==== Admin Dashboard ====
app.get("/", (request, response) => {
    response.send('Hello World!');
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})