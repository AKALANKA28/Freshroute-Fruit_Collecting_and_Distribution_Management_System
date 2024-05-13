const asyncHandler = require('express-async-handler')
const Grade = require("../models/gradesModel")
const validateMongoDbId = require("../utils/validateMongodbId")



exports.createGrade = asyncHandler(async(req,res) => {
    try {
        const grade = await Grade.create(req.body)
        res.json(grade)
    } catch (error) {
        throw new Error(error)
    }
})

exports.updateGrade = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const updateGrade = await Grade.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updateGrade)
    } catch (error) {
        throw new Error(error)
    }
})

exports.deleteGrade = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const deletedGrade = await Grade.findByIdAndDelete(id)
        res.json(deletedGrade)
    } catch (error) {
        throw new Error(error)
    }
})

exports.getGrade = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const getGrade = await Grade.findById(id)
        res.json(getGrade)
    } catch (error) {
        throw new Error(error)
    }
})

exports.getAllGrade = asyncHandler(async(req,res) => {
    try {
        const getAllGrade = await Grade.find({ })
        res.json(getAllGrade)
    } catch (error) {
        throw new Error(error)
    }
})

