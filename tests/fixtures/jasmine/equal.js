describe('isEqual', function() {
  it("works for simple literals and variables", function() {
    var a = 12;
    expect(a).toEqual(12);
  });

  it("should work for objects", function() {
    var foo = {
      a: 12,
      b: 34
    };
    var bar = {
      a: 12,
      b: 34
    };
    expect(foo).toEqual(bar);
  });
});
