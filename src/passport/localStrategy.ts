import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import Passport from 'passport'

import { UserModel } from '../models/UserModel'

const LocalStrategy = passportLocal.Strategy

export default (passport: Passport.Authenticator) => {
  passport.use(
    new LocalStrategy(
      {
        passwordField: 'password',
        usernameField: 'email',
      },
      async (email, password, done) => {
        try {
          const exUser = await UserModel.findOne({ where: { email } })
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password ?? '')
            if (result) {
              done(null, exUser)
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' })
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      },
    ),
  )
}
