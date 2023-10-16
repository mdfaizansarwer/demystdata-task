import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

router.get('/', (req, res) => {
    if (!req.cookies.userId){
        res.cookie('userId', uuidv4())
    }
    res.send({ msg: 'Application Started' })
})

export default router