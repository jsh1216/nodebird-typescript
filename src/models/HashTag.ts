import Sequelize from 'sequelize'
import {
  Table,
  Column,
  Length,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript'

import { Post } from './Post'
import { PostHashTag } from './PostHashTag'

@Table({
  paranoid: true,
  tableName: 'hashtags',
  timestamps: true,
})
export class HashTag extends Model<HashTag> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public hashtagId!: number

  @Length({ max: 15 })
  @Unique
  @Column
  public title!: string

  @BelongsToMany(
    () => Post,
    () => PostHashTag,
  )
  public postId!: Post[]

  public getPostId!: (
    options?: Sequelize.BelongsToManyGetAssociationsMixinOptions,
  ) => Promise<void | void[]>
}
