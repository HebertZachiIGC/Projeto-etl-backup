import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'secret',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}



// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   Logger,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// // auth.guard.ts
// @Injectable()
// export class AuthGuard implements CanActivate {
//   private readonly logger = new Logger(AuthGuard.name);

//   constructor(private reflector: Reflector) {}
//   canActivate(context: ExecutionContext): boolean {
//     const isPublic = this.reflector.get<boolean>(
//       'isPublic',
//       context.getHandler(),
//     );
//     if (isPublic) return true;

//     const request = context.switchToHttp().getRequest();
//     // we use a hardcoded string to validate the user for sake of simplicity
//     this.logger.log(request.headers);
//     return true;
    // return false;
    // return request.headers?.authorization === 'valid_token';
//   }
// }
