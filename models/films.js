var db = require('../db');

// Get all film records from "films" table
// Called by GET /api/films route
exports.getAll = function GetAllHandler(done){
    db.get().query(
        'SELECT * FROM films', function SelectAllQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

// Get film give film_id from "films" table
// Called by GET /api/films/:id route
exports.findById = function FindByIdHandler(id, done){
    db.get().query(
        'SELECT * FROM films WHERE film_id = ?', id,
        function SelectByIDQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

// Insert a film into "films" table
// Called by POST /api/films route
exports.insert = function InsertHandler(title, description, releaseYear, length, rating, categoryID, done){
    var values = [title, description, releaseYear, length, rating, categoryID];
    db.get().query(
        'INSERT INTO films (title, description, release_year, length, rating, category_id) ' +
        'VALUES (?,?,?,?,?,?)', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result.insertId);
        });
}

// Modify a film given film_id from "films" table
// Called by PUT /api/films route
exports.updateByID = function UpdateHandler(id, title, description, releaseYear, length, rating, categoryID, done){
    var values = [title, description, releaseYear, length, rating, categoryID, new Date().toISOString().slice(0, 19).replace('T', ' '), id];
    db.get().query(
        'UPDATE films SET title = ?, description = ?, release_year = ?, length = ?, rating = ?, category_id = ?, last_update = ? WHERE film_id = ?',
        values,
        function UpdateQueryHandler(err, result){
          if (err)
            return done(err);
          done(null, result.affectedRows);
        }
    );
}

// Delete a film from "films" table
// Called by DELETE /api/films route
exports.deleteById = function DeleteHandler(id, done){
    db.get().query(
        'DELETE FROM films WHERE film_id = ?', id,
        function DeleteQueryHandler(err, result){
          if (err)
            return done(err);
          done(null, result.affectedRows); // Number of deleted records
        }
    );
}

// Get all film records with their respective category from "films" table
// Called by GET /api/films-categories route
exports.findFilmsCats = function GetFilmsCatsHandler(done){
    db.get().query(
        'SELECT film_id, title, description, release_year, length, rating, name, films.last_update ' +
        'FROM films JOIN categories ON categories.category_id = films.category_id',
        function FilmsCatsQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}
