const categoryModel = require('../models/categoriesModel')
const response = require('../helpers/response')

async function getCategories(req, res){
    try {
        const data = await categoryModel.getAllCategories()
        response(200, data, `get all categories`, res)
    } catch (error){
        console.error(error)
        response(500, null, `failed to get categories`, res)
    }
}

async function getCategory(req, res){
    try{
        const {id} = req.params
        const data = await categoryModel.getCategoryById(id)
        if (!data){
            return response(404, null, `category not found`, res)
        }
        response(200, data, `get category with id: ${id}`,res)
    } catch (error){
        console.error(error)
        response(500, null, `failed to get category`, res)
    }
}

async function createCategory(req, res){
    try{
        const {name} = req.body
        data = await categoryModel.createCategory(name)
        response(201, data, `Category created successfully`, res)
    } catch (error){
        console.error(error)
        response(500, null, `failed to create category`, res)
    }
}

async function updateCategory(req, res){
    try{
        const {id} = req.params
        const {name} = req.body
        data = await categoryModel.updateCategory(id, name)
        response(200, data, `category updated successfully`, res)
    } catch (error){
        console.error(error)
        response(500, null, `failed to update category`, res)
    }
}

async function deleteCategory(req, res){
    try{
        const {id} = req.params
        await categoryModel.deleteCategory(id)
        response(200, null, `category deleted successfully`, res)
    } catch(error){
        response(500, null, `failed to delete category`, res)
    }
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}