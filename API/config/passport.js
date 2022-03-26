import { Strategy, ExtractJwt } from 'passport-jwt'
import config from '../config/dbConfig.js'
import passport from 'passport'
import mssql from 'mssql'

const { connect, query } = mssql

const diarypassport = passport.use(
  new Strategy(
    {
      secretOrKey: 'XYZ',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (jwt_payload, done) {
      try {
        console.log(jwt_payload)
        await connect(config)
        const user =
          await query`SELECT userID, username FROM appUser WHERE username = ${jwt_payload.username}`
        console.log(user.recordset)
        if (user.recordset.length == 1) {
          return done(null, user.recordset[0])
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

export default diarypassport
