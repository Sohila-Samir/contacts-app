"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressError extends Error {
    constructor(_message, _status = 500, _name = 'Error') {
        super();
        this.name = _name;
        this.message = _message;
        this.status = _status;
    }
}
exports.default = ExpressError;
//# sourceMappingURL=ExpressError.js.map