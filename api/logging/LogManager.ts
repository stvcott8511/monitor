export interface Logger {
    log(message?: any, ...optionalParams: any[]): void;

    error(message?: any, ...optionalParams: any[]): void;
}

export class SimpleLogger implements Logger {
    log(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }
    error(message?: any, ...optionalParams: any[]) {
        console.error(message, ...optionalParams);
    }
}

const LOGGERS: Record<string, () => Logger> = {
    'default': () => new SimpleLogger(),
};

export class LogManager {
    constructor() {
    }

    static getLogger(environment?: string): Logger {
        return (LOGGERS[environment ?? 'default'] ?? LOGGERS['default'])();
    }
}