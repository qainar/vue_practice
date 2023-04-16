import {UserService} from "../service/user-service.js";
import {ApiError} from "../exceptions/api-error.js";
import {validationResult} from "express-validator";

const userService = new UserService()

export class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {IIN, email, password, name, number} = req.body
            const userData = await userService.registration(IIN, email, password, name, number)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }


    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const {activationLink} = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            console.log(req.cookies.refreshToken)
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async profile(req, res, next) {
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userData = await userService.profile(accessToken)
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUser()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }


    async allInsurance(req, res, next) {
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const allInsurance = await userService.allInsurance(accessToken)
            return res.json(allInsurance)
        } catch (e) {
            next(e)
        }
    }

    async updateUserRole(req,res, next){
        try {
            const {id} = req.params
            const user = await userService.updateUserRole(id)

            return res.json(user)
        }catch (e) {
            next(e)
        }
    }

    async getAllAdmins(req,res,next){
        try {
            const users = await userService.getAllAdmins()
            return res.json(users)
        }catch (e) {
            next(e)
        }
    }

    async getOrder(req,res,next){
        try {
            const order = await userService.getOrder()
            return res.json(order)
        }catch (e) {
            next(e)
        }
    }

    async createOrder(req,res,next){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const estate_id = req.query
            console.log(estate_id)
            const order = await userService.createOrder(accessToken, estate_id)
            return res.json(order)
        }catch (e) {
            next(e)
        }
    }

    async getOrderById(req,res,next){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const order = await userService.getOrderById(accessToken)
            return res.json(order)
        }catch (e) {
            next(e)
        }
    }
}
