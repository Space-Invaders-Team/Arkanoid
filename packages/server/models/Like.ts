/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import { User } from './User';
import { Message } from './Message';

@Table({
  tableName: 'likes',
  })
export class Like extends Model {
  @Index
  @AllowNull(false)
  @Column(DataType.STRING)
    type!: string;

  @Index
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
    user_id!: number;

  @Index
  @ForeignKey(() => Message)
  @Column(DataType.INTEGER)
    message_id!: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user!: User;

  @BelongsTo(() => Message, { onDelete: 'CASCADE' })
    message!: Message;
}
