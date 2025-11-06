import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength, Matches } from 'class-validator';
import { Role } from './enums';
import { ApiProperty } from '@nestjs/swagger';

const phoneRegex = /^\+[1-9]\d{7,14}$/;
const phoneMessage = 'phoneNumber must be in international format (starting with +)';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: "User's first name" })
  @IsString()
  @IsNotEmpty()
  firstname!: string;

  @ApiProperty({ example: 'Ivanov', description: "User's last name" })
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @ApiProperty({ example: '+1234567890', description: "User's phone number" })
  @Matches(phoneRegex, { message: phoneMessage })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ example: 'ivan.ivanov@example.com', description: "User's email address" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'ivan_ivanov', description: "User's unique username" })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'password123', description: 'User password (min 8 characters)' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @ApiProperty({ example: Role.USER, description: "User's role" })
  @IsEnum(Role)
  role!: Role;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'Ivan', description: "User's first name", required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstname?: string;

  @ApiProperty({ example: 'Ivanov', description: "User's last name", required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastname?: string;

  @ApiProperty({ example: '+1987654321', description: "User's phone number", required: false })
  @Matches(phoneRegex, { message: phoneMessage })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty({ example: 'ivan.new@example.com', description: "User's email address", required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'ivan_ivanov_new', description: "User's unique username", required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;
}

export class UserLoginDto {
  @ApiProperty({ example: 'ivan.ivanov@example.com', description: "User's email" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123', description: "User's password" })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

