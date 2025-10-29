import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from 'dto';
import * as bcrypt from 'bcrypt';
import { EmailConflictException } from '../common/exceptions/email-conflict.exception';
import { InvalidCredentialsException } from '../common/exceptions/invalid-credentials.exception';
import { UserNotFoundException } from '../common/exceptions/user-not-found.exception';
import { UsernameConflictException } from '../common/exceptions/username-conflict.exception';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email }});
    if (existingUser) {
      throw new EmailConflictException(dto.email);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        bucket: {
          create: {},
        },
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async login(dto: UserLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email},
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new InvalidCredentialsException();
    }

    const { password, ...result } = user;
    return result;
  }

  async updateUser(userId: number, dto: UpdateUserDto) {

    const userToUpdate = await this._validateUserExistsById(userId);

    await this._validateEmailUniqueness(dto, userToUpdate);
    await this._validateUsernameUniqueness(dto, userToUpdate);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstname: dto.firstname,
        lastname: dto.lastname,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
        username: dto.username
      }
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  private async _validateUserExistsById(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new UserNotFoundException(userId);
    }
    return user;
  }

  private async _validateEmailUniqueness(dto: UpdateUserDto, currentUser: User): Promise<void> {
    if (dto.email && dto.email !== currentUser.email) {
      const emailExists = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (emailExists) {
        throw new EmailConflictException(dto.email);
      }
    }
  }

  private async _validateUsernameUniqueness(dto: UpdateUserDto, currentUser: User): Promise<void> {
    if (dto.username && dto.username !== currentUser.username) {
      const usernameExists = await this.prisma.user.findUnique({ where: { username: dto.username } });
      if (usernameExists) {
        throw new UsernameConflictException(dto.username);
      }
    }
  }
}