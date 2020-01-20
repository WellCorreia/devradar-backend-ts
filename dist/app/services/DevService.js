"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var _Dev = require('../models/Dev'); var _Dev2 = _interopRequireDefault(_Dev);

class DevService {
     constructor() {

    }

     async create(body) {
        try {
            const dev = await _Dev2.default.create(body);
            if(!dev){
                return { dev, message: "Falha no cadastro do desenvolvedor" };
            }
            return { dev, message: "Desenvolvedor cadastrado" };
        } catch (error) {
            throw error;
        }
    }

     async findDevByUserName(github_username) {
        try {
            const dev = await _Dev2.default.findOne({ github_username });
            return dev;
        } catch (error) {
            throw error;   
        }
    }

     async findGitHubByUserName(github_username) {
        try {
            const response = await _axios2.default.get(`https://api.github.com/users/${github_username}`);
            if (response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

     async findAllDevs() {
        try {
            const devs = await _Dev2.default.find();
            return devs;
        } catch (error) {
            throw error;
        }
    }

     async update(_id, new_dev){
        const deleted = await _Dev2.default.updateOne({_id}, {
            $set: {
                ...new_dev
            },
        });
        if (deleted) {
            return { message: "Dev atualizado com sucesso" };
        }
        return { message: "Falha ao atualizar o Dev" };
    }

     async delete(_id){
        const deleted = await _Dev2.default.deleteOne({_id});
        if (deleted) {
            return { message: "Dev deletado com sucesso" };
        }
        return { message: "Falha ao deletar o Dev" };
    }
}

exports. default = new DevService
