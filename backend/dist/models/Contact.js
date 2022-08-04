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
exports.Contact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const Schema = mongoose_1.default.Schema;
const contactsSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
    },
    handle: {
        type: String,
        required: true,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    phoneNumberInfo: {
        required: true,
        type: {},
    },
});
const ContactsModel = mongoose_1.default.model('Contact', contactsSchema);
class Contact {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const all = yield ContactsModel.find();
                return all;
            }
            catch (err) {
                err instanceof Error
                    ? new ExpressError_1.default(err.message, undefined, err.name)
                    : '';
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedRecord = yield ContactsModel.findByIdAndDelete(id);
                return deletedRecord;
            }
            catch (err) {
                err instanceof Error
                    ? new ExpressError_1.default(err.message, undefined, err.name)
                    : '';
            }
        });
    }
    create(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = yield ContactsModel.create(contact);
                return newContact;
            }
            catch (err) {
                err instanceof Error
                    ? new ExpressError_1.default(err.message, undefined, err.name)
                    : '';
            }
        });
    }
}
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map