import { conection } from "./conection.js"
import bcrypt from 'bcrypt'

async function login(email, password) {
    return await conection(async function (db) {
        const user = await db.collection('Users').findOne({ email: email })

        if(user){
            const validate = await bcrypt.compare(password, user.password)

            if(validate){
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
            else{
                throw {error: 1000, msg: "El password no coincide."}    
            }
        }
        else{
            throw {error: 1000, msg: "El E-Mail no existe."}
        }

    })
}

async function register(user) {
    return await conection(async function (db) {

        const userOld = await db.collection('Users').findOne({ email: user.email })
        if (!userOld) {

            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(user.password, salt)

            await db.collection('Users').insertOne({
                name: user.name,
                email: user.email,
                password: password
            })
        }
        else{
            throw { error: 400, msg: "El usuario ya existe." } // dispara una excepcion
        }


    })
}

async function findAll(){
    return await conection(async function (db) {
        return await db.collection('Users').find().toArray()
    })
}


export default {
    login,
    register,
    findAll
}