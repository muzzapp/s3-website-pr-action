"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
exports.default = new client_s3_1.S3Client({ region: "us-east-1" });
