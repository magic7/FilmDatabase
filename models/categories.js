var db = require('../db');

// Get all category records from "categories" table
// Called by GET /api/categories route
exports.getAll = function GetAllHandler(done){
    db.get().query(
        'SELECT * FROM categories', function SelectAllQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

// Get category give category_id from "categories" table
// Called by GET /api/categories/:id route
exports.findById = function FindByIdHandler(id, done){
    db.get().query(
        'SELECT * FROM categories WHERE category_id = ?', id,
        function SelectByIDQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

// Insert a category into "categories" table
// Called by POST /api/categories route
exports.insert = function InsertHandler(name, done){
    db.get().query(
        'INSERT INTO categories (name) VALUES (?)', [name], function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result.insertId);
        });
}
