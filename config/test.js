const testConfig = {
    appName: 'wedding-api',
    port: 4000,
    host: 'localhost',
    pino: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }
};

export default testConfig;