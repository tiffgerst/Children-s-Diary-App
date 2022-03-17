import express from 'express'
import usersRoutes from './routes/appUser.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

//every route inside the post route is accessed with /researcher
app.use('/appUser', usersRoutes)

app.get('/', (req, res) => {
  res.send('This is the home page!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
)
