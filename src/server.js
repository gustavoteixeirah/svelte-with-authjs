import { handler } from '../build/handler.js'
import express from 'express';
const PORT = parseInt(process.env.PORT || '8080');
import dotenv from 'dotenv';
dotenv.config()

const app = express();


app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

app.use(handler);

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

