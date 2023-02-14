import pino from 'pino';
import config from 'config';

/**
 * Creates a pino logger. If the environment is 'development', creates an instance of the pino
 * logger that has the proper formatting options
 * @returns {Logger} An instance of pino, or formatted instance of pino if the Node Environment is 'develop'.
 */
const pinoLogger = () => {
    // Get environment, or dev by default
    const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'dev'

    // Enrich pino logger with formatting options if the Node Environment is dev
    if (env === 'dev') {
        return pino(config.get('pino'))
    }

    return pino();
}

export default pinoLogger();