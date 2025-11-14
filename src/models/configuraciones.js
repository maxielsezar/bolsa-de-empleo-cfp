const configuraciones = {
    appconfiguraciones: { 
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    dbConfiguraciones: {  
        port: process.env.APP_PORT,
        host: process.env.APP_HOST,
        dbName: process.env.DB_NAME
    }  
    }     

module.exports = configuraciones    