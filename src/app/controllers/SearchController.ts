import { NextFunction, Response, Request } from "express";

import SearchService from '../services/SearchService';
import parseStringAsArray from '../utils/parseStringAsArray';

class SearchController {
    async index(req: Request, res: Response, next: NextFunction) {
        const { techs, latitude, longitude, distance } = req.query;
        let techsArray: [string] = parseStringAsArray(techs);
        const devs = await SearchService.findDevsByTechs(techsArray, longitude, latitude, distance);
        return res.json(devs);
    }
}

export default new SearchController