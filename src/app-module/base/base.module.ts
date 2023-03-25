import { Module } from "@nestjs/common";
import { BaseEntity } from "./entities/base.entity";
@Module({
  imports: [],
  controllers: [],
  providers: [BaseEntity],
  exports: [BaseEntity],
})
export class BaseModule {}
