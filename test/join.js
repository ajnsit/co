
var co = require('..');
var fs = require('fs');
var join = co.join;

var read = co.wrap(fs.readFile);

describe('co.join(array)', function(){
  it('should aggregate several thunks', function(done){
    co(function *(){
      var a = read('index.js', 'utf8');
      var b = read('Makefile', 'utf8');
      var c = read('package.json', 'utf8');

      var res = yield join([a, b, c]);
      res.should.have.length(3);
      res[0].should.include('exports');
      res[1].should.include('test');
      res[2].should.include('devDependencies');

      done();
    });
  })
})

describe('co.join(fn, ...)', function(){
  it('should aggregate several thunks', function(done){
    co(function *(){
      var a = read('index.js', 'utf8');
      var b = read('Makefile', 'utf8');
      var c = read('package.json', 'utf8');

      var res = yield join(a, b, c);
      res.should.have.length(3);
      res[0].should.include('exports');
      res[1].should.include('test');
      res[2].should.include('devDependencies');

      done();
    });
  })
})
