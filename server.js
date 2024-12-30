const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')
const fs = require('fs')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    // Handle static files
    if (pathname.startsWith('/images/') || pathname.startsWith('/fonts/')) {
      const filePath = path.join(__dirname, 'public', pathname)
      try {
        const stat = fs.statSync(filePath)
        res.writeHead(200, {
          'Content-Type': pathname.endsWith('.jpg') ? 'image/jpeg' : 
                         pathname.endsWith('.png') ? 'image/png' : 
                         pathname.endsWith('.woff2') ? 'font/woff2' :
                         pathname.endsWith('.woff') ? 'font/woff' :
                         'application/octet-stream',
          'Content-Length': stat.size,
          'Cache-Control': 'public, max-age=31536000, immutable'
        })
        const readStream = fs.createReadStream(filePath)
        readStream.pipe(res)
      } catch (err) {
        handle(req, res, parsedUrl)
      }
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(10000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:10000')
  })
}) 