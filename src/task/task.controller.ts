import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { TasksService } from './task.service';
import { Task } from './entity/task.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() body: { name: string; description: string; dueDate: Date; assignedTo: string }): Promise<Task> {
    const { name, description, dueDate, assignedTo } = body;
    return this.tasksService.create(name, description, dueDate, assignedTo);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }
  

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { name?: string; description?: string; dueDate?: Date; status?: string; assignedTo?: string }): Promise<Task> {
    const { name, description, dueDate, status, assignedTo } = body;
    return this.tasksService.update(id, name, description, dueDate, status, assignedTo);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.tasksService.remove(id);
      return { message: 'Tarefa excluída com sucesso' };
    } catch (error) {
      throw new NotFoundException('Erro ao excluir a tarefa.');
    }
  }
}
