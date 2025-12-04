import app from './v1/app.js';

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});