"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Dev = require('../models/Dev'); var _Dev2 = _interopRequireDefault(_Dev);

class SearchService {
     async findDevsByTechs(techsArray, longitude, latitude, distance){
        const devs = await _Dev2.default.find({
            techs:{
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: distance,
                },
            },
        });
        return devs;
    }
}
exports. default = new SearchService