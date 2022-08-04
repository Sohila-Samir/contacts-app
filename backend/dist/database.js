"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.CONNECTION_STRING;
const connect = () => {
    mongoose_1.default
        .connect(connectionString)
        .then(() => console.log('database connected'))
        .catch((e) => console.log('db error caught: ', e));
};
exports.default = connect;
//# sourceMappingURL=database.js.map