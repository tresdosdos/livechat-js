import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { MessageEntity } from './message.entity';
import { RoomEntity } from './room.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  @ManyToOne(() => RoomEntity, (room) => room.users)
  room: RoomEntity;
}
