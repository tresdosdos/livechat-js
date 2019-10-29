import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserRequestDto } from '../utils/dto/user-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../db/models';
import { Repository } from 'typeorm';
import { InvalidCredentialsError, UserExistsError } from '../utils/errors';

const SALT_FACTOR = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  public async register(userData: UserRequestDto) {
    const { username, password } = userData;
    await this.isUserExists(username);

    const hashedPassword = await this.hashPassword(password);
    const encryptedData = { username, password: hashedPassword };

    const user = this.userRepo.create(encryptedData);
    return  this.userRepo.save(user);
  }

  public async login(userData: UserRequestDto) {
    const { username, password } = userData;

    const foundUser = await this.userRepo.findOne({username});

    if (!foundUser) {
      throw new InvalidCredentialsError();
    }

    const isPassswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPassswordValid) {
      throw new InvalidCredentialsError();
    }

    return foundUser;
  }

  private async isUserExists(username: string) {
    const foundUser = await this.userRepo.findOne({ username });

    if (foundUser) {
      throw new UserExistsError();
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_FACTOR);

    return bcrypt.hash(password, salt);
  }
}
