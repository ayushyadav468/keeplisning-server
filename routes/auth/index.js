const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('app is working');
});

module.exports = router;
