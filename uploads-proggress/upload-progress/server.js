const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const path = require('path')

app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'static')))
app.use(fileUpload())

app.get('/', (req, res, next) => {
  res.render('index')
})

app.post('/upload', async(req, res, next) => {
  const file = req.files.file
  await file.mv(path.join(__dirname,'static/uploads', file.name))
  res.render('index', {imgname: file.name})

  //multiple images first make input attr to multiple
    // const file = req.files.fFile
    // const imageList = file.map(item => {
    //   return item.mv(path.join(__dirname,'static', item.name))
    // })
    // await Promise.all(imageList)
    // res.render('index')
})

app.listen(3000, () => {
  console.log('Servr is running...')
})