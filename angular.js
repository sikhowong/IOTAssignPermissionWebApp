angular.module('myApp', []);


function myCtrl($scope, $http) {
  // $scope.hello = {
  //   name: "Boaz",
  //   age: 12
  // };
  $scope.newName = "";

  $http.get('http://localhost:8080/permission')
      .success(function(data, status, headers, config) {
        $scope.permissions = data;
      });

  // $scope.sendPost = function() {
  //   var data = $.param({
  //     json: JSON.stringify({
  //       name: $scope.newName,
  //       age: $scope.newAge

  //     })
  //   });
  //   $http.post("/echo/json/", data).success(function(data, status) {
  //     $scope.hello = data;
  //   })
  // };



  // $scope.GetAllData = function() {

  //   $http.get('https://jsonplaceholder.typicode.com/posts/' + $scope.newAge)
  //     .success(function(data, status, headers, config) {
  //       $scope.hello = data;
  //     });
  // };

  // $scope.GetAllPermission = function() {
  
  //   $http.get('https://jsonplaceholder.typicode.com/posts/')
  //     .success(function(data, status, headers, config) {
  //       $scope.permissions = data;
  //     });
  // };

}
function permissionCtrl($scope, $http) {
  $scope.permissionPostData ="";

  $scope.objects = [{
    value: 'Door Lock',
    label: 'Door Lock'
  }];   
 
  $scope.sendPermission = function() {

    var fromDatetime = $('#fromDatetimepicker').datetimepicker('getValue');
    fromDatetime = getFormattedDate(fromDatetime);
    console.log(fromDatetime);

    var toDatetime = $('#toDatetimepicker').datetimepicker('getValue');
    toDatetime = getFormattedDate(toDatetime);
    console.log(toDatetime);

    var object = $scope.objectList.value;
    console.log($scope.objectList.value);

    var toUser = $scope.toUser;
    console.log($scope.toUser);  
    
    var control = $scope.control;
    console.log($scope.control);  

    var data = 
      JSON.stringify({
        user: toUser,
        object : object,
        time_range_start: fromDatetime,
        time_range_end : toDatetime,
        control : control
      });
      console.log(data);
    // var data = 
    //   JSON.stringify({
    //     title: fromDatetime,
    //     userId : 1,
    //     body: $scope.newAge
    //   });
   
    $http.post("http://localhost:8080/permission", data).success(function(data, status) {
      $scope.permissionPostData = data;
      // $route.reload();
      $scope.reloadPage = function()                                                
                   {
                     $window.location.reload();
                   }
    })
  };
}


function getFormattedDate(d) {
   
    var str = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

    return str;
}


function getObjectCtrl($scope, $http) {
  $scope.objects = "";  
  $http.get('http://localhost:8080/object/')
    .success(function(data, status, headers, config) {
      $scope.objects = data;
    });
}


