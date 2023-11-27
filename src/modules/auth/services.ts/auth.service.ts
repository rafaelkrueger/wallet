import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../schemas';
import { JwtService } from '@nestjs/jwt';
import { Encryption } from './encryption';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
    private readonly jwtService: JwtService,
    private readonly encription: Encryption,
  ) {}

  async create(user) {
    const userAlreadyExists = await this.findByEmailAndPassword(
      user.email,
      user.password,
    );
    if (userAlreadyExists) {
      return HttpStatus.CONFLICT;
    }
    user.password = await this.encryptPassword(user.password);
    const createdUser = await new this.userModel(user);
    return await createdUser.save();
  }

  async findByToken(token: string) {
    return await this.userModel.findOne({ token: token });
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, user: UserDto) {
    await this.userModel.updateOne({ _id: id }, user).exec();
    return this.findById(id);
  }

  private async findByEmailAndPassword(email: string, password: string) {
    return await this.userModel.findOne({
      $or: [{ email: email }, { password: password }],
    });
  }

  async getUser(user) {
    const userEntity = await this.userModel.findOne({
      email: user.email,
    });
    const passwordCorrect = await this.validatePassword(
      user.email,
      user.password,
    );
    if (!userEntity || !passwordCorrect) {
      return HttpStatus.NOT_FOUND;
    }
    const payload = { sub: userEntity.id };
    const options = {
      expiresIn: 360,
      privateKey: 'teste',
    };
    const accessToken = await this.generateAccessToken(payload, options);
    if (userEntity) {
      await this.userModel
        .updateOne({ _id: userEntity._id }, { token: accessToken })
        .exec();
      return accessToken;
    } else {
      return HttpStatus.NOT_FOUND;
    }
  }

  async generateAccessToken(payload: any, options: any) {
    return await this.jwtService.sign(payload, options);
  }

  async encryptPassword(plainTextPassword: string): Promise<string> {
    Logger.log('Encrypting password...');
    const encryptedPassword = await this.encription.encrypt(plainTextPassword);
    Logger.log('Password encrypted');
    return encryptedPassword;
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email: email });
    const checkedPassword = await this.encription.compare(
      password,
      user.password,
    );
    return checkedPassword;
  }
}
