/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, NotEmpty, Table, Unique, Index } from 'sequelize-typescript';
import type { TTopic } from './typings';
// eslint-disable-next-line import/no-cycle
import { Forum } from './Forum';
// eslint-disable-next-line import/no-cycle
import { Message } from './Message';

@Table({
  tableName: 'topics',
  paranoid: true, // add 'deleted_at'
  })
export class Topic extends Model<TTopic> {
  @Unique
  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @Column(DataType.STRING)
    name!: string;

  @Index
  @ForeignKey(() => Forum)
  @Column(DataType.INTEGER)
    forum_id!: number;

  @BelongsTo(() => Forum, 'forum_id')
    forum!: Forum;

  @HasMany(() => Message, 'topic_id')
    messages!: Message[];
}
