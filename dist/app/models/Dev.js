"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose');
var _PointSchema = require('./utils/PointSchema'); var _PointSchema2 = _interopRequireDefault(_PointSchema);










const DevSchema = new (0, _mongoose.Schema)({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: _PointSchema2.default,
        index: '2dsphere'
    },
},{
    timestamps: true,
});

exports. default = _mongoose.model('Dev', DevSchema);