import express from 'express'
import passport from 'passport'

import bcrypt from 'bcrypt'
import { isLoggedIn, isNotLoggedIn } from './middlewares'
import { UserModel } from '../models/UserModel'

const router = express.Router()

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password, money } = req.body
  try {
    const exUser = await UserModel.findOne({ where: { email } })
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.')
      return res.redirect('/join')
    }
    const hash = await bcrypt.hash(password, 12)
    await UserModel.create({
      email,
      money,
      nick,
      password: hash,
    })
    return res.redirect('/')
  } catch (error) {
    console.error(error)
    return next(error)
  }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError)
      return next(authError)
    }
    if (!user) {
      req.flash('loginError', info.message)
      return res.redirect('/')
    }
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError)
        return next(loginError)
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/logout', isLoggedIn, (req: express.Request, res) => {
  req.logout()
  req.session?.destroy(err => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
  })
})

export default router
