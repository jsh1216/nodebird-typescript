import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'
import dotenv from 'dotenv'
import sequelize from './models/index'
import { Promise as Bluebird } from 'bluebird'
console.log(__dirname)

// Node Promise를 Bluebird Promise로 대체
global.Promise = Bluebird as any

dotenv.config()

import indexRouter from './routes/index'
import authRouter from './routes/auth'

import passportConfig from './passport'

const app = express()
sequelize.sync()
passportConfig(passport)

const sessionMiddleware = session({
  cookie: {
    httpOnly: true,
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET ?? '',
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 8010)

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', indexRouter)
app.use('/auth', authRouter)

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err: any = new Error('Not Found')
    err.status = 404
    next(err)
  },
)

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
  },
)

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중')
})
