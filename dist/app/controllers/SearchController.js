"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SearchService = require('../services/SearchService'); var _SearchService2 = _interopRequireDefault(_SearchService);
var _parseStringAsArray = require('../utils/parseStringAsArray'); var _parseStringAsArray2 = _interopRequireDefault(_parseStringAsArray);

class SearchController {
    async index(req, res, next) {
        const { techs, latitude, longitude, distance } = req.query;
        let techsArray = _parseStringAsArray2.default.call(void 0, techs);
        const devs = await _SearchService2.default.findDevsByTechs(techsArray, longitude, latitude, distance);
        return res.json(devs);
    }
}

exports. default = new SearchController