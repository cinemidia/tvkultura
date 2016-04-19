(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetUser = GetUser;

        return service;


        function GetUser(username,password)
		{            
            var deferred = $q.defer();           
             $.ajax({
                    type:'post',
                    url:'app/components/login/validacao_servidor.php',    
                    data: {'userName' :  username,
                            'pass' :  password,
                            'accao'    :  'login'},                
                    cache:false,
                    success: function(response){                                            
						deferred.resolve(response); 
                                                                  
                     }				                   
                    
                });             
              return deferred.promise;
        }

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

       function GetByUsername(username) {
            var deferred = $q.defer();           
             $.ajax({
                    type:'post',
                    url:'app/components/login/validacao_servidor.php',    
                     data: {'userName' :  username,
                            'accao'    : 'checkNome'},                
                    cache:false,
                    success: function(response){                      
                    deferred.resolve(response);
                 }
                });             
              return deferred.promise;
        }

        function Create(user) {           
            var deferred = $q.defer();
            // simulate api call with $timeout
             $timeout(function () {
               GetByUsername(user.username)
                 .then(function(existeUser){
                       if(existeUser == 0){
                           $.ajax({
                                type:'post',
                                url:'app/components/login/validacao_servidor.php',    
                                 data: {'firstName': user.firstName, 
                                        'lastName' :  user.lastName,
                                        'userName' :  user.username,
                                        'password' :  user.password,
                                        'accao'    : 'registrar'},                
                                cache:false,
                                success: function(response){    
                                deferred.resolve({ success: true });                             
                                }
                            });
                            
                        }
                         else{
                               deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                             }  
              });              
         }, 1000);
          return deferred.promise;
        }
           
         
        function Update(user) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            $.ajax({
                    type:'post',
                    url:'app/components/login/validacao_servidor.php',    
                     data: {'userId' :  id,
                            'accao'    : 'delete'},                
                    cache:false,
                    success: function(response){                      
                    deferred.resolve(response);                    
                    }
                });  

            return deferred.promise;
}

        // private functions

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
         } 
    }
})();