// js/services/todos.js
angular.module('todoService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('/api/todos');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/todos/' + id);
            },
            done : function(id) {
                 return $http.post('/api/todos/done/' + id);
            },
            edit : function(id, text) {
                 return $http.post('/api/todos/edit/' + id +'/' + text);
            },
            sendEmail : function(from, to, text) {
                 return $http.get('/api/todos/sendEmail/' + from + '/' + to + '/' + text);
            }
        }
    });
