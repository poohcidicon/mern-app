import { createError } from "../error.js"
import User from "../models/User.js"

export const test = (req, res) => {
    console.log('test')
    res.send('Hello World!')
}

export const me = async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json(user)
}

export const userAll = async (req, res, next) => {
    const users = await User.find()
    res.status(200).json(users)
}

export const updateById = async (req, res) => {
    if (req.params.id === req.user.id){
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            await updateUser.save()
            res.status(200).json(updateUser)
        }
        catch (err) {
            next(err)
        }
    }
    else{
        return next(createError(403, 'not allow'))
    }
}

export const updateSubId = async (req, res, next) => {
    try{
        console.log(req.user)
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.user.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json('success')
    }
    catch (err) {
        next(err)
    }
}

export const updateLikeId = async (req, res) => {
    
}