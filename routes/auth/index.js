const router = require('express').Router();
const SpotifyWebAPI = require('spotify-web-api-node');

// Spotify Credentials;
const credentials = {
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URL
};

// Login with spotify
router.post('/login', (req, res) => {
	const code = req.body.code;
	var spotifyApi = new SpotifyWebAPI(credentials);
	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			spotifyApi.setAccessToken(data.body.access_token);
			spotifyApi.setRefreshToken(data.body.refresh_token);
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in
			});
		})
		.catch((error) => {
			res.status(error.statusCode).json({
				error: {
					error_message: error.body.error,
					error_description: error.body.error_description
				}
			});
		});
});

// Refresh access token
router.post('/refresh', (req, res) => {
	const code = req.body.code;
	spotifyApi
		.refreshAccessToken(code)
		.then((data) => {
			spotifyApi.setAccessToken(data.body.access_token);
			res.json({
				accessToken: data.body.access_token,
				expiresIn: data.body.expires_in
			});
		})
		.catch((error) => {
			res.status(error.statusCode).json({
				error: {
					error_message: error.body.error,
					error_description: error.body.error_description
				}
			});
		});
});

module.exports = router;
