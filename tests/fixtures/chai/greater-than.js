describe('greater than', function() {
  it("The 'toBeGreaterThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(pi).to.be.above(e);
    expect(e).not.to.be.above(pi);
  });
});
