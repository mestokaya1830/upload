import http from 'http'
import fs from 'fs'

const httpServer = http.createServer()

httpServer.on('request', (req, res) => {
  if(req.url == '/'){
    res.end(fs.readFileSync('index.html'))
  }
  if(req.url == '/upload'){
    const file_name = req.headers['file_name']
    req.on('data', (chunk) => {
      fs.appendFileSync(file_name, chunk)
      console.log(chunk.length)
    })
    res.end('Uploaded')
  }
})

httpServer.listen(3000, () => {
  console.log('Server is running...')
})