import { Utility } from "src/utils/utility";
import { Logger } from "winston";
import { CreateUserDto } from "../dto/create.dto";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";
export declare class UserController {
    private readonly logger;
    private userService;
    private utilityService;
    constructor(logger: Logger, userService: UserService, utilityService: Utility);
    create(body: CreateUserDto): Promise<UserEntity>;
    getAllUsers(queryParam: any): Promise<any>;
    updateUser(userId: string, body: CreateUserDto): Promise<UserEntity>;
    deleteUser(userId: string): Promise<any>;
}
