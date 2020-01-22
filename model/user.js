const mongoose  = require('mongoose')
const validator = require('validator')

const EmployeeSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    employeeId:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatededAt:{
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('employee', EmployeeSchema);

module.exports = User;