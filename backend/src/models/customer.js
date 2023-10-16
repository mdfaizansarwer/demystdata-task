import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique:true
    },
    sheet: {
        type: Object,
        required: true

    }
});

const Customer = mongoose.model('customer', CustomerSchema)

export default Customer