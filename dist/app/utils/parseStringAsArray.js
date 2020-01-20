"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function parseStringAsArray(text) {
    return text.split(',').map(tech => tech.trim());
} exports.default = parseStringAsArray;;