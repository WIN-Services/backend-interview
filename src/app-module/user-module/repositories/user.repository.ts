import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private db: Connection) {
    super();
  }
  public async saveUser(body: UserEntity): Promise<any> {
    return this.save(body);
  }
  public async updateUser(
    body: Partial<UserEntity>,
    userId: string,
  ): Promise<any> {
    const data = await this.update(
      { id: userId },
      {
        email: body.email,
        name: body.name,
      },
    );
    return data;
  }
  public async deleteUser(userId: string): Promise<any> {
    const data = await this.update(
      { id: userId },
      {
        isDeleted: true,
      },
    );
    return data;
  }
  public async findByEmail(email: string): Promise<any> {
    const data = await this.findOne({
      where: {
        email: email,
        isDeleted: false,
      },
    });
    return data;
  }
  public async findById(userId: string): Promise<any> {
    const data = await this.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
    });

    return data;
  }

  public async findByPagination(skip: number, limit: number): Promise<any> {
    const result = await this.find({
      where: {
        isDeleted: false,
      },
      order: { createdAt: -1 },
      take: limit,
      skip: skip,
    });
    console.log('result', result);
    const userArray = [];
    result.map((data) => {
      userArray.push({
        email: data.email,
        name: data.name,
        userId: JSON.parse(JSON.stringify(data.id)),
      });
    });
    return userArray;
  }
}
