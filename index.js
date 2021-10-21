require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./routes/auth'));

// Check for development or production
if (process.env.NODE_ENV === 'production') {
	// every get request is send to index.html in root directory
	app.get('/', (req, res) => {
		res.send('App is running in production mode');
	});
} else {
	app.use('/', (req, res) => {
		res.send('App is running in development mode');
	});
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`app listening on http://localhost:${PORT}`);
});
