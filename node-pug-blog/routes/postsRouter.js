const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: './static/images' })
const Posts = require('../modules/postsSchema')
const Categories = require('../modules/categorySchema')
const checkPost = require('../middleware/postValidation')
const checkComment = require('../middleware/commentValidation')

router.get('/show/:id', async(req, res, next) => {
	const posts = await Posts.findById(req.params.id)
	res.render('show',{'posts': posts})
})

router.get('/add', async(req, res, next) => {
	const category = await Categories.find({})
	res.render('addpost',{'title': 'Add Post','categories': category})
})

router.post('/add', upload.single('mainimage'), async(req, res, next) => {
	const errors = checkPost(req.body.title, req.body.category, req.file.filename)
	if(errors.length > 0){
		req.flash('danger', errors[0].message)
		res.redirect('/')
	}else{
		const newPost = new Posts({
			title: req.body.title,
			commenttext: req.body.commenttext,
			category: req.body.category,
			date: new Date(),
			author: req.body.author,
			mainimage: req.file.filename
		})
		await newPost.save()
		req.flash('success','Post Added')
		res.redirect('/')
	}
})

router.post('/addcomment', async(req, res, next) => {
	const errors = checkComment(req.body.name, req.body.email, req.body.commenttext)
	if(errors.length > 0){
		req.flash('danger', errors[0].message)
		res.redirect('/posts/show/'+req.body.postid)
	}else{
		const commentText = {
			name: req.body.name,
			email: req.body.email,
			commenttext: req.body.commenttext,
			commentdate: new Date()
		}
		await Posts.updateOne(
			{_id: req.body.postid},
			{$push:{comments: commentText}}
		)
		req.flash('success', 'Comment Added')
		res.redirect('/posts/show/'+req.body.postid)
	}
})

module.exports = router