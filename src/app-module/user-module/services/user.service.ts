import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create.dto";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
const _ = require("lodash");

@Injectable()
export class UserService {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}
  public async create(body: CreateUserDto): Promise<UserEntity | any> {
    try {
    } catch (error) {
      console.log("error", error);
      if (error.code === 11000)
        throw new BadRequestException("User already Exists");
      else {
        throw new BadRequestException("Internal Server Error");
      }
    }
  }
  public async findByPagnation(skip: number, limit: number, page: number) {
    try {
      const data = await this.userRepository.findByPagination(skip, limit + 1);
      const nextPage = data.length < limit + 1 ? null : Number(page) + 1;
      const docs = data.length < limit + 1 ? data : data.slice(0, limit + 1);
      return {
        docs: docs,
        nextPage: nextPage,
      };
    } catch (error) {
      console.log("Error", error);
      return {
        docs: [],
        nextPage: null,
      };
    }
  }
  public async deleteByUserId(userId: string): Promise<any> {
    try {
      return this.userRepository.deleteUser(userId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async updateByUserId(
    body: CreateUserDto,
    userId: string
  ): Promise<any> {
    try {
      return this.userRepository.updateUser(body, userId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
}
