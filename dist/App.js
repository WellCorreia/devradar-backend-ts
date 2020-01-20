"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var express = _interopRequireWildcard(_express);
var _mongoose = require('mongoose'); var mongoose = _interopRequireWildcard(_mongoose);
var _cors = require('cors'); var cors = _interopRequireWildcard(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);


class App {
    

     constructor(){
       this.express = express(); 
       this.middlewares();
       this.database();
       this.routes();
    }

     middlewares() {
        this.express.use(express.json())
        this.express.use(cors());
    }

     database() {
        mongoose.connect('mongodb+srv://well:Urx9FnZMCCJj2qbz@cluster0-oyhzy.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }

     routes () {
        this.express.use(_routes2.default);
    }
}

exports. default = new App().express

