import UserSchema from "../models/user-model.js";
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import {TokenService} from "./token-service.js";
// import {MailService} from "./mail-service.js";
import {UserDto} from "../dtos/user-dto.js";
import {ApiError} from "../exceptions/api-error.js";
import CarModel from "../models/carModel.js";
import LifeModel from "../models/lifeModel.js";
import Property from "../models/property.js";
import OrderModel from "../models/orderModel.js";
import mongoose from "mongoose";


const tokenService = new TokenService()

export class UserService {
    async registration(IIN, email, password, name, number) {
        const candidate = await UserSchema.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким email-ом' + email + 'уже существует. Выберите другую почту')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = v4()
        const user = await UserSchema.create({IIN, email, password: hashPassword, name, number, activationLink})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserSchema.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Неправильная ссылка')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserSchema.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неправильный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserSchema.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async profile(accessToken) {
        if (!accessToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await tokenService.validateAccessToken(accessToken)
        console.log(userData)
        if (!userData) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserSchema.findById(userData.id)
        const userDto = new UserDto(user)
        return userDto
    }

    async getUser() {
        const users = await UserSchema.find()
        return users
    }

    async allInsurance(accessToken) {
        if (!accessToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await tokenService.validateAccessToken(accessToken)
        if (!userData) {
            throw ApiError.UnauthorizedError()
        }
        const carsInsurance = await CarModel.find({userId: userData.id})
        const lifeInsurance = await LifeModel.find({userId: userData.id})
        const propertyInsurance = await Property.find({userId: userData.id})
        console.log([...carsInsurance, ...lifeInsurance, ...propertyInsurance])
        return [...carsInsurance, ...lifeInsurance, ...propertyInsurance]
    }

    async updateUserRole(user_id){
        const user = await UserSchema.findById(user_id)
        if (!user){
            throw ApiError.NotFoundError('User')
        }
        user.role = 'admin'
        await user.save()
        return user
    }

    async getAllAdmins(){
        const users = await UserSchema.find({role: 'admin'})
        return users
    }

    async createOrder(accessToken, estate_id){
        if (!accessToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await tokenService.validateAccessToken(accessToken)
        if (!userData) {
            throw ApiError.UnauthorizedError()
        }
        const user_id = userData.id
        const order = await OrderModel.create({userId: user_id, estateId: estate_id.estate_id})
        return order
    }

    async getOrder(){
        const order = await OrderModel.find().populate('userId').populate('estateId')
        return order
    }

    async getOrderById(accessToken){
        if (!accessToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await tokenService.validateAccessToken(accessToken)
        if (!userData) {
            throw ApiError.UnauthorizedError()
        }
        const order = await OrderModel.find({userId: userData.id}).populate('estateId')

        return order
    }
}