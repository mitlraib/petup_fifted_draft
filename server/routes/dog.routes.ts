import express from 'express'
import DogModel from '../models/dog.model'
import { encryptJWT } from '../utils'
import { authMiddleware } from '../middleware/auth.middleware'
import UserModel from '../models/user.model'

 //  Defining the router for the API routes:
const router = express.Router()



//defines a POST route for the /dog endpoint. 
//The callback function inside this block is executed asynchronously.
router.post('/dog',authMiddleware, async (req, res) => {
    try {
        console.log("Reached")
        const uid = (req as any).user._id
        const newDog = await DogModel.create({
            ...req.body,
            size: "small",
            owner: uid
        })
        console.log(newDog)
        const user = await UserModel.findByIdAndUpdate(uid, { $push: { "dogs": newDog._id } })
        .populate("dogs")
        res.status(201).json({
            data: { newDog, newUser: user},
            error: null,
            status: 201
        })
        
    } catch (e: any) {
        console.log(e)
        res.status(400).json({
            data: null,
            error: e.message,
            status: 400
        })
    }
})


router.get("/dogs", async (req, res) => {
    
    try {
        const dogs = await DogModel.find()
        res.status(200).json({
            data: dogs,
            status: 200,
            error: null
        })
    }
    catch (e: any) {
        res.status(500).json({
            error: e.message,
            status: 500,
            data: null
        })
    }
})

export default router