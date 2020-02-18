import express from 'express'
import { isLoggedIn, isNotLoggedIn } from './middlewares'
import { Post } from '../models/Post'
import { User } from '../models/User'

const router: express.Router = express.Router()

router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.user = req.user
    next()
  },
)
router.get(
  '/profile',
  isLoggedIn,
  (req: express.Request, res: express.Response) => {
    res.render('profile', { title: '내 정보 - NodeBird', user: req.user })
  },
)

router.get(
  '/join',
  isNotLoggedIn,
  (req: express.Request, res: express.Response) => {
    res.render('join', {
      joinError: req.flash('joinError'),
      title: '회원가입 - NodeBird',
      user: req.user,
    })
  },
)

router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const posts: any = await Post.findAll({
        include: [{ attributes: ['userId', 'nick'], model: User }],
        order: [['createdAt', 'DESC']],
      })

      // console.log(res.locals.user)
      res.render('main', {
        loginError: req.flash('loginError'),
        title: 'NodeBird',
        twits: posts,
        user: res.locals.user,
      })
    } catch (error) {
      console.error(error)
      next(error)
    }
  },
)

export default router
