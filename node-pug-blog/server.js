const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const multer = require('multer')
const session = require('express-session')
const upload = multer({ dest: 'uploads/' })
const db = require('./modules/db')
const homeRouter = require('./routes/homeRouter')
const postsRouter = require('./routes/postsRouter')
const categoriesRouter = require('./routes/categoriesRouter')

app.locals.moment = require('moment')
app.locals.truncateText = function(text, length){
  const truncatedText = text.substring(0, length)
  return truncatedText
}

// app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))


app.locals.moment = require('moment')
app.locals.truncateText = function(text, length){
  const truncatedText = text.substring(0, length)
  return truncatedText
}

app.use(require('connect-flash')())
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(session({
  secret: 'admin',
  secure: true,
  resave: true,
  httpOnly: true,
  saveUninitialized:true,
  cookie: {maxAge: 24*60*60*1000}
}))

app.use('/', homeRouter)
app.use('/posts', postsRouter)
app.use('/categories', categoriesRouter)

app.use((req, res, next) => {
  res.render('error')
  next()
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

app.listen(3000 || process.env.PORT, () =>{
  console.log('Server is running...')
})