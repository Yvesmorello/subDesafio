import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()  
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')  
  async login(@Body() body: { username: string, password: string }) {
    const { username, password } = body;
    return this.authService.login(await this.authService.validateUser(username, password));
  }
}
