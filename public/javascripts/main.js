var app = angular.module('klmapp',['ngResource', 'ngRoute'])

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/fetch/data/:sid', {
            templateUrl: 'partials/send-data.html',
            controller: 'SendDataCtrl'
        })
        .when('/admin/view', {
            templateUrl: 'partials/admin-view.html',
            controller: 'AdminViewCtrl'
        })
        .when('/g/:sender/:passenger', {
            templateUrl: 'partials/udata-form.html',
            controller: 'AddUsrDataCtrl'
        })
        .when('/add-udata', {
            templateUrl: 'partials/udata-form.html',
            controller: 'AddUsrDataCtrl'
        })
        .when('/udata/:id', {
            templateUrl: 'partials/edit-udata.html',
            controller: 'EditUsrDataCtrl'
        })
        .when('/delete-udata/:id', {
            templateUrl: 'partials/del-udata.html',
            controller: 'DeleteUsrDataCtrl'
        })
        .otherwise({
            redirectTo: '/admin/view'
        });
}]);

app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false
}]);


app.controller('SendDataCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){   
        var Usrdata = $resource('/api/spdata/:sid')
        Usrdata.get({sid: $routeParams.sid }, function(usrdata){
            $scope.usrdata = usrdata
        })
}])

app.controller('AdminViewCtrl', ['$scope', '$resource', function($scope, $resource){
	var Usrdata = $resource('/api/udata')
	Usrdata.query(function(udata){
		$scope.udata = udata
	})
}])

app.controller('AddUsrDataCtrl', ['$scope', '$resource', '$location',  '$routeParams', '$http', '$httpParamSerializerJQLike', '$window',
    function($scope, $resource, $location,  $routeParams, $http, $httpParamSerializerJQLike, $window){
        ptype = $routeParams.passenger.split('_')
        $scope.titledd = ["Mr.","Mrs."]
        $scope.usrdata = {
        	sender : $routeParams.sender, 
        	passenger : $routeParams.passenger,
        	convid : Math.floor(100000000000000000 + Math.random() * 900000000000000000),
        	date : new Date().valueOf(),
        	showffnum : false,
        	showfblue : false,
        	chkffnum : false,
        	chkfbluenum : false,
        	adults : ptype[0],
        	child : ptype[1],
        	babies : ptype[2]
        }
        
        $scope.save = function(){
            var Usrdata = $resource('/api/udata')
            Usrdata.save($scope.usrdata, function(){
            	$http({
                    method: 'POST',
                    url: 'https://hidden-fjord-97332.herokuapp.com/startpayment',
                    data: $httpParamSerializerJQLike({'sender': $routeParams.sender}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(response){
                	console.log('response : ====> ' + response)
                    	$window.location.href = 'https://www.messenger.com/closeWindow/?image_url=http://www.clker.com/cliparts/2/k/n/l/C/Q/transparent-green-checkmark-md.png&display_text=startpayment'
                })
            })
    }
}])

app.controller('EditUsrDataCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        $scope.titledd = ["Mr.","Mrs."]
        var Usrdata = $resource('/api/udata/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        })

        Usrdata.get({ id: $routeParams.id }, function(usrdata){
            $scope.usrdata = usrdata
        })

        $scope.save = function(){
            Usrdata.update($scope.usrdata, function(){
                $location.path('/admin/view')
            })
    }
}])

app.controller('DeleteUsrDataCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){   
        var Usrdata = $resource('/api/udata/:id')

        Usrdata.get({ id: $routeParams.id }, function(usrdata){
            $scope.usrdata = usrdata
        })

        $scope.delete = function(){
            Usrdata.delete({ id: $routeParams.id }, function(usrdata){
                $location.path('/admin/view');
            });
        }
}])
