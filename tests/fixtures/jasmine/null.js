describe('null', function() {
  var a = null;
  var foo = "foo";

  expect(null).toBeNull();
  expect(a).toBeNull();
  expect(foo).not.toBeNull();
});
