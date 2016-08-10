describe('toThrow', function() {
  it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
    var foo = function() {
      return 1 + 2;
    };
    var bar = function() {
      return a + 1;
    };

    expect(foo).not.to.throw();
    expect(bar).to.throw();
  });
});
