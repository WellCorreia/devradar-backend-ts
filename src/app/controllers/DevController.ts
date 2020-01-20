import {Request, Response, NextFunction} from 'express';
import DevService from '../services/DevService';
import parseStringAsArray from '../utils/parseStringAsArray';
import Socket from '../../websocket';

class DevController {

    public async store (req: Request, res: Response, next: NextFunction): Promise<Response> {
        let { github_username, techs, latitude, longitude } = req.body;

        const dev:any = await DevService.findDevByUserName(github_username);

        if(dev) { 
            return res.status(400).json({message: "Usuário já cadastrado"});
        }

        const data_github = await DevService.findGitHubByUserName(github_username);
       
        if(!data_github){ return res.status(400).json({message: "Usuário não cadastrado no github"});}

        const { login: name, avatar_url, bio } = data_github;
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        techs = parseStringAsArray(techs);
        
        const data_dev = { 
            name,
            github_username, 
            bio,
            avatar_url,
            techs, 
            location 
        }
        
        const devCreated = await DevService.create(data_dev);
        const sendSocketMessageTo = await Socket.findConnections(
            {
                latitude, longitude
            },
            techs
        );
        Socket.sendMessage(sendSocketMessageTo, 'new-dev', devCreated);
        
        return res.json(devCreated);
    }

    public async index (req: Request, res: Response, next: NextFunction): Promise<Response> {
        const devs = await DevService.findAllDevs();
        return res.json(devs);
    }

    public async update (req: Request, res: Response, next: NextFunction): Promise<Response> {
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
            
        new_dev.techs = parseStringAsArray(new_dev.techs);
        const dev = await DevService.findDevByUserName(github_username);
        
        if(!dev){
            return res.status(400).json({message: "Dev não cadastrado"})
        }
        const updated = await DevService.update(dev._id, new_dev);
        return res.json(updated);
    }

    public async destroy (req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { github_username } = req.params;
        const dev = await DevService.findDevByUserName(github_username);
        if(!dev){
            return res.status(400).json({ message: "Dev não cadastrado" })
        }
        const deleted = await DevService.delete(dev._id);
        return res.json(deleted);
    }
}

export default new DevController