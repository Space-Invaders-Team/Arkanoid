/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, Column, DataType, Model, NotEmpty, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import type { TUser } from './typings';

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

  @AllowNull(false)
  @Column(DataType.STRING)
    user_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
    user_game_name!: string;

  @Column
    avatar!: string;

  // TODO
  // @HasMany(() => Message)
  //   messages!: Message[];
}
