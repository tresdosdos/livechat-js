import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';
import { MessageEntity } from './message.entity';

@Entity('room_user_message')
export class RoomUserMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.roomsMessages)
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.userMessages)
  room: RoomEntity;

  @ManyToOne(() => MessageEntity, (message) => message.roomUsers)
  message: MessageEntity;
}
