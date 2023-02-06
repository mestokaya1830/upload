const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const path = require('path')

app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))
app.use(fileUpload())

app.get('/', (req, res, next) => {
  res.render('index')
})
app.post('/upload', async(req, res, next) => {
  const file = req.files.file
  await file.mv(path.join(__dirname,'static/uploads', file.name))
  res.render('index', {imgname: file.name})
})

app.get('/multiupload', (req, res, next) => {
  res.render('multiupload')
})
app.post('/multiupload', async(req, res, next) => {
  const files = req.files.files
  if(files.length > 1){
    const imageList = files.map(item => {
      return item.mv(path.join(__dirname,'static/uploads', item.name))
    })
    await Promise.all(imageList)
    res.render('multiupload', {imageList:files.map(item => item.name)})
  } else {
    files.mv(path.join(__dirname,'static/uploads', files.name))
    res.render('multiupload', {image:files.name})
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})
