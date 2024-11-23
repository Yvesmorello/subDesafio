import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Roles } from 'src/auth/decorators/roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  async create(@Body() body: { username: string; password: string; role?: string }) {
    const { username, password, role } = body;
    return this.usersService.create(username, password, role);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Roles('admin')
  @Get(':username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Roles('admin', 'user')
  @Put(':id')
  update(@Param('id') id: number, @Body() body: { username?: string; password?: string; }) {
    const { username, password } = body;
    return this.usersService.update(+id, username, password);
  }

  @Roles('admin', 'user')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.usersService.remove(id);
      return { message: 'Usuario excluído com sucesso' };
    } catch (error) {
      throw new NotFoundException('Erro ao excluir o usuario.');
    }
  }
}
