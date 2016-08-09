describe('null', function() {
  var a = null;
  var foo = "foo";

  expect(null).to.be.null;
  expect(a).to.be.null;
  expect(foo).not.to.be.null;
});

