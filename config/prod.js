import * as process from "process";

const prodConfig = {
    appName: 'wedding-api',
    port: 4000,
    host: 'localhost',
    mongo: {
        uri: `mongodb://${process.env.DBUSER}:${process.env.DBPASSWD}@localhost:27017/wedding`
    }
};

export default prodConfig;