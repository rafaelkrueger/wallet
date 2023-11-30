import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Encryption {
  async encrypt(value: string): Promise<string> {
    const saltRounds = 10;
    if (value) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(value, salt);
      return hash;
    }
  }

  async compare(plainPassword: string, hashPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashPassword);
    return isMatch;
  }
}
