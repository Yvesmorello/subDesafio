import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './post/task.module';
import { User } from './users/entity/user.entity';
import { Task } from './post/entity/task.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,       
      username: 'postgres', 
      password: 'postgres', 
      database: 'nestjs_api', 
      entities: [User, Task],   
      synchronize: true,
    }),
    TasksModule, UsersModule, AuthModule,
  ],
})
export class AppModule {}
 