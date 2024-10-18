import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// hash password
export function hashPassword(password: string): string {

    const hashed = bcrypt.hashSync(password, 10)
    return hashed
}

// check password
export function checkPw(hashed: string, password: string): boolean {
    return bcrypt.compareSync(password, hashed)
}

// encrypt data into jwt
export function encryptJWT(data: any): string {
    const secret = "bla bla"
    return jwt.sign(data, secret)
}

// decrypt data from jwt
export function decryptJWT<T>(token: string) {
    return jwt.decode(token) as T
}