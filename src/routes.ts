import { Router } from 'express'
import DevController from './app/controllers/DevController'
import SearchController from './app/controllers/SearchController'

const routes: Router = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.put('/devs/:github_username', DevController.update);
routes.delete('/devs/:github_username', DevController.destroy);
routes.get('/search', SearchController.index)

export default routes;