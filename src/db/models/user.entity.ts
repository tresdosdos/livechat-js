import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomUserMessageEntity } from './room-user-message.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => RoomUserMessageEntity, (rume) => rume.user)
  roomsMessages: RoomUserMessageEntity[];
}
