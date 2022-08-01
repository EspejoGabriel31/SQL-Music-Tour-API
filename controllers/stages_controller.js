// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')


// FIND ALL STAGES
stages.get('/', async (req, res) => {
    try{
        const foundStages = await Stage.findAll({
            order: [['stage_name', 'ASC']],
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    } catch(err){
        res.status(500).json(err)
    }
})

// FIND A SPECIFIC STAGE
stages.get('/:id', async (req, res) => {
    try{
        const foundStage = await Stage.findOne({
            where: {stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch(err){
        res.status(500).json(err)
    }
})

// CREATE A STAGE
stages.post('/', async (req, res) => {
    try{
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            messagE: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch(err){
        res.status(500).json(err)
    }
})

// UPDATE A STAGE
stages.put('/:id', async (req, res) => {
    try{
        const updateStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updateStages} stage(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

// DELETE A STAGE
stages.delete('/:id', async (req, res) => {
    try{
        const deleteStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteStages} stage(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = stages