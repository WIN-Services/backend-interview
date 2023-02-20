import { Controller, Get, UseGuards } from '@nestjs/common';
import { InternalApiGuard } from './guards/internal.api.guard';
import { AppService } from './app.service';

@Controller('/api')
@UseGuards(InternalApiGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
