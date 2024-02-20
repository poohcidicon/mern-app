import { createError } from "../error.js"
import Video from "../models/Video.js"
import User from "../models/User.js"

export const getVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }
    catch (err) {
        next(err)
    }
}

export const getAll = async (req, res, next) => {
    try{
        const videos = await Video.find({})
        res.status(200).json(videos)
    }
    catch (err) {
        next(err)
    }
}

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ ...req.body, userId: req.user.id })
    try{
        const saveVideo = await newVideo.save()
        res.status(200).json(saveVideo)
    }
    catch (err) {
        next(err)
    }
}

export const updateVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Not found!'))
        if (video.userId === req.user.id){
            const updateUserVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            res.status(200).json(updateUserVideo)
        }
        else{
            return next(createError(403, 'not allow'))
        }
    }
    catch (err) {
        next(err)
    }
}

export const deleteVideo = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, 'Not found!'))
        if (video.userId === req.user.id){
            const updateUserVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            res.status(200).json(updateUserVideo)
        }
        else{
            return next(createError(403, 'not allow'))
        }
    }
    catch (err) {
        next(err)
    }
}

export const addView = async (req, res, next) => {
    try{
        const updateUserVideo = await Video.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {views: 1}
            },
            { new: true }
        )
        res.status(200).json(updateUserVideo)
    }
    catch (err) {
        next(err)
    }
}

export const sub = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers

        const list = await Promise.all(subscribedChannels.map((channelId) => {
            return Video.find({ userId: channelId })
        }))

        res.status(200).json(list)
    }
    catch (err) {
        next(err)
    }
}