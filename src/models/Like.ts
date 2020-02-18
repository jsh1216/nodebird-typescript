import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript'

import { User } from './User'

@Table({
  tableName: 'like',
  timestamps: true,
})
export class Like extends Model<Like> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  public likeId!: number

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  public likerId!: number
}
