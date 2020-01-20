"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _DevController = require('./app/controllers/DevController'); var _DevController2 = _interopRequireDefault(_DevController);
var _SearchController = require('./app/controllers/SearchController'); var _SearchController2 = _interopRequireDefault(_SearchController);

const routes = _express.Router.call(void 0, );

routes.post('/devs', _DevController2.default.store);
routes.get('/devs', _DevController2.default.index);
routes.put('/devs/:github_username', _DevController2.default.update);
routes.delete('/devs/:github_username', _DevController2.default.destroy);
routes.get('/search', _SearchController2.default.index)

exports. default = routes