import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Criar uma tarefa
  async create(name: string, description: string, dueDate: Date, assignedTo: string): Promise<Task> {
    const task = this.taskRepository.create({ name, description, dueDate, assignedTo });
    return this.taskRepository.save(task);
  }

  // Listar todas as tarefas
  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // Encontrar uma tarefa por ID
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // Atualizar uma tarefa
  async update(id: number, name?: string, description?: string, dueDate?: Date, status?: string, assignedTo?: string): Promise<Task> {
    const task = await this.findOne(id);
    if (name) task.name = name;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;
    if (assignedTo) task.assignedTo = assignedTo;
    return this.taskRepository.save(task);
  }

  // Remover uma tarefa
  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
