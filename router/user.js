const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Employee = require('../model/user');


router.get('/', (req, res) => {
    res.write("user data");
    res.end();
});

//route for registration for the user
router.post('/employee/create', async (req, res) => {

    const employee = new Employee(req.body);
    try {
        // check the user already registerd or not
        const checkUser = await Employee.findOne({ 'employeeId': employee.employeeId });
        if (!checkUser) {
            const employeeData = await employee.save();
            res.status(200).send({
                message: 'success',
                userData: employeeData

            })
        } else {
            res.status(400).send({
                message: 'Employee already registred with this employee Id'
            });
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

// route for get all users which are prasents in users
router.get('/employee/list', async (req, res) => {
    try {
        const employeeData = await Employee.find();
        res.status(200).send({
            'message': 'succuessfully fetched usersList',
            'users': employeeData
        });
    } catch (error) {
        res.status(500).send()
    }
});

// route can be used to delete perticular Employee 
router.delete('/employee/delete', async (req, res) => {
    console.log(req.query.id);
    try {
        const checkUser = await Employee.findOne({ '_id': mongoose.Types.ObjectId(req.query.id) });
        if(checkUser) {
        await Employee.remove({ _id: mongoose.Types.ObjectId(req.query.id) });
        res.status(200).send({
            status: 'sucess',
            message: 'deleted successfully'
        });
    } else {
        res.status(200).send({
            status: 'sucess',
            message: 'Employee not found to delete'
        });
    }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failure',
            message: 'error while deleting user'
        })
    }
});

// route for update Employee details
router.post('/employee/update', async (req, res) => {
    console.log(req.body);
    try {
        await Employee.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.id)},
            { $set: { name: req.body.name,
                      employeeId: req.body.employeeId,
                      dateOfBirth: req.body.dateOfBirth,
                      updatededAt: new Date() } }, 
            { upsert: true, new: true });
        res.status(200).send(
            {
                status: 'success',
                message: "successfully updated Employee Details"
            }
        )
    } catch (error) {
        res.status(400).send({
            status: failure,
            message: 'Error while updating Employee details'
        })
    }
});


module.exports = router