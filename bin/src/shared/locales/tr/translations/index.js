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
var blood_type_1 = __importDefault(require("./blood-type"));
var dashboard_1 = __importDefault(require("./dashboard"));
var imagings_1 = __importDefault(require("./imagings"));
var incidents_1 = __importDefault(require("./incidents"));
var labs_1 = __importDefault(require("./labs"));
var medications_1 = __importDefault(require("./medications"));
var network_status_1 = __importDefault(require("./network-status"));
var patient_1 = __importDefault(require("./patient"));
var patients_1 = __importDefault(require("./patients"));
var scheduling_1 = __importDefault(require("./scheduling"));
var settings_1 = __importDefault(require("./settings"));
var sex_1 = __importDefault(require("./sex"));
var states_1 = __importDefault(require("./states"));
var user_1 = __importDefault(require("./user"));
exports.default = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, actions_1.default), dashboard_1.default), network_status_1.default), patient_1.default), patients_1.default), scheduling_1.default), states_1.default), sex_1.default), labs_1.default), medications_1.default), incidents_1.default), settings_1.default), user_1.default), blood_type_1.default), imagings_1.default);
