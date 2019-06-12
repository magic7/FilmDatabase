var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var fModel = require('../models/films.js');

// GET /api/films --- Gets all the films
router.get('/films', function FilmsGetHandler(request, response){
    fModel.getAll(function DoneGettingAll(err, result, fields){
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

// GET /api/films/:id --- Gets the film with the given id
router.get('/films/:id', function FilmsGetByIdHandler(request, response){
    fModel.findById(request.params.id, function DoneGettingById(err, result, fields){
        if (err){
            console.log("Some error finding by id");
            console.log(err);
            response.write("Error finding by id");
        }else {
            response.json(result);
        }
    });
});

// POST /api/films --- Inserts a film into the films table
router.post('/films',
    function FilmsPostHandler(request, response){
        fModel.insert(
            request.body.title,
            request.body.description,
            request.body.releaseYear,
            request.body.length,
            request.body.rating,
            request.body.categoryID,
            function DoneInserting(err, resultId){
                if (err){
                    console.log("Some error inserting");
                    console.log(err);
                    response.write("Error Inserting");
                }else{
                    console.log("Successfully inserting the film!");
                    response.redirect("/insert-film.html");
                }
            } );
});

// PUT /api/films --- Modifies a film record
router.put('/films', function FilmsUpdateHandler(request, response){
	fModel.updateByID(
      request.body.id,
      request.body.title,
      request.body.description,
      request.body.releaseYear,
      request.body.length,
      request.body.rating,
      request.body.categoryID,
			function DoneUpdating(err, resultId){
					if (err){
							console.log("Some error updating");
							console.log(err);
							response.write("Error updating");
					} else {
							console.log("Successfully updated film!");
              // response.redirect("/update-film.html");
					}
			});
});

// DELETE /api/films --- Deletes a film record
router.delete('/films', function FilmsDeleteHandler(request, response){
    fModel.deleteById(request.body.id, function DoneDeleteById(err, result){
        if (err){
            console.log("Some error delete by id");
            console.log(err);
            response.write("Error deleting by id");
        } else {
            console.log("Successfully deleted film!")
            // response.redirect("/delete-film.html");
        }
    });
});

// GET /api/films-categories --- Gets all the films with their respective category
router.get('/films-categories', function FilmsCatsGetHandler(request, response){
    fModel.findFilmsCats(function DoneGettingById(err, result, fields){
        if (err){
            console.log("Some error finding by films with category");
            console.log(err);
            response.write("Error finding films with category");
        } else {
            response.json(result);
        }
    });
});

module.exports = router;
