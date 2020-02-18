import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'

import { HashTag } from './HashTag'
import { Post } from './Post'

@Table({
  tableName: 'postHashTag',
  timestamps: true,
})
export class PostHashTag extends Model<PostHashTag> {
  @ForeignKey(() => Post)
  @Column
  public postId!: number

  @ForeignKey(() => HashTag)
  @Column
  public hashTagId!: number
}
