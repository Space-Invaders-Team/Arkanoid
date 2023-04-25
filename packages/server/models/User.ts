/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, BelongsTo, Column, DataType, HasMany, ForeignKey, Index, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import type { TUser } from './typings';
import { Theme } from './Theme';
// eslint-disable-next-line import/no-cycle
import { Message } from './Message';

@Table({
  tableName: 'users',
  paranoid: true, // add 'deleted_at'
  })
export class User extends Model<TUser> {
  // id from Yandex-BD
  @PrimaryKey
  @Column(DataType.INTEGER)
    user_id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
    first_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
    second_name!: string;

  @Column(DataType.STRING)
    display_name!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
    email!: string;

  @Column
  @AllowNull(true)
  @Column(DataType.STRING)
    avatar!: string;

  @Index
  @AllowNull(true)
  @ForeignKey(() => Theme)
  @Column(DataType.INTEGER)
    theme!: number;

  @BelongsTo(() => Theme, 'theme')
    themes!: Theme;

  @HasMany(() => Message)
    messages!: Message[];
}
