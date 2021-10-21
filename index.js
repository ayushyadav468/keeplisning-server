const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());

// ROUTES
app.use('/auth', require('./routes/auth'));

// Check for development or production
if (process.env.NODE_ENV === 'production') {
	app.use('/', (req, res) => {
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
