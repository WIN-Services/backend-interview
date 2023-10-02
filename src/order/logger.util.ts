export class LoggerUtil {
    static log(message: string) {
        console.log(message);
    }

    static error(message: string, error: any) {
        console.error(message, error);
    }
}
