const router = require('express').Router()
const Category = require('../modules/categorySchema')
const Posts = require('../modules/postsSchema')

router.get('/show/:category', async(req, res, next) => {
	await Posts.findone({category: req.params.category})
	res.render('index',{'title': req.params.category,'posts': posts})
})

router.get('/add', async(req, res, next) => {
	res.render('addcategory',{'title': 'Add Category'	})
})

router.post('/add', async(req, res, next) => {
	const newCategory = new Category({
		name: req.body.name
	})
	await newCategory.save()
	req.flash('success','Category Added')
	res.redirect('/')
})

module.exports = router