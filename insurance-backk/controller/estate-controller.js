import {EstateService} from "../service/estateService.js";
import {ApiError} from "../exceptions/api-error.js";

const estateService = new EstateService()
export class EstateController{
    async create(req,res){
        const estate = await estateService.create(req.body)
        return res.json(estate)
    }

    async getAllEstates(req, res){
        const estates = await estateService.getAll()
        return res.json(estates)
    }

    async getByFilter(req,res,next){
        try {
            const estate = await estateService.getByFilter({
                id: req.query.id,
                price: req.query.price,
                district: req.query.district,
                isRent: req.query.isRent
            })
            res.json(estate)
        }catch (e) {
            console.log(e)
        }
    }
}