import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: { username: string; password: string; role?: string }) {
    const { username, password, role } = body;
    return this.usersService.create(username, password, role);
  }

  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }
  @Get(':username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { username?: string; password?: string; role?: string }) {
    const { username, password, role } = body;
    return this.usersService.update(+id, username, password, role);
  }

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
