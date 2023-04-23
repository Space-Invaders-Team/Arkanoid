/* eslint-disable @typescript-eslint/no-unused-vars */
import { AutoIncrement, AllowNull, PrimaryKey, Column, DataType, Model, Table, Unique } from 'sequelize-typescript';
import type { TTheme } from './typings';

@Table({
  tableName: 'themes',
  paranoid: true, // add 'deleted_at'
  })
export class Theme extends Model<TTheme> {
  @AutoIncrement
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
    theme_id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
    theme_name!: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
    theme_icon!: string;
}
