const myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $http.get('/todolist/').then((response) => {
      $scope.todoList = response.data;
    });

    function refresh() {
      console.log('Message from controller');
      $http.get('/todolist/').then((response) => {
        $scope.todoList = response.data;
      });
      window.location.reload();
    }

    $scope.addTodo = function () {
      console.log($scope.todo);
      $http.post('/todolist/', $scope.todo).then((response) => {
        console.log(response);
        refresh();
      });
    };

    $scope.remove = function (id) {
      console.log(id);
      $http.delete(`/todolist/${id}`).then(() => {
        refresh();
      });
    };

    $scope.update = function () {
      console.log($scope.todo._id);
      $http
        .put(`/todolist/${$scope.todo._id}`, $scope.todo)
        .then((response) => {
          refresh();
        });
    };

    $scope.clear = function () {
      $scope.todo = '';
    };

    $scope.edit = function (id) {
      console.log(`ID: ${id}`);
      $http.get(`/todolist/${id}`).then((response) => {
        $scope.todo = response.data;
      });
    };

    $scope.complete = function (status) {
      $http.put(`/todolist/${status}`, $scope.todo).then((response) => {
        console.log(response);
        refresh();
      });
    };
  },
]);
