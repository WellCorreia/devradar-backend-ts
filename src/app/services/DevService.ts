import axios from 'axios';
import Dev from '../models/Dev';

class DevService {
    public constructor() {

    }

    public async create(body: any) {
        try {
            const dev = await Dev.create(body);
            if(!dev){
                return { dev, message: "Falha no cadastro do desenvolvedor" };
            }
            return { dev, message: "Desenvolvedor cadastrado" };
        } catch (error) {
            throw error;
        }
    }

    public async findDevByUserName(github_username: String) {
        try {
            const dev = await Dev.findOne({ github_username });
            return dev;
        } catch (error) {
            throw error;   
        }
    }

    public async findGitHubByUserName(github_username: String) {
        try {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            if (response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    public async findAllDevs() {
        try {
            const devs = await Dev.find();
            return devs;
        } catch (error) {
            throw error;
        }
    }

    public async update(_id: String, new_dev: any){
        const deleted = await Dev.updateOne({_id}, {
            $set: {
                ...new_dev
            },
        });
        if (deleted) {
            return { message: "Dev atualizado com sucesso" };
        }
        return { message: "Falha ao atualizar o Dev" };
    }

    public async delete(_id){
        const deleted = await Dev.deleteOne({_id});
        if (deleted) {
            return { message: "Dev deletado com sucesso" };
        }
        return { message: "Falha ao deletar o Dev" };
    }
}

export default new DevService
