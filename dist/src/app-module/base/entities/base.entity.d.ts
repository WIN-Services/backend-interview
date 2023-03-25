export declare class BaseEntity {
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    beforeInsertActions(): void;
}
