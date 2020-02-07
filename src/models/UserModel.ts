import { AuctionModel } from './AuctionModel'

import {
  Table,
  Column,
  Length,
  AllowNull,
  Unique,
  Default,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript'

@Table({
  paranoid: true,
  tableName: 'users',
  timestamps: true,
})
export class UserModel extends Model<UserModel> {
  // @ForeignKey(() => AuctionModel)
  @PrimaryKey
  @AutoIncrement
  @Column
  public userId!: number

  @Length({ max: 40 })
  @Unique
  @Column
  public email!: string

  @Length({ max: 15 })
  @Column
  public nick?: string

  @AllowNull
  @Length({ max: 100 })
  @Column
  public password?: string

  @Default(0)
  @Column
  public money?: number

  @HasMany(() => AuctionModel, 'userId')
  public auctions?: AuctionModel[]

  // @HasMany(() => GoodsModel, 'ownerId')
  // public owner?: GoodsModel[]

  // @HasMany(() => GoodsModel, 'soldId')
  // public sold?: GoodsModel[]
}
