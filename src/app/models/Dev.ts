import {model, Schema, Document} from 'mongoose'
import PointSchema from './utils/PointSchema'

interface DevInterface extends Document {
    name?: String,
    github_username?: String,
    bio?: String,
    avatar_url?: String,
    techs?: [String],
    location?: any,
}

const DevSchema = new Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
},{
    timestamps: true,
});

export default model<DevInterface>('Dev', DevSchema);