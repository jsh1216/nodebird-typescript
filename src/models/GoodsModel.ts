import { UserModel } from './UserModel'
import { AuctionModel } from './AuctionModel'

import {
  Table,
  Column,
  PrimaryKey,
  Default,
  Length,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  Model,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript'

@Table({
  paranoid: true,
  tableName: 'goods',
  timestamps: true,
})
export class GoodsModel extends Model<GoodsModel> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public readonly goodsId!: number

  @Length({ max: 40 })
  @Column
  public name!: string

  @AllowNull
  @Length({ max: 200 })
  @Column
  public img?: string

  @Default(0)
  @Column
  public price!: number

  @Column // BelongsTo를 통해 생성하려는 테이블의 컬럼을 설정하여 ForeignKey로 등록해둔다.
  @ForeignKey(() => UserModel)
  public ownerId!: number

  @Column // BelongsTo를 통해 생성하려는 테이블의 컬럼을 설정 해둔다.
  @ForeignKey(() => UserModel)
  public soldId!: number

  @HasMany(() => AuctionModel, 'goodsId')
  public auctions?: AuctionModel[]

  @BelongsTo(() => UserModel, 'ownerId') //설정된 ForeignKey를 UserModel에 연결 해준다.
  public owner?: UserModel

  @BelongsTo(() => UserModel, 'soldId') //설정된 ForeignKey를 UserModel에 연결 해준다.
  public sold?: UserModel
}
