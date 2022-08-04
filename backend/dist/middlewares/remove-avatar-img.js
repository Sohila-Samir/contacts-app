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
const path_1 = __importDefault(require("path"));
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const removeContactAvatarImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactAvatarImgPath = path_1.default.join(__dirname, '..', 'uploads', res.locals.deletedContact.avatarURL);
    fs_1.default.unlink(contactAvatarImgPath, (err) => {
        if (err && err instanceof Error) {
            return next(new ExpressError_1.default(err.message, 400, err.name));
        }
        res.status(200).json(res.locals.deletedContact);
    });
});
exports.default = removeContactAvatarImg;
//# sourceMappingURL=remove-avatar-img.js.map