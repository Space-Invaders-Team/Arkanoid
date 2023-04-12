/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'forum',
  paranoid: true, // add 'deleted_at'
  })
export class Forum extends Model {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
    name!: string;
}
