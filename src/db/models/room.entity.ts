import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomUserMessageEntity } from './room-user-message.entity';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => RoomUserMessageEntity, (rume) => rume.room)
  userMessages: RoomUserMessageEntity[];
}
