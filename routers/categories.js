var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var cModel = require('../models/categories.js');

// GET /api/categories --- Gets all the categories
router.get('/categories', function CatsGetHandler(request, response){
    cModel.getAll(function DoneGettingAll(err, result, fields){
        if (err) {
            console.log("Some error selecting all");
            console.log(err);
            response.write("Error Getting All");
        } else {
            console.log("Successfully retrieve all records");
            response.json(result);
        }
    });
});

// GET /api/categories/:id --- Gets the category with the given id
router.get('/categories/:id', function CatsGetByIdHandler(request, response){
    cModel.findById(request.params.id, function DoneGettingById(err, result, fields){
        if (err){
            console.log("Some error finding by id");
            console.log(err);
            response.write("Error finding by id");
        }else {
            response.json(result);
        }
    });
});

// POST /api/categories --- Inserts a category into the categories table
router.post('/categories',
    function CatsPostHandler(request, response){
        cModel.insert(
            request.body.name,
            function DoneInserting(err, resultId){
                if (err){
                    console.log("Some error inserting");
                    console.log(err);
                    response.write("Error Inserting");
                }else{
                    console.log("Successfully inserting the category!");
                    response.redirect("/insert-category.html");
                }
            } );
});

module.exports = router;
