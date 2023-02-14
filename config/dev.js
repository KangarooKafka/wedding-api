const devConfig = {
    appName: 'wedding-api',
    port: 4000,
    host: 'localhost',
    mongo: {
        uri: 'mongodb://localhost:27017/wedding-dev'
    },
    pino: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }
};

export default devConfig;