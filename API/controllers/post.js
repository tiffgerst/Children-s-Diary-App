import mssql from 'mssql'
import config from '../config/dbConfig.js'

const { connect, query } = mssql

// Finds a post by its post ID and joins them with images and tags
export const searchPostByPostID = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const result = await query`
      SELECT 
        post.postID, 
        userID, 
        createDateTime, 
        ISNULL(titleText, '') AS titleText,
        ISNULL(contentText, '') AS contentText, 
        ISNULL(tagNameAll, '') AS tagNameAll, 
        imageURL,
        ISNULL(backgroundURL, '') AS backgroundURL
      FROM post
      LEFT JOIN (
        SELECT post.postID, 
          tagNameAll = (STUFF((SELECT ', '+ tagName 
            FROM (SELECT t.postID, t.tagID, c.tagName 
              FROM post_tag t 
              LEFT JOIN tag_category c 
              ON t.tagID = c.tagID) AS tagStuff 
            WHERE tagStuff.postID = post.postID AND tagStuff.postID = ${id} 
            FOR xml path('')),1,2,''))
        FROM post 
        WHERE post.postID = ${id} 
      ) AS tag
      ON post.postID = tag.postID
      LEFT JOIN postImageUploaded image
      ON post.postID = image.postID
      LEFT JOIN background
      ON post.backgroundID = background.backgroundID
      WHERE post.postID = ${id} 
    `
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Finds posts by their user ID and joins them with images and tags
export const searchPostByUserID = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const quote = '"'
    const result = await query`
      SELECT 
        post.postID, 
        userID, 
        createDateTime, 
        ISNULL(titleText, '') AS titleText,
        ISNULL(contentText, '') AS contentText, 
        ISNULL(tagNameAll, '') AS tagNameAll, 
        imageURL
      FROM post
      LEFT JOIN (
        SELECT post.postID, 
          tagNameAll = (STUFF((SELECT ', '+ tagName 
            FROM (SELECT t.postID, t.tagID, c.tagName 
              FROM post_tag t 
              LEFT JOIN tag_category c 
              ON t.tagID = c.tagID) AS tagStuff 
            WHERE tagStuff.postID = post.postID 
            FOR xml path('')),1,2,''))
        FROM post 
      ) AS tag
      ON post.postID = tag.postID
      LEFT JOIN postImageUploaded image
      ON post.postID = image.postID
      WHERE userID = ${id}
    `
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Submits Post from 'HowAreYouFeeling' screen
export const submitFeelingEntry = async (req, res) => {
  const post = req.body
  const userID = post.userID
  const titleText = 'My feelings'
  const text = post.entryText.value
  const emojis = post.selectedEmojis

  try {
    await connect(config)
    if (emojis.length !== 0 || text !== '') {
      await query`INSERT INTO post(userID, createDateTime, titleText, contentText) VALUES (${userID}, CURRENT_TIMESTAMP, ${titleText}, ${text})`
      res.status(200).send({
        success: true,
      })
    }
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}
