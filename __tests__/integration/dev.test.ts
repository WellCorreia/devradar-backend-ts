import * as mongoose from 'mongoose';
import * as request from 'supertest';
import Dev from '../../src/app/models/Dev';
import app from '../../src/app';
import * as faker from  'faker';

describe('DevController.ts', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://well:Urx9FnZMCCJj2qbz@cluster0-oyhzy.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }, 
        (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('Store', async() => {
        const dev = {
            github_username: "WellCorreia",
            techs: "NodeJs, PHP, Postgres",
            latitude: 12.9035613,
            longitude: 38.4744683
        }
        const response = await request(app)
            .post('/devs')
            .send(dev);
        
        expect(response.status).toBe(200);
    });

    it('Fail Store - Incomplete data', async() => {
        const dev = {
            github_username: "WellCorreia",
            techs: "NodeJs, PHP, Postgres",
        }
        const response = await request(app)
            .post('/devs')
            .send(dev);
        
        expect(response.status).toBe(400);
    });

    it('Fail Store - Dev não encontrado no github', async() => {
        const dev = {
            github_username: faker.internet.url(),
            techs: "NodeJs, PHP, Postgres",
            latitude: 12.9035613,
            longitude: 38.4744683
        }
        const response = await request(app)
            .post('/devs')
            .send(dev);
        
        expect(response.status).toBe(400);
    });

    it('Update - Success', async() => {
        const dev = {
            github_username: "WellCorreia",
            name: "Wellington Correia",
            techs: "NodeJs, PHP, Postgres, Ajax",
            bio: "Só aprendendo mesmo",
            avatar_url: "teste",
            latitude: 12.9035613,
            longitude: 38.4744683
        }
        const response = await request(app)
            .put('/devs/'+dev.github_username)
            .send(dev);
        
        expect(response.status).toBe(200);
    });

    it('Update - Fail', async() => {
        const dev = {
            github_username: faker.internet.userName(),
            name: "Wellington Correia",
            techs: "NodeJs, PHP, Postgres, Ajax",
            bio: "Só aprendendo mesmo",
            avatar_url: "teste",
            latitude: 12.9035613,
            longitude: 38.4744683
        }
        const response = await request(app)
            .put('/devs/'+dev.github_username)
            .send(dev);
        
        expect(response.status).toBe(400);
    });

    it('Destroy - Success', async() => {
        const response = await request(app)
            .delete('/devs/WellCorreia')
            .send();
        
        expect(response.status).toBe(200);
    });

    it('Destroy - Fail', async() => {
        const response = await request(app)
            .delete('/devs/'+ faker.internet.userName())
            .send();
        
        expect(response.status).toBe(400);
    });

    it('Index - Success', async() => {
        const response = await request(app)
            .get('/devs')
            .send();
        
        expect(response.status).toBe(200);
    });
});