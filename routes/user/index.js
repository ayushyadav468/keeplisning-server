const router = require('express').Router();
const SpotifyWebAPI = require('spotify-web-api-node');

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URL = process.env.REDIRECT_URL;

// Spotify Credentials;
const credentials = {
	clientId: CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: REDIRECT_URL
};

router.post('/getMe', (req, res) => {
	const accessToken = req.headers.access_token;
	var spotifyApi = new SpotifyWebAPI(credentials);
	// set access token
	spotifyApi.setAccessToken(accessToken);
	// querry to get user information
	spotifyApi
		.getMe()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			res.status(err.statusCode).json(err.body.error.message);
		});
});

router.post('/getuserplaylist', (req, res) => {
	const accessToken = req.headers.access_token;
	const userId = req.headers.user_id;
	var spotifyApi = new SpotifyWebAPI(credentials);
	// set access token
	spotifyApi.setAccessToken(accessToken);
	// querry to get user information
	spotifyApi
		.getUserPlaylists(userId)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			res.status(err.statusCode).json(err.body.error.message);
		});
});

module.exports = router;
