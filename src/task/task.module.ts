import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { Task } from './entity/task.entity';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CacheModule.register()],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
