import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomUserMessageEntity } from './room-user-message.entity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => RoomUserMessageEntity, (rume) => rume.message)
  roomUsers: RoomUserMessageEntity[];
}
