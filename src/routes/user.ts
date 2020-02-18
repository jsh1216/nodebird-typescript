import express from 'express'
import { isLoggedIn } from './middlewares'

import { User } from '../models/User'

const router = express.Router()

router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.user = req.user
    next()
  },
)

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { userId: res.locals.user.userId },
    })
    // console.log(Object.getPrototypeOf(user))
    await user?.addFollowing(Number(req.params.id))
    res.send('success')
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:id/unFollow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { userId: res.locals.user.userId },
    })
    await user?.removeFollowing(Number(req.params.id))
    res.send('success')
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post('/profile', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      { nick: req.body.nick },
      {
        where: { userId: res.locals.user.userId },
      },
    )
    res.redirect('/profile')
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { userId: res.locals.user.userId },
    })

    await user?.addLiker(Number(req.params.id))

    res.send('success')
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { userId: res.locals.user.userId },
    })

    await user?.removeLiker(Number(req.params.id))
    res.send('success')
  } catch (error) {
    console.error(error)
    next(error)
  }
})

export default router
