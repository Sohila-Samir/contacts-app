"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const database_1 = __importDefault(require("./config/database"));
const contacts_routes_1 = __importDefault(require("./routes/contacts-routes"));
(0, database_1.default)();
const port = process.env.PORT || 2022;
const app = (0, express_1.default)();
app.listen(port, () => {
    console.log(`running on port: ${port}`);
});
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage: storage });
app.use(express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/contacts', exports.upload.single('avatarURL'), contacts_routes_1.default);
app.get('*', (req, res) => {
    res.status(404).json({ success: false, err: '404, Page not found.' });
});
app.use((err, req, res, next) => {
    console.log(`ERROR WAS CAUGHT: ${err.message} | ${err.name}`);
    res.json({
        success: false,
        message: `ERROR WAS CAUGHT: ${err.message} | ${err.name}`,
    });
});
//# sourceMappingURL=server.js.map