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
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const handleContactAvatarImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const imgWidth = 100;
    const imgHeight = 100;
    const uniqueSuffix = Date.now();
    const uploadDirPath = path_1.default.join(__dirname, '..', 'uploads', 'avatar');
    if (req.file) {
        const imgStorageName = `/${uniqueSuffix}.${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`;
        fs_1.default.mkdir(uploadDirPath, { recursive: true }, (err) => {
            var _a;
            err && err instanceof Error
                ? new ExpressError_1.default(err.message, 500, err.name)
                : (0, sharp_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer)
                    .resize(imgWidth, imgHeight)
                    .toFormat('png')
                    .png({
                    force: true,
                    quality: 100,
                })
                    .toFile(uploadDirPath + imgStorageName)
                    .catch((err) => new ExpressError_1.default(`sharp error | ${err.message}`, 500, err.name));
        });
        res.locals.avatarURL = `/avatar${imgStorageName}`;
        next();
    }
    else {
        next(new ExpressError_1.default('`req.file` is undefined', 400));
    }
});
exports.default = handleContactAvatarImg;
//# sourceMappingURL=handle-avatar-img.js.map