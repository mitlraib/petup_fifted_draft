
import {RequestHandler} from 'express'
import { decryptJWT } from '../utils'

export const authMiddleware: RequestHandler = (req, res, next) => {
    
    try {
        const tokenHeader = req.headers['authorization'] || req.headers['Authorization']

        if (!tokenHeader) {
            throw new Error("Unauthorized, token required")
        }

        const token = tokenHeader.slice("Bearer ".length) as string
        const decoded = decryptJWT<{ _id: string }>(token);
        (req as any).user = decoded
        return next()
    }
    catch (e: any) {
        res.status(401).json({
            data: null,
            error: e.message,
            status: 401
        })
    }
}