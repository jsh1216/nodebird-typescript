import {
  Table,
  Column,
  Length,
  AllowNull,
  Unique,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript'

import { Post } from './Post'
import { Follow } from './Follow'
import { Like } from './Like'

@Table({
  paranoid: true,
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
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

  @Length({ max: 10 })
  @Column
  public provider!: string

  @AllowNull
  @Length({ max: 30 })
  @Column
  public snsId?: string

  @HasMany(() => Post, 'userId')
  public posts?: Post[]

  /**
   * 내가 팔로우 하는 사람들
   */
  @BelongsToMany(
    () => User,
    () => Follow,
    'followingId',
  )
  public followings!: User[]

  /**
   * 나를 팔로우 하는 사람들
   */
  @BelongsToMany(
    () => User,
    () => Follow,
    'followerId',
  )
  public followers!: User[]

  @BelongsToMany(
    () => User,
    () => Like,
    'likeId',
  )
  public Likes!: User[]

  @BelongsToMany(
    () => User,
    () => Like,
    'likerId',
  )
  public Likers!: User[]

  public addFollowing!: (follower: number) => Promise<void>
  public removeFollowing!: (follower: number) => Promise<void>
  // public getFollowers!: () => Promise<User[]>

  public addLiker!: (like: number) => Promise<void>
  public removeLiker!: (like: number) => Promise<void>
}
