import { Body, Controller, Delete, Get, Param, Post, Put, Query, Session, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
// import { AuthService } from './auth.service';
import { CreateUserDTO } from './create-user.dto';
import { serialize } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    // private authService: AuthService
    ) {}

  @Get('/getallusers')
  getAll() {
    return this.usersService.getAll();
  } 

  @Get('/signup/:id')
  getById(@Param('id') id: string){
    return this.usersService.getOneById(parseInt(id));
  }

  // @Post('/signup')
  // async createUser(@Body() body: CreateUserDTO) {
  //   return await this.authService.signup(body.email, body.password);
  // }

  // @Post('/signin')
  // async signin(@Body() body: CreateUserDTO) {
  //   return await this.authService.signin(body.email, body.password);
  // }

  @Get('/email')
  getAllUserByEmail(@Body() body: CreateUserDTO) {
    return this.usersService.getOneByEmail(body.email);
  }

  // @Get('/email2')
  // getAllUserByEmail(@Query('email') email: string) {
  //   return this.usersService.getUserByEmail(email);
  // }


  // @Post('/signup')
  // createUser(@Body() body: CreateUserDTO) {
  //   this.usersService.create(body.email, body.password);
  // }

  // @Get('whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.getOne(session.userId);
  // }

  // @Post('/signup')
  // createUser(@Body() body: CreateUserDTO, @Session() session: any) {
  //   const user = this.authService.signup(body.email, body.password);
  //   session.userId = user
  //   return user;
  // }

  // @Post('/signin')
  // signin(@Body() body: CreateUserDTO, @Session() session: any) {
  //   const user = this.authService.signin(body.email, body.password);
  //   session.userId = user;
  //   return user;
  // }

//POST ORIGINAL
  // @Post('/signup')
  // createUser(@Body() body: CreateUserDTO) {
  //   return this.authService.signup(body.email, body.password);
  // }

  // @Post('/signin')
  // signin(@Body() body: CreateUserDTO) {
  //   return this.authService.signin(body.email, body.password);
  // }

  @Put('/signup/:id')
  update(@Param('id') id: string, @Body() body: CreateUserDTO){
    return this.usersService.getOneById(parseInt(id));
  }

  @Delete('/signup/:id')
  delete(@Param('id') id: string){
    return this.usersService.getOneById(parseInt(id));
  }

}
