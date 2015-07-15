

if( typeof it !== 'undefined' ) {
  var orig_it = it
  it = function(desc,test) {
    if( 0 == test.length ) return orig_it(desc,test)
    orig_it(desc, function() {
      var done = false
      waitsFor(function () { return done })

      try {
        test(function () { done = true })
      }
      catch( e ) {
        done = true
        throw e
      }
    })
  }
}


if( typeof zeno === 'undefined' ) {
  var expect = require('code').expect
  var lab    = exports.lab = require('lab').script()
  var zeno   = require('../')  

  var describe = lab.describe
  var it       = lab.it
}
else {
  expect = code.expect
  __dirname = '@@@-never-match-@@@'
}


describe('happy', function(){

  it('works', function(fin){
    var z0 = zeno()

    function a0( msg, respond ) {
      respond(null,{x:msg.x})
    }

    var p0 = z0.pattern('a:1',{b:2})
    expect( p0 ).to.deep.equal( {a:1,b:2} )

    var r0 = z0.add({a:1},a0)
    expect( r0 ).to.equal( z0 )

    var ad0 = z0.find({a:1})
    expect( a0 ).to.equal( ad0.action )

    z0.act({x:0})

    z0.act({a:1,x:9},function(err,out){
      if( err ) return fin(err)
      expect( out.x ).to.equal( 9 )
      fin()
    })
  })


  it('pattern', function(fin){
    var z0 = zeno()

    expect( z0.pattern({a:1}) ).to.deep.equal( {a:1} )
    expect( z0.pattern('a:1') ).to.deep.equal( {a:1} )

    expect( z0.pattern({a:1,b:2})   ).to.deep.equal( {a:1,b:2} )
    expect( z0.pattern('a:1,b:2')   ).to.deep.equal( {a:1,b:2} )
    expect( z0.pattern({a:1},'b:2') ).to.deep.equal( {a:1,b:2} )
    expect( z0.pattern('a:1',{b:2}) ).to.deep.equal( {a:1,b:2} )
    expect( z0.pattern({a:1},{b:2}) ).to.deep.equal( {a:1,b:2} )
    expect( z0.pattern('a:1','b:2') ).to.deep.equal( {a:1,b:2} )

    function f0(){}
    f0.b=2
    expect( z0.pattern({a:1},f0) ).to.deep.equal( {a:1} )

    fin()
  })


})


