import { Router } from 'express'
import Customer from '../models/customer.js'
import generateFinalData from '../utils/generate-final-data.js'
import submitApplication from '../services/decision-service.js'

const router = Router()

router.post('/', async (req, res) => {

    try {
        if (!req.headers.cookie) throw Error("Start Application First")

        let { userId } = req.cookies
        const { name, year, amount, provider } = req.body
        const userInfo = await Customer.findOne({ userId })

        if (!name || !year || !amount || !userInfo || !provider)
            throw Error("Please Complete Applicaton")


        let finalData = generateFinalData(name, year, userInfo.sheet, Math.abs(amount))
        let applicationStatus = submitApplication(finalData)
        
        res.clearCookie('userId')
        res.send({ msg: applicationStatus })

    } catch (e) {
        res.status(400).send({ msg: e.message })
    }

})

export default router