import express from 'express'
import { verifyToken } from '../verify-token.js'
import { test, me, updateById, updateLikeId, updateSubId, userAll } from '../controllers/users.js'

const router = express.Router()

router.get("", userAll)
router.get("/me", verifyToken, me)
router.put("/sub/:id", verifyToken, updateSubId)
router.put("/like/:id", verifyToken, updateLikeId)
router.put("/:id", verifyToken, updateById)

export default router