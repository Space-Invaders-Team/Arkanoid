/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Index, Model, NotEmpty, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import type { TUser } from './typings';
import { Theme } from './Theme';

@Table({
  tableName: 'users',
  paranoid: true, // add 'deleted_at'
  })
export class User extends Model<TUser> {
  @Unique
  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @PrimaryKey
  @Column(DataType.INTEGER)
    user_id!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
    user_name!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
    user_game_name!: string;

  @Column
  @AllowNull(true)
  @Column(DataType.STRING)
    avatar!: string;

  // TODO
  // @HasMany(() => Message)
  //   messages!: Message[];

  @Index
  @AllowNull(true)
  @ForeignKey(() => Theme)
  @Column(DataType.INTEGER)
    theme!: number;

  @BelongsTo(() => Theme, 'theme')
    themes!: Theme;
}
