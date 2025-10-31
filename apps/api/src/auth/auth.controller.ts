import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from 'dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 409, description: 'Conflict. Email or username already exists.' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({ status: 201, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto)
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({ name: 'userId', description: 'The ID of the user to update' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 409, description: 'Conflict. Email or username already exists.' })
  updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userId, updateUserDto);
  }
}