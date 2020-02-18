import local from './localStrategy'
import kakao from './kakaoStrategy'
import Passport from 'passport'
import { User } from '../models/User'

export default (passport: Passport.Authenticator) => {
  passport.serializeUser((user: any, done: any) => {
    done(null, user.userId)
  })

  passport.deserializeUser(async (userId: any, done: any) => {
    try {
      const user = await User.findOne({
        include: [
          {
            as: 'followers',
            attributes: ['userId', 'nick'],
            model: User,
          },
          {
            as: 'followings',
            attributes: ['userId', 'nick'],
            model: User,
          },
          {
            as: 'Likes',
            attributes: ['userId', 'nick'],
            model: User,
          },
          {
            as: 'Likers',
            attributes: ['userId', 'nick'],
            model: User,
          },
        ],
        where: { userId },
      })
      console.log(user)
      done(null, user)
    } catch (error) {
      console.error(error)
      done(error)
    }
  })

  local(passport)
  kakao(passport)
}
