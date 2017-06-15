"use strict";

describe("CreateFromImageController", function(){
  var controller;
  var $scope = {
    name: "apPname",
    projectName: "aProjectName",
    $on: _.noop
  };
  var $routeParams = {
    imageStream: "anImageName",
    imageTag: "latest",
    namespace: "aNamespace"
  };

  beforeEach(function(){
    inject(function(_$controller_, $q){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      controller = _$controller_("CreateFromImageController", {
        $scope: $scope,
        $routeParams: $routeParams,
        DataService: {
          get: function(kind){
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
          }
        },
        Navigate: {
          toErrorPage: function(message){}
        },
        ProjectsService: {
          get: function(name) {
            return $q.when([
              {
                metadata: {
                  'name': 'foo',
                  'selfLink': '/oapi/v1/projects/foo',
                  'uid': 'c6fdde8d-979b-11e5-8493-080027c5bfa9',
                  'resourceVersion': '25334',
                  'creationTimestamp': '2015-11-30T19:51:41Z',
                  'annotations': {
                    'openshift.io/description': 'Foo',
                    'openshift.io/display-name': 'foo'
                  }
                },
                spec: {
                  'finalizers': [
                    'openshift.io/origin',
                    'kubernetes'
                  ]
                },
                status: {
                  'phase': 'Active'
                }
              }, {
                projectPromise: $q.when({}),
                projectName: 'foo',
                project: undefined
              }
            ]);
          }
        }
      });
    });
  });

  it("valid http URL", function(){
    var match = 'http://example.com/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("invalid http URL, without http part", function(){
    var match = 'example.com/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).toBeNull();
  });

  it("valid http URL with user and password", function(){
    var match = 'http://user:pass@example.com/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("valid http URL with user and password with special characters", function(){
    var match = 'https://user:my!password@example.com/gerrit/p/myrepo.git'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("valid http URL with port", function(){
    var match = 'http://example.com:8080/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("valid http URL with port, user and password", function(){
    var match = 'http://user:pass@example.com:8080/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("valid https URL", function(){
    var match = 'https://example.com/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("valid ftp URL", function(){
    var match = 'ftp://example.com/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("valid git+ssh URL", function(){
    var match = 'git@example.com:dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("valid ssh URL", function(){
    var match = 'ssh://git@example.com/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

  it("valid ssh URL with custom port", function(){
    var match = 'ssh://git@example.com:8080/dir1/dir2'.match($scope.sourceURLPattern);
    expect(match).not.toBeNull();
  });

});
