import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

import { Post } from '../models/Post'
import { User } from '../models/User'

import { HashTag } from '../models/HashTag'
import { isLoggedIn } from './middlewares'

const router: express.Router = express.Router()

router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.user = req.user
    next()
  },
)

fs.readdir('src/uploads', error => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
    fs.mkdirSync('src/uploads')
  }
})

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'src/uploads/')
    },
    filename(req, file, cb) {
      const ext: string = path.extname(file.originalname)
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
    },
  }),
})

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file)
  res.json({ url: `/img/${req.file.filename}` })
})

const upload2 = multer()
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: res.locals.user.userId,
    })

    const hashtags = req.body.content.match(/#[^\s#]*/g)
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag: string) =>
          HashTag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          }),
        ),
      )

      await post.$add(
        'hashtagsId',
        result.map((r: any) => r[0]),
      )
    }
    res.redirect('/')
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag
  if (!query) {
    return res.redirect('/')
  }
  try {
    const hashtag = await HashTag.findOne({ where: { title: query } })
    let posts: any = []
    // console.log(Object.getPrototypeOf(hashtag))
    if (hashtag) {
      posts = await hashtag.getPostId({ include: [{ model: User }] })
    }
    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
      user: req.user,
    })
  } catch (error) {
    console.error(error)
    return next(error)
  }
})

router.delete('/:postId', async (req, res, next) => {
  try {
    const postId = await req.params.postId
    await Post.destroy({
      where: { postId, userId: res.locals.user.userId },
    })
    res.send('success')
  } catch (error) {
    console.error(error)
    return next(error)
  }
})

export default router
