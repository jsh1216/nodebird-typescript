import {
  Table,
  Column,
  Length,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript'

import { User } from './User'
import { HashTag } from './HashTag'
import { PostHashTag } from './PostHashTag'

@Table({
  paranoid: true,
  tableName: 'posts',
  timestamps: true,
})
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public postId!: number

  @Length({ max: 140 })
  @Column
  public content!: string

  @Length({ max: 200 })
  @AllowNull
  @Column
  public img?: string

  @BelongsTo(() => User, 'userId')
  public users?: User

  @BelongsToMany(
    () => HashTag,
    () => PostHashTag,
  )
  public hashtagsId!: HashTag[]

  public removePost!: (postId: number) => Promise<void>
}
