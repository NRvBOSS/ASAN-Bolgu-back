import { Module } from '@nestjs/common';
import { VolunteersModule } from './volunteers/volunteers.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'volunteersystem',
      autoLoadEntities: true,
      synchronize: true,
    }),
    VolunteersModule,
    AssignmentsModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
