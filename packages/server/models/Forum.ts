/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import type { TForum } from './typings';
// eslint-disable-next-line import/no-cycle
import { Topic } from './Topic';

@Table({
  tableName: 'forums',
  paranoid: true, // add 'deleted_at'
  })
export class Forum extends Model<TForum> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
    name!: string;

  @HasMany(() => Topic, 'forum_id')
    topics!: Topic[];
}
