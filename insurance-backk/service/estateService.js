import EstateModel from '../models/estateModel.js'
import {ApiError} from "../exceptions/api-error.js";


export class EstateService{
    async create(req){
        return await EstateModel.create(req)
    }

    async getAll(){
        const estate = await EstateModel.find();
        return estate
    }

    async getByFilter(req){
        let filter = {};

        if (req.id) {
            filter._id = req.id;
        }

        if (req.price) {
            filter.price = req.price;
        }

        if (req.district) {
            filter.district = req.district;
        }

        if (req.isRent){
            filter.isRent = req.isRent
        }

        const estate = await EstateModel.find(filter);
        return estate;
    }
}