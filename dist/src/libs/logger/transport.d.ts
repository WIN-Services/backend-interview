import * as transport from "winston-transport";
declare class customtransport extends transport {
    constructor(opts: any);
    log(info: any, callback: any): Promise<void>;
}
export default customtransport;
