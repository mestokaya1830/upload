const router = require('express').Router()
const Posts = require('../modules/postsSchema')

router.get('/', async(req, res, next) => {
	const posts = await Posts.find({})
	res.render('index', { posts: posts})
})

module.exports = router;
