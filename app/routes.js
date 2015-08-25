// app/routes.js

// load the todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });

    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // set done and send back all todos after creation
    app.post('/api/todos/done/:todo_id', function(req, res) {

        Todo.findOne({_id:req.params.todo_id}, function (err, todo) {
            todo.done = !todo.done;

            todo.save(function (err) {
                if(err) {
                    res.send(err);
                }
                // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
            });
        });
    });

// edit todo send back all todos after creation - change done to false
    app.post('/api/todos/edit/:todo_id/:todo_text', function(req, res) {

        Todo.findOne({_id:req.params.todo_id}, function (err, todo) {
            todo.text = req.params.todo_text;
            todo.done = false;

            todo.save(function (err) {
                if(err) {
                    res.send(err);
                }
                // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
            });
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {

        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};