import {Router} from "express";
import {UserController} from '../controller/user-controller.js'
import {body} from "express-validator";
import AuthMiddleware from "../middlewares/auth-middleware.js";
import CheckroleMiddleware from "../middlewares/checkrole-middleware.js"
import {PropertyController} from "../controller/property-controller.js";
import {CarController} from "../controller/car-controller.js";
import {LifeController} from "../controller/life-controller.js";
import {EstateController} from "../controller/estate-controller.js";
import checkroleMiddleware from "../middlewares/checkrole-middleware.js";

const router = new Router()

const userController = new UserController()
const propertyController = new PropertyController()
const carController = new CarController()
const lifeController = new LifeController()
const estateController = new EstateController()
//auth
router.post('/registration',
    body('IIN').isLength({min:12, max:12}),
    body('email').isEmail(),
    body('password').isLength({min:4, max: 20}),
    body('name').isLength({min:1, max: 100}),
    body('number').isLength({min:11, max:11})
    ,userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/profile', userController.profile)
router.get('/users', checkroleMiddleware('admin') ,userController.getUsers)
router.put('/user/:id/role', checkroleMiddleware('admin'), userController.updateUserRole)
router.get('/admins', checkroleMiddleware('admin'), userController.getAllAdmins)


//all insurance
router.get('/insurances', userController.allInsurance)

//property
router.post('/property', AuthMiddleware, propertyController.create)
router.get('/property/:id', AuthMiddleware, propertyController.getOne)
router.get('/', AuthMiddleware, propertyController.getAll)

//car
router.post('/car', AuthMiddleware, carController.create)
router.get('/car/:id', AuthMiddleware, carController.getOne)
router.get('/car', AuthMiddleware, carController.getAll)

//life
router.post('/life', AuthMiddleware, lifeController.create)
router.get('/life/:id', AuthMiddleware, lifeController.getOne)
router.get('/', AuthMiddleware, lifeController.getAll)

//estate
router.post('/estate', estateController.create)
// router.get('/estate', estateController.getAllEstates)
router.get('/estate', estateController.getByFilter)


//orders
router.post('/order', userController.createOrder)
router.get('/get_all_order', userController.getOrder)
router.get('/order', userController.getOrderById)



export default router