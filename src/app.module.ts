import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VolunteersModule } from './volunteers/volunteers.module';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [VolunteersModule, AssignmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
