"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __importDefault(require("./actions"));
var dashboard_1 = __importDefault(require("./dashboard"));
var labs_1 = __importDefault(require("./labs"));
var medications_1 = __importDefault(require("./medications"));
var patient_1 = __importDefault(require("./patient"));
var patients_1 = __importDefault(require("./patients"));
var settings_1 = __importDefault(require("./settings"));
exports.default = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, actions_1.default), dashboard_1.default), labs_1.default), patient_1.default), patients_1.default), settings_1.default), medications_1.default);
