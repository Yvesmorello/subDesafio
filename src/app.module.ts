import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './task/task.module';
import { User } from './users/entity/user.entity';
import { Task } from './task/entity/task.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/role-guards';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 100,
      isGlobal: true
    }),
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
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard}, 
    { provide: APP_GUARD, useClass: RolesGuard}]
})
export class AppModule {}
 