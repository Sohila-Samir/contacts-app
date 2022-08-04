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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.addContact = exports.getAllContacts = void 0;
const Contact_1 = require("../models/Contact");
const contact = new Contact_1.Contact();
const getAllContacts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield contact.index();
        res.status(200).json(all);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllContacts = getAllContacts;
const addContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newContact = yield contact.create(Object.assign(Object.assign({}, req.body), { avatarURL: res.locals.avatarURL }));
        console.log('created contact: ', newContact);
        console.log('contact body: ', req.body);
        res.status(201).json({ success: true, data: newContact });
    }
    catch (err) {
        next(err);
    }
});
exports.addContact = addContact;
const deleteContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedContact = yield contact.delete(id);
        res.locals.deletedContact = deletedContact;
        next();
    }
    catch (e) {
        next(e);
    }
});
exports.deleteContact = deleteContact;
//# sourceMappingURL=contacts-controller.js.map