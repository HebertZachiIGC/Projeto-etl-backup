import { IsString, IsEmail, Matches } from 'class-validator';
import * as bcrypt from 'bcrypt';

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  @Matches(/@igcp\.com\.br$/, {
    message: 'O email deve ter o domínio @igcp.com.br',
  })
  email: string;

  @IsString()
  password: string;

  // async validatePassword(password: string): Promise<boolean> {
  //   return bcrypt.compare(password, this.password);
  // }
}
