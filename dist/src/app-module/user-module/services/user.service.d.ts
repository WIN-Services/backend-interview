import { Logger } from "@nestjs/common";
import { CreateUserDto } from "../dto/create.dto";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private readonly logger;
    private userRepository;
    private jwtService;
    constructor(logger: Logger, userRepository: UserRepository, jwtService: JwtService);
    create(body: CreateUserDto): Promise<UserEntity | any>;
    findByPagnation(skip: number, limit: number, page: number): Promise<{
        docs: any;
        nextPage: number;
    }>;
    deleteByUserId(userId: string): Promise<any>;
    updateByUserId(body: CreateUserDto, userId: string): Promise<any>;
}
