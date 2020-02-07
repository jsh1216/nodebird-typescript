import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

import { GoodsModel } from '../models/GoodsModel'
import { isLoggedIn, isNotLoggedIn } from './middlewares'

const router = express.Router()

router.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

router.get('/', async (req, res, next) => {
  try {
    const goods = await GoodsModel.findAll({ where: { soldId: null } })
    res.render('main', {
      goods,
      loginError: req.flash('loginError'),
      title: 'NodeAuction',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    joinError: req.flash('joinError'),
    title: '회원가입 - NodeAuction',
  })
})

router.get('/good', isLoggedIn, (req, res) => {
  res.render('good', { title: '상품 등록 - NodeAuction' })
})

fs.readdir('uploads', error => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
    fs.mkdirSync('uploads')
  }
})
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname)
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext,
      )
    },
  }),
})
router.post(
  '/good',
  isLoggedIn,
  upload.single('img'),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { name, price } = req.body
      await GoodsModel.create({
        img: req.file.filename,
        name,
        // ownerId: req.user?.id,
        price,
      })
      res.redirect('/')
    } catch (error) {
      console.error(error)
      next(error)
    }
  },
)

export default router
