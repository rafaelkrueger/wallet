import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Encryption {
  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 15);
    return hash;
  }

  async compare(plainPassword: string, hashPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashPassword);
    return isMatch;
  }
}
