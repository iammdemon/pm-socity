"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = exports.client = void 0;
const minio_1 = require("minio");
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../config"));
const useSSL = config_1.default.MINIO_USE_SSL === "true";
const protocol = useSSL ? "https" : "http";
const portPart = config_1.default.MINIO_PORT && !useSSL ? `:${config_1.default.MINIO_PORT}` : "";
exports.client = new minio_1.Client({
    endPoint: config_1.default.MINIO_ENDPOINT,
    port: Number(config_1.default.MINIO_PORT) || undefined,
    useSSL,
    accessKey: config_1.default.MINIO_ACCESS_KEY,
    secretKey: config_1.default.MINIO_SECRET_KEY,
});
exports.StorageService = {
    ensureBucket: (bucket) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exists = yield exports.client.bucketExists(bucket);
            if (!exists)
                yield exports.client.makeBucket(bucket);
        }
        catch (err) {
            console.error(`Failed to ensure bucket ${bucket}:`, err);
            throw err;
        }
    }),
    uploadFile: (bucket, file) => __awaiter(void 0, void 0, void 0, function* () {
        yield exports.StorageService.ensureBucket(bucket);
        const uniqueName = `${crypto_1.default.randomUUID()}-${file.originalname}`;
        yield exports.client.putObject(bucket, uniqueName, file.buffer, file.size, {
            "Content-Type": file.mimetype,
        });
        const fileUrl = `${protocol}://${config_1.default.MINIO_ENDPOINT}${portPart}/${bucket}/${uniqueName}`;
        return { fileUrl, key: uniqueName };
    }),
    deleteFile: (bucket, fileUrl) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Extract the object key from full URL
            const url = new URL(fileUrl);
            const parts = url.pathname.split("/").filter(Boolean); // remove empty segments
            const objectName = parts.slice(1).join("/"); // bucket/object
            yield exports.client.removeObject(bucket, objectName);
            console.log(`Deleted ${objectName} from bucket ${bucket}`);
        }
        catch (err) {
            console.warn("Failed to delete old file:", err);
        }
    }),
};
