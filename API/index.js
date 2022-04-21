import express from 'express'
import usersRoutes from './routes/appUser.js'
import postsRoutes from './routes/post.js'
import promptRoutes from './routes/prompts.js'
import backgroundRoutes from './routes/background.js'
import cors from 'cors'
import passport from 'passport'

const app = express()
app.use(express.json())
app.use(cors())
app.use(passport.initialize())

//every route inside the post route is accessed with /appUser
app.use('/appUser', usersRoutes)
app.use('/post', postsRoutes)
app.use('/prompts', promptRoutes)
app.use('/background', backgroundRoutes)

app.get('/', (req, res) => {
  res.send('This is the home page!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
)
