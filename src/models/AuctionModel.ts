import { GoodsModel } from './GoodsModel'
import { UserModel } from './UserModel'

import {
  Table,
  Column,
  PrimaryKey,
  Length,
  AutoIncrement,
  AllowNull,
  Default,
  Model,
  BelongsTo,
} from 'sequelize-typescript'

@Table({
  paranoid: true,
  tableName: 'auctions',
  timestamps: true,
})
export class AuctionModel extends Model<AuctionModel> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public readonly auctionId!: number

  @Default(0)
  @Column
  public bid!: number

  @Length({ max: 100 })
  @AllowNull
  @Column
  public msg?: string

  @BelongsTo(() => UserModel, 'userId')
  public user?: UserModel

  @BelongsTo(() => GoodsModel, 'goodsId')
  public goods?: GoodsModel
}
