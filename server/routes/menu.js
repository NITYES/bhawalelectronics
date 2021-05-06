const express = require('express');
const category = require('../models/category');
const route = express.Router();

const getSubCategory = (obj) => {

    return obj.map((s) => {

        return {
            name: s.name,
            _id: s._id,
            slug: s.slug,
            item: getItems(s.item)

        }

    })


}


const getItems = (obj) => {

    return obj.map((i) => {

        return {
            name: i.name,
            _id: i._id,
            slug: i.slug

        }

    })


}

route.get('/menu', async (req, res) => {


    category
        .find({})
        .select("name slug _id")
        .populate({
            path: "subCategory",
            populate: { path: "item" }
        })
        .exec((err, categorys) => {
            if (err) return console.log(err)
            const menu = categorys.map((c) => {


                return {
                    name: c.name,
                    _id: c._id,
                    slug:c.slug,
                    subCategory: getSubCategory(c.subCategory)
                }
            })
            res.json(menu);
        });

})
module.exports = route