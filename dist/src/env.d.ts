export declare const env: {
    node: string;
    isProduction: boolean;
    isTest: boolean;
    isDevelopment: boolean;
    app: {
        name: string;
        version: string;
        description: string;
        host: string;
        routePrefix: string;
        port: string;
        banner: boolean;
    };
    log: {
        level: string;
        json: boolean;
        output: string;
        path: string;
        request: boolean;
        request_body: boolean;
        response: boolean;
        error: boolean;
    };
    mongoDb: {
        type: string;
        host: string;
        username: string;
        password: string;
        port: number;
        database: string;
        synchronize: boolean;
    };
    jwt: {
        accessKey: string;
        refreshKey: string;
        expirationTime: string;
        adminTokenSecret: string;
    };
};
