export interface Logger {
    log(message?: any, ...optionalParams: any[]): void;

    error(message?: any, ...optionalParams: any[]): void;
}

export class SimpleConsoleLogger implements Logger {
    log(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }
    error(message?: any, ...optionalParams: any[]) {
        console.error(message, ...optionalParams);
    }
}

const LOGGERS: Record<string, () => Logger> = {
    'default': () => new SimpleConsoleLogger(),
};

/**
 * Factory which provides capabilities of managing and providing Logger instances.
 */
export class LogManager {
    constructor() {
    }

    /**
     * Provides a Logger instance which corresponds to the environment given. If no environment is specified,
     * a default Logger instance will be returned.
     * 
     * @param {string?} environment The application environment such as `'development'` or `'production'`.
     * @returns {Logger}
     */
    static getLogger(environment?: string): Logger {
        return (LOGGERS[environment ?? 'default'] ?? LOGGERS['default'])();
    }
}