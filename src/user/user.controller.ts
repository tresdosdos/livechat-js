import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserRequestDto } from '../utils/dto/user-request.dto';
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from '../utils/dto/UserResponseDto';
import { JwtService } from '../utils/jwt.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    ) {}

  @Post('register')
  async register(@Body() user: UserRequestDto, @Res() res: Response) {
    const savedUser = await this.userService.register(user);
    const token = this.jwtService.generateToken(savedUser.id);

    const userDto = plainToClass(UserResponseDto, savedUser, {strategy: 'excludeAll'});

    res.setHeader('Authorization', token);
    res.status(201).send(userDto);
  }

  @Post('login')
  async login(@Body() userData: UserRequestDto) {
    const user = await this.userService.login(userData);

    return plainToClass(UserResponseDto, user, {strategy: 'excludeAll'});
  }
}
