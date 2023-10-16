import { Router } from 'express'
import Customer from '../models/customer.js'
import fetchBalanceSheet from '../services/accounting-service.js'

const router = Router()

router.post('/', async (req, res) => {
    try {
        if (!req.cookies.userId) throw Error("Start Application First")

        let { userId } = req.cookies
        const { name, year, amount, provider } = req.body
        if (!name || !year || !amount || !provider)
            throw Error("Please Complete Applicaton")
        
        let sheet = fetchBalanceSheet()
        const user = await Customer.findOne({ userId })
        if (!user) {
            await Customer.create({ userId, sheet })
        }

        res.send({ msg: 'Balanced Sheet', data: sheet })

    } catch (e) {
        res.status(400).send({ msg: e.message })
    }

})

export default router