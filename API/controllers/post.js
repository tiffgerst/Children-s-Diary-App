import mssql from 'mssql'
import config from '../config/dbConfig.js'

const { connect, query } = mssql

// Finds posts by certain user ID from the databse
export const searchPostByUserID = async (req, res) => {
  const id = req.params.id

  try {
    await connect(config)
    const result = await query`SELECT * FROM post WHERE userID = ${id}`
    res.json(result.recordset).status(200)
  } catch (err) {
    res.status(409).send({ message: err.message })
  }
}

// Finds posts by certain user ID and joins them with images and tags
export const postWithImageTag = async (req, res) => {
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
