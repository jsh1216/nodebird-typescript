import local from './localStrategy'
import { UserModel } from '../models/UserModel'
import Passport from 'passport'

export default (passport: Passport.Authenticator) => {
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
  })

  passport.deserializeUser((id: any, done: any) => {
    UserModel.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err))
  })

  local(passport)
}
