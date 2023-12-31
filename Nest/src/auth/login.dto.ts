// auth/login.dto.ts
import { IsEmail, IsString, Matches } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsEmail({}, { message: 'O email fornecido não é válido' })
  @Matches(/@igcp\.com\.br$/, { message: 'O email deve ter o domínio @igcp.com.br' })
  email: string;

  @IsString()
  password: string;
}

