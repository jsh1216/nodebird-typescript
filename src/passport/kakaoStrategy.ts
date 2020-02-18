import { Strategy as KakaoStrategy } from 'passport-kakao'
import Passport from 'passport'

// const KakaoStrategy = passportKakao.Strategy

import { User } from '../models/User'

export default (passport: Passport.Authenticator) => {
  passport.use(
    new KakaoStrategy(
      {
        callbackURL: '/auth/kakao/callback',
        clientID: process.env.KAKAO_ID ?? '',
        clientSecret: '',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { provider: 'kakao', snsId: profile.id },
          })
          if (exUser) {
            done(null, exUser)
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kaccount_email,
              nick: profile.displayName,
              provider: 'kakao',
              snsId: profile.id,
            })
            done(null, newUser)
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      },
    ),
  )
}
