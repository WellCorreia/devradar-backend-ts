import Dev from '../models/Dev';

class SearchService {
    public async findDevsByTechs(techsArray: [String], longitude: any, latitude: any, distance: number){
        const devs: any = await Dev.find({
            techs:{
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: distance,
                },
            },
        });
        return devs;
    }
}
export default new SearchService