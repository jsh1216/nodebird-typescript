import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript'

import { User } from './User'

@Table({
  tableName: 'follow',
  timestamps: true,
})
export class Follow extends Model<Follow> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  public followerId!: number

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  public followingId!: number
}
