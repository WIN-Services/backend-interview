import { Logger } from "winston";
import { CreateUserDto } from "../dto/create.dto";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";
export declare class AuthController {
    private readonly logger;
    private userService;
    constructor(logger: Logger, userService: UserService);
    signup(body: CreateUserDto): Promise<UserEntity>;
}
