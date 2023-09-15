// auth/auth.controller.ts

import { Controller, Post, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/create-user.dto'; // Importe o DTO de criação de usuário
import { LoginDTO } from './login.dto';
import { Public } from './public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDTO) {
    console.log(createUserDto)
    // Crie um novo usuário e retorne o token JWT após a criação bem-sucedida
    const user = await this.authService.createUser(createUserDto);
    return this.authService.login(user);
  }

  @Public()
  @Post('/signin')
  async login(@Body() loginDto: LoginDTO) {
    // Autentique o usuário e retorne o token JWT após a autenticação bem-sucedida
    console.log(loginDto)
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new BadRequestException("Email ou senha Invalidos"); // Trate as falhas de autenticação apropriadamente

    }

    return this.authService.login(user);
  }
}

// import { Controller } from '@nestjs/common';
// import { CreateUserDTO } from 'src/users/create-user.dto';
// import {  }
// import { UsersService } from 'src/users/users.service';

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private authService: AuthService,
//     private usersService: UsersService,
//     ) {}
// }

// @Post('/signup')
// async createUser(@Body() body: CreateUserDTO) {
//   return await this.authService.signup(body.email, body.password);
// }

// @Post('/signin')
// async signin(@Body() body: CreateUserDTO) {
//   return await this.authService.signin(body.email, body.password);
// }
