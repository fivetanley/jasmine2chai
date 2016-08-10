describe('toThrowError', function() {
  it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
    var foo = function() {
      throw new TypeError("foo bar baz");
    };

    expect(foo).to.throw("foo bar baz");
    expect(foo).to.throw(/bar/);
    expect(foo).to.throw(TypeError);
    expect(foo).to.throw(TypeError, "foo bar baz");
  });
});
