import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  //GET USERS
  async getAll() {
    return await this.repo.find();
  }

  getOneById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async getOneByEmail(email: string) {
    return await this.repo.findOneBy({ email });
  }

  getUserByEmail(email: string) {
    // async getUserByEmail({ email }: CreateUserDTO) {
    return this.repo.findOne({ where: { email } });
  }

  //CREATE USER
  async create(createUserDto: CreateUserDTO): Promise<User> {
    const { email, password } = createUserDto;

    // console.log(email, 'É isso aqui')

    if (await this.getUserByEmail(email)) {
      throw new Error(`User ${email}`)
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    return this.repo.save(user);
  }

  //UPDATE USER
  //attrs é um objeto que você pode passar
  async update(id: number, attrsUser: Partial<User>) {
    const UserEntity = await this.getOneById(id);
    if (!UserEntity) {
      throw new Error('user not found');
    }
    Object.assign(UserEntity, attrsUser);
    return this.repo.save(UserEntity);
  }

  //DELETE USER
  async delete(id: number) {
    const UserEntity = await this.getOneById(id);
    if (!UserEntity) {
      throw new Error('user not found');
    }
    // C
    return this.repo.remove(UserEntity);
  }
}
