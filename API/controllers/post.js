import mssql from 'mssql'
import config from '../config/dbConfig.js'

const { connect, query } = mssql

// Finds a post by its post ID and joins them with images, tags, and emojis
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
        ISNULL(backgroundURL, '') AS backgroundURL,
        ISNULL(emojiUrlAll, '') AS emojiUrlAll, 
        uniqueID
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
      ON post.uniqueID = image.postLink
      LEFT JOIN background
      ON post.backgroundID = background.backgroundID
      LEFT JOIN (
        SELECT moodIconLink, 
          emojiUrlAll = (STUFF((SELECT ', '+ moodIconURL 
            FROM (SELECT m.postLink, m.moodIconID, c.moodIconURL 
              FROM post_mood_icon m 
              LEFT JOIN mood_icon c 
              ON m.moodIconID = c.moodIconID) AS moodIconStuff 
            WHERE moodIconStuff.postLink = post.moodIconLink 
            FOR xml path('')),1,2,''))
        FROM post 
      ) AS mood
      ON post.moodIconLink = mood.moodIconLink
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
        imageURL,
        ISNULL(emojiUrlAll, '') AS emojiUrlAll, 
        uniqueID
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
      ON post.uniqueID = image.postLink
      LEFT JOIN (
        SELECT moodIconLink, 
          emojiUrlAll = (STUFF((SELECT ', '+ moodIconURL 
            FROM (SELECT m.postLink, m.moodIconID, c.moodIconURL 
              FROM post_mood_icon m 
              LEFT JOIN mood_icon c 
              ON m.moodIconID = c.moodIconID) AS moodIconStuff 
            WHERE moodIconStuff.postLink = post.moodIconLink 
            FOR xml path('')),1,2,''))
        FROM post 
      ) AS mood
      ON post.moodIconLink = mood.moodIconLink
      WHERE userID = ${id}
    `
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

export const submitFeelingEntry = async (req, res) => {
  const post = req.body
  const userID = post.userID
  const titleText = 'My feelings'
  const text = post.entryText.value
  const emojis = post.selectedEmojis
  const emojiLinkID = post.unique_id_post

  // Submits Post from 'HowAreYouFeeling' screen
  try {
    await connect(config)
    if (emojis.length !== 0 || text !== '') {
      await query`INSERT INTO post(userID, createDateTime, titleText, contentText, moodIconLink) VALUES (${userID}, CURRENT_TIMESTAMP, ${titleText}, ${text}, ${emojiLinkID})`
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

export const newPost = async (req, res) => {
  const post = req.body
  const userID = post.userID
  const titleText = post.tit
  const text = post.note
  const privacy = post.privacy
  const backgroundColor = post.background
  const id = post.unique_id_post

  // Submits Post from 'TextEntry' screen
  try {
    await connect(config)
    const back =
      await query`SELECT backgroundID from background WHERE backgroundURL = ${backgroundColor}`
    const backID = back.recordset[0].backgroundID
    await query`INSERT INTO post (userID, createDateTime, titleText, contentText, privacy, backgroundColor, uniqueID, backgroundID) VALUES (${userID}, CURRENT_TIMESTAMP, ${titleText}, ${text}, ${privacy},${backgroundColor},${id},${backID})`
    await query`INSERT INTO postDelete (userID, createDateTime, titleText, contentText, uniqueID) VALUES (${userID}, CURRENT_TIMESTAMP, ${titleText}, ${text}, ${id})`

    const pid = await query`Select postID from post WHERE uniqueID = ${id}`

    res.status(200).send({
      success: true,
      postID: pid.recordset[0].postID,
    })
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}

export const tags = async (req, res) => {
  const post = req.body
  const postID = post.postID
  const tag = post.tag

  // Submits Post from 'TextEntry' screen
  try {
    await connect(config)
    const t = await query`SELECT tagID from tag_category WHERE tagName=${tag}`
    const tID = t.recordset[0].tagID
    await query`INSERT INTO post_tag (tagID,postID) VALUES (${tID},${postID})`

    res.status(200).send({
      success: true,
    })
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}

export const image = async (req, res) => {
  const post = req.body
  const uniqueID = post.unique_id_post
  const imageURL = post.imageURL

  // Submits Post from 'ImageEntry' screen
  try {
    await connect(config)
    await query`INSERT INTO postImageUploaded (imageURL, postLink) VALUES (${imageURL}, ${uniqueID})`
    await query`INSERT INTO imageDelete (imageURL, postLink) VALUES (${imageURL}, ${uniqueID})`

    res.status(200).send({
      success: true,
    })
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}

export const updatePost = async (req, res) => {
  const post = req.body
  const titleText = post.tit
  const text = post.note
  const privacy = post.privacy
  const backgroundColor = post.background
  const id = post.postID

  // Submits Post from 'TextEntry' screen
  try {
    await connect(config)
    await query`DELETE from post_tag where postID = ${id}`
    const back =
      await query`SELECT backgroundID from background WHERE backgroundURL = ${backgroundColor}`
    const backID = back.recordset[0].backgroundID
    await query`UPDATE post SET 
      createDateTime = CURRENT_TIMESTAMP,
      backgroundColor = ${backgroundColor},
      privacy = ${privacy},
      titleText = ${titleText},
      contentText = ${text},
      backgroundID = ${backID}
      WHERE postID = ${id}`

    res.status(200).send({
      success: true,
    })
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}

export const addPost = async (req, res) => {
  const post = req.body
  const userID = post.userID
  const backgroundColor = post.background
  const privacy = post.privacy
  const titleText = post.titleText.value
  const contentText = post.contentText.value
  const imageURL = post.imageURL
  const uniqueID = post.unique_id_post

  try {
    await connect(config)
    if (titleText !== '') {
      await query`INSERT INTO post (userID, createDateTime, backgroundColor, privacy, titleText, contentText, uniqueID) VALUES (${userID}, CURRENT_TIMESTAMP, ${backgroundColor}, ${privacy}, ${titleText}, ${contentText}, ${uniqueID})`
      res.status(200).send({
        success: true,
      })
    }
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }

  try {
    await connect(config)
    if (imageURL !== '') {
      await query`INSERT INTO postImageUploaded (imageURL, postLink) VALUES (${imageURL}, ${uniqueID})`
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
export const deletePost = async (req, res) => {
  const post = req.body
  const postID = post.postID
  const uniqueID = post.uniqueID

  try {
    await connect(config)

    await query`DELETE FROM POST WHERE postID = ${postID}`
    await query`DELETE FROM background WHERE postID = ${postID}`
    await query`DELETE FROM post_tag WHERE postID = ${postID}`
    await query`DELETE FROM postImageUploaded WHERE postLink = ${uniqueID}`
    await query`DELETE FROM post_mood_icon WHERE postLink = ${uniqueID}`

    res.status(200).send({
      success: true,
    })
  } catch (err) {
    res.status(409).send({
      message: err.message,
    })
  }
}
