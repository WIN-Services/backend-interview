import { Model } from "mongoose";
import { UserEntity } from "../entities/user.entity";
import { UserInterface } from "../interface/user.interface";
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserInterface>);
    saveUser(body: UserEntity): Promise<UserInterface>;
    updateUser(body: Partial<UserEntity>, userId: string): Promise<any>;
    deleteUser(userId: string): Promise<any>;
    findByEmail(email: string): Promise<UserInterface>;
    findById(userId: string): Promise<UserInterface>;
    findByPagination(skip: number, limit: number): Promise<any>;
}
