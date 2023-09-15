// auth/auth.service.ts

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDTO) {
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // createUserDto.password = hashedPassword;

    return await this.usersService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
    // throw new BadRequestException();
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    console.log(payload, "testando");
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { CreateUserDTO } from 'src/users/create-user.dto';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import { create } from 'domain';
// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UsersService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async signIn(createUserDto: CreateUserDTO) {
//     const { email , password } = createUserDto;

//     const user = await this.usersService.getOneByEmail(email);

//     if (!user) {
//       throw new UnauthorizedException('Invalid username or password');
//     }

//     const passwordIsValid = await user.validatePassword(password);

//     if (!passwordIsValid) {
//       throw new UnauthorizedException('Invalid username or password');
//     }

//     const payload = { id: user.id, email: user.email };
//     const accessToken = await this.jwtService.signAsync(payload);

//     return { access_token: accessToken };
//   }
// }

// import { BadRequestException, Get, Injectable, NotFoundException } from "@nestjs/common";
// import { UsersService } from "./users.service"
// import { randomBytes, scrypt as _scrypt } from "crypto";
// import { promisify } from "util";
// import { JwtService } from "@nestjs/jwt";

// const scrypt =  promisify(_scrypt);

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService
//     ) {}

//   async signup(email: string, password: string) {
//     const users = await this.usersService.getOneByEmail(email)
//     if (users) {
//       throw new BadRequestException('Email in use',)
//     }
//     const salt = randomBytes(8).toString('hex');
//     const hash = (await scrypt(password, salt, 32)) as Buffer;
//     const result = salt + '.' + hash.toString('hex');
//     const user = await this.usersService.create(email, result)
//     return user;
//   }

//   async signin(email: string, password: string) {
//     const user = await this.usersService.getOneByEmail(email);
//     if (!user) {
//       throw new NotFoundException(`User ${email} not found`);
//     }
//     const [salt, storedHash] = user.password.split('.');
//     const hash = (await scrypt(password, salt, 32)) as Buffer;
//     if (storedHash !== hash.toString('hex')) {
//       throw new BadRequestException('Wrong password');
//     }
//     console.log({id: user.id, email: user.email});

//     const payload = {id: user.id, email: user.email };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }
// }
