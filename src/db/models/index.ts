import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';
import { RoomEntity } from './room.entity';
import { RoomUserMessageEntity } from './room-user-message.entity';

export default [UserEntity, MessageEntity, RoomEntity, RoomUserMessageEntity];
export * from './user.entity';
export * from './message.entity';
export * from './room.entity';
export * from './room-user-message.entity';
