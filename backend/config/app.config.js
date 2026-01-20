const express = require("express");
const cors = require("cors");

module.exports = (app) => {
    // CORS configuration
    app.use(cors({
        origin: ["http://localhost:3000", "http://localhost:5173"], // Common frontend ports
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }));

    // Body parsing middleware
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Debug middleware to log request info (remove in production)
    if (process.env.NODE_ENV === "development") {
        app.use((req, res, next) => {
            if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
                const contentType = req.get("Content-Type") || "";
                if (contentType.includes("multipart/form-data")) {
                    console.log(`[${req.method}] ${req.path} - Content-Type: ${contentType}, Body: [Multipart - will be parsed by multer]`);
                } else {
                    console.log(`[${req.method}] ${req.path} - Content-Type: ${contentType}, Body:`, req.body);
                }
            }
            next();
        });
    }
};
