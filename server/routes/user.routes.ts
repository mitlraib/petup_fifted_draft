
import express from 'express'
import UserModel from '../models/user.model'
import { encryptJWT } from '../utils'
import { authMiddleware } from '../middleware/auth.middleware'

//  Defining the router for the API routes:
const router = express.Router()


//defines a POST route for the /login endpoint. 
//The callback function inside this block is executed asynchronously.
router.post("/login", async (req, res) => {
    console.log(req.body.email)
    try {
        const existingUser = await UserModel.findOne({ email: { $regex: new RegExp(req.body.email, "i") } })
        
        console.log(existingUser)
        if (!existingUser) {
            throw new Error("User not found")
        }

        if (!existingUser.comparePassword(req.body.password)) {
            throw new Error("Email or password incorrect")
        }



// prepares the user's information for encoding into a token 
        //so that when they return to the system later, the system can verify their identity using this JWT.
        const toEncode = { _id: existingUser._id }
    
        const encoded = encryptJWT(toEncode)



    //sends a response indicating that the login was successful, provides the JWT for future authentication.
        res.status(200).json({
            status: 200,
            data: { access_token: encoded ,id:existingUser._id,firstName:existingUser.firstName,lastName:existingUser.lastName},
            error: null
        })
    }
    catch (e: any) {
        console.log(e.message)
        res.status(400).json({
            status: 400,
            data: null,
            error: e.message
        })
    }
})

router.post("/register", async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body)
         res.status(201).json({
            data: newUser,
            error: null,
            status: 201
        })
    } 
    catch (e: any) {
         res.status(201).json({
            data: null,
            error: e.message,
            status: 400
        })
    }
})

router.get("/me", authMiddleware, async (req, res) => {
    
    try {
        
        const userId = (req as any).user._id
        const user = await UserModel.findById(userId).populate("dogs")
        res.status(200).json({
            data: user,
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