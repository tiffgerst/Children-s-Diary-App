import mssql from 'mssql'
import config from '../config/dbConfig.js'

const { connect, query } = mssql

// Obtains the nine default emojis from mood_icon table
export const defaultMoodIcons = async (_req, res) => {
  try {
    await connect(config)
    const result = await query`SELECT * FROM mood_icon`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Link emoji with post
export const linkMoodIcons = async (req, res) => {
  const post = req.body
  const moodIconID = post.moodIconID
  const emojiLinkID = post.unique_id_post

  try {
    await connect(config)
    await query`INSERT INTO post_mood_icon(moodIconID, postLink) VALUES (${moodIconID}, ${emojiLinkID})`
    res.status(200).send({
      success: true,
    })
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}
