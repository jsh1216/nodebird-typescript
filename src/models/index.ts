import { Sequelize } from 'sequelize-typescript'
import config from '../config/config.json'
import { HashTag } from './HashTag'
import { Post } from './Post'
import { User } from './User'
import { Follow } from './Follow'
import { PostHashTag } from './PostHashTag'
import { Like } from './Like'

// const env = process.env.NODE_ENV || 'development'
const sequelize = new Sequelize({
  database: config.development.database,
  dialect: 'mysql',
  host: config.development.host,
  // models: [__dirname + '/models'],
  password: config.development.password,
  username: config.development.username,
})

sequelize.addModels([HashTag, Post, User, Follow, PostHashTag, Like])

export default sequelize
