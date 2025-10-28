import { ConflictException } from '@nestjs/common';

export class EmailConflictException extends ConflictException {
  constructor(email: string) {
    super(`Email "${email}" already exists.`);
  }
}