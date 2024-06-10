// CRUD todo
const { todoService } = require("../models")

// Get All todo
const findAll = async (req, res, next) => {

    try {
        const todo = await todoService.findAll();

        res.status(200).json(todo)
    } catch (err) {
        next(err)
    }
}

const findOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await todoService.findOne({
            where: {
                id
            }
        });

        if (!todo) {
            throw { name: "ErrorNotFound" }
        }
        res.status(200).json(todo)
    } catch (err) {
        next(err)
    }
}

// Create todo
const create = async (req, res, next) => {
    try {

        const todo = await todoService.create(req.body);

        res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
}

// // Update todo
const update = async (req, res, next) => {
    try {

        const params = {
            id: req.params.id,
            body: req.body
        }
        const todo = await todoService.update(params);

        res.status(200).json(todo)
    } catch (err) {
        next(err);
    }
}

// Delete todo
const softDelete = async (req, res, next) => {
    try {

        await todoService.softDelete(req.params);

        res.status(200).json({ message: "todo deleted..." })
    } catch (err) {
        next(err);
    }
}


module.exports = {
    findAll,
    findOne,
    create,
    update,
    softDelete
}