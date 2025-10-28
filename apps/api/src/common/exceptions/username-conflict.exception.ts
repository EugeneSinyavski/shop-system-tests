import { ConflictException } from '@nestjs/common';

export class UsernameConflictException extends ConflictException {
  constructor(username: string) {
    super(`Username "${username}" already exists.`);
  }
}