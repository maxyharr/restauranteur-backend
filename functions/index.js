const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const zomato = require('./controllers/zomato')

const router = new Router()
const app = new Koa();

app.use(cors({
  origin: '*',
  allowMethods: ['GET'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

router.get('/zomato/geocode', zomato.geocode)
router.get('/', (ctx) => {
  ctx.body = `
    <h1>Available Routes</h1>
  ` + router.stack.map(i => `<li>${i.path}</li>`)
})

app.use(router.routes())
   .use(router.allowedMethods())

exports.api = functions.https.onRequest(app.callback())