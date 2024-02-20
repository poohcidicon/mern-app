import express from 'express'
import { verifyToken } from '../verify-token.js'
import { addVideo, addView, deleteVideo, getVideo, sub, updateVideo } from '../controllers/video.js'

const router = express.Router()

router.get("", getVideo)
router.post("", verifyToken, addVideo)
// router.get("/me", verifyToken, me)
// router.put("/sub/:id", verifyToken, updateSubId)
// router.put("/like/:id", verifyToken, updateLikeId)
// router.put("/:id", verifyToken, updateById)


export default router