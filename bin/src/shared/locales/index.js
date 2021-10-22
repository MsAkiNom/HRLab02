"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var translations_1 = __importDefault(require("./ar/translations"));
var translations_2 = __importDefault(require("./de/translations"));
var translations_3 = __importDefault(require("./enUs/translations"));
var translations_4 = __importDefault(require("./es/translations"));
var translations_5 = __importDefault(require("./fr/translations"));
var translations_6 = __importDefault(require("./id/translations"));
var translations_7 = __importDefault(require("./it/translations"));
var translations_8 = __importDefault(require("./ja/translations"));
var translations_9 = __importDefault(require("./ptBr/translations"));
var translations_10 = __importDefault(require("./ru/translations"));
var translations_11 = __importDefault(require("./tr/translations"));
var translations_12 = __importDefault(require("./zhCN/translations"));
var resources = {
    it: {
        name: 'Italian',
        translation: translations_7.default,
    },
    ar: {
        name: 'Arabic',
        translation: translations_1.default,
    },
    de: {
        name: 'German',
        translation: translations_2.default,
    },
    en: {
        name: 'English, American',
        translation: translations_3.default,
    },
    es: {
        name: 'Spanish',
        translation: translations_4.default,
    },
    fr: {
        name: 'French',
        translation: translations_5.default,
    },
    id: {
        name: 'Indonesian',
        translation: translations_6.default,
    },
    ja: {
        name: 'Japanese',
        translation: translations_8.default,
    },
    ptBR: {
        name: 'Portuguese',
        translation: translations_9.default,
    },
    ru: {
        name: 'Russian',
        translation: translations_10.default,
    },
    tr: {
        name: 'Turkish',
        translation: translations_11.default,
    },
    zhCN: {
        name: 'Chinese',
        translation: translations_12.default,
    },
};
exports.default = resources;
