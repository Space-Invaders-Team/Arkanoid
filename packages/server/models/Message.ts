/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Index, Model, NotEmpty, Table } from 'sequelize-typescript';
import type { TMessage } from './typings';
import { Topic } from './Topic';
import { Forum } from './Forum';
import { User } from './User';

@Table({
  tableName: 'messages',
  paranoid: true, // add 'deleted_at'
  })
export class Message extends Model<TMessage> {
  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @Index
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
    user_id!: number;

  @Index
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
    topic_id!: number;

  @Index
  @ForeignKey(() => Forum)
  @Column(DataType.INTEGER)
    forum_id!: number;

  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @Column
    content!: string;

  @Index
  @ForeignKey(() => Message)
  @Column(DataType.INTEGER)
    parent_id!: number;

  @BelongsTo(() => Topic, 'topic_id')
    topic!: Topic;

  @BelongsTo(() => Forum, 'forum_id')
    forum!: Forum;

  @BelongsTo(() => Message, 'parent_id')
    parent: Message | undefined;

  @BelongsTo(() => User)
    user!: User;
}
