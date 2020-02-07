import { Sequelize } from 'sequelize-typescript'
import config from '../config/config.json'
import { UserModel } from './UserModel'
import { GoodsModel } from './GoodsModel'
import { AuctionModel } from './AuctionModel'

// const env = process.env.NODE_ENV || 'development'
const sequelize = new Sequelize({
  database: config.development.database,
  dialect: 'mysql',
  // models: [__dirname + '/models'],
  host: config.development.host,
  password: config.development.password,
  username: config.development.username,
})

sequelize.addModels([UserModel, GoodsModel, AuctionModel])

export default sequelize
