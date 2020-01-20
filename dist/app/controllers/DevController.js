"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _DevService = require('../services/DevService'); var _DevService2 = _interopRequireDefault(_DevService);
var _parseStringAsArray = require('../utils/parseStringAsArray'); var _parseStringAsArray2 = _interopRequireDefault(_parseStringAsArray);

class DevController {
     constructor() {

    }

     async store (req, res, next) {
        let { github_username, techs, latitude, longitude } = req.body;

        const dev = await _DevService2.default.findDevByUserName(github_username);

        if(dev) { 
            return res.status(400).json({message: "Usuário já cadastrado"});
        }

        const data_github = await _DevService2.default.findGitHubByUserName(github_username);
       
        if(!data_github){ return res.status(400).json({message: "Usuário não cadastrado no github"});}

        const { login: name, avatar_url, bio } = data_github;
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        techs = _parseStringAsArray2.default.call(void 0, techs);
        
        const data_dev = { 
            name,
            github_username, 
            bio,
            avatar_url,
            techs, 
            location 
        }
        
        const devCreated = await _DevService2.default.create(data_dev);
        
        return res.json(devCreated);
    }

     async index (req, res, next) {
        const devs = await _DevService2.default.findAllDevs();
        return res.json(devs);
    }

     async update (req, res, next) {
        const { github_username } = req.params;
        const { name, bio, avatar_url, techs, latitude, longitude } = req.body;
        
        const new_dev = {
            name,
            bio,
            avatar_url,
            techs, 
            latitude, 
            longitude
        }
            
        new_dev.techs = _parseStringAsArray2.default.call(void 0, new_dev.techs);
        const dev = await _DevService2.default.findDevByUserName(github_username);
        
        if(!dev){
            return res.status(400).json({message: "Dev não cadastrado"})
        }
        const updated = await _DevService2.default.update(dev._id, new_dev);
        return res.json(updated);
    }

     async destroy (req, res, next) {
        const { github_username } = req.params;
        const dev = await _DevService2.default.findDevByUserName(github_username);
        if(!dev){
            return res.status(400).json({ message: "Dev não cadastrado" })
        }
        const deleted = await _DevService2.default.delete(dev._id);
        return res.json(deleted);
    }
}

exports. default = new DevController