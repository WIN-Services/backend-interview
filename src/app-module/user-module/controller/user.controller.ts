import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppInterceptor } from 'src/app.interceptor';
import { Public } from 'src/common/decorators';
import { Utility } from 'src/utils/utility';
import { Logger } from 'winston';
import { CreateUserDto } from '../dto/create.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@UseInterceptors(AppInterceptor)
@Controller()
@Public()
export class UserController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private userService: UserService,
    private utilityService: Utility,
  ) {}
  @Post('/create')
  @HttpCode(201)
  public create(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(body);
  }
  @Get()
  @HttpCode(200)
  public getAllUsers(@Query() queryParam: any): Promise<any> {
    const { skip, limit, page } = this.utilityService.getPagination(
      queryParam.page,
      queryParam.pageSize,
    );
    return this.userService.findByPagnation(skip, limit, page);
  }
  @Put('/:userId')
  @HttpCode(200)
  public updateUser(
    @Param('userId') userId: string,
    @Body() body: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateByUserId(body, userId);
  }
  @Delete('/:userId')
  public async deleteUser(@Param('userId') userId: string): Promise<any> {
    const data = await this.userService.deleteByUserId(userId);
    return data;
  }
}
