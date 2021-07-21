module.exports = {
    DATABASE_SERVER_IP: "localhost",
    DATABASE_USER: "root",
    DATABASE_PASSWORD: "1qaz2wsx@",
    DATABASE_SCHEMA_NAME : "debuggerpos",
    MAX_API_USAGE_LIMIT: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 500 // limit each IP to 300 requests per windowMs
    },
}