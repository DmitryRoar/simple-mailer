const express = require('express')
const app = express()

const emoji = require('node-emoji')
const nodemailer = require('nodemailer')
const config = require('config')
const {resolve} = require('path')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: config.get('FROM_EMAIL'),
    pass: config.get('FROM_PASSWORD')
  }
})

const PORT = process.env.PORT | 4000

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'index.html'))
})

app.post('/', (req, res) => {
  const fromCustomEmail = 'roarnode@gmail.com'

  const msg = {
    to: req.body.email,
    from: fromCustomEmail,
    subject: 'Hello From NodeJS',
    html: `
      <h1>ЛОВУКША ${emoji.get('clown')}</h1>
      <p style="color: red;">mail - ${req.body.email}</p>
      <a 
        href="https://cdn.discordapp.com/attachments/572799513312624670/644854275410755594/jmtAYddPss0.png"
      >
        Back to home
      </a>
    `
  }
  transporter.sendMail(msg, (err, info) => {
    if (err) console.log(err)
    console.log('Sent:', info)
  })

  res.redirect('/confirm')
})

app.get('/confirm', (req, res) => {
  res.sendFile(resolve(__dirname, 'send.html'))
})

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}${emoji.get('coffee')}`)
})