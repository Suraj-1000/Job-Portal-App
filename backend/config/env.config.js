const { getEnv } = require("@/utils/index");

module.exports = {
    PORT: getEnv("PORT", "5000"),

    // Database (PostgreSQL)
    PG_HOST: getEnv("PG_HOST", "localhost"),
    PG_PORT: getEnv("PG_PORT", "5432"),
    PG_USER: getEnv("PG_USER", "postgres"),
    PG_PASSWORD: getEnv("PG_PASSWORD", "postgres"),
    PG_DATABASE: getEnv("PG_DATABASE", "job_test_db"),

    // JWT
    JWT_SECRET: getEnv("JWT_SECRET", "mysecretkey"),
    JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", "myrefreshsecretkey"),
    JWT_ACCESS_EXPIRY: getEnv("JWT_ACCESS_EXPIRY", "15m"),
    JWT_REFRESH_EXPIRY: getEnv("JWT_REFRESH_EXPIRY", "7d"),

    // Email
    EMAIL_USER: getEnv("EMAIL_USER", "dsurajkunwor101@gmail.com"),
    EMAIL_APP_PASSWORD: getEnv("EMAIL_APP_PASSWORD", "ndyn dnoi bswq pcss"),

    // URIs
    BACKEND_URI: getEnv("BACKEND_URI", "http://localhost:5000"),
    FRONTEND_URI: getEnv("FRONTEND_URI", "http://localhost:5173"),

    // Common defaults
    NODE_ENV: getEnv("NODE_ENV", "development")
};
