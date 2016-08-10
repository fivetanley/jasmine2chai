describe('lessThan', function() {
  it("The 'toBeLessThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(e).to.be.below(pi);
    expect(pi).not.to.be.below(e);
  });
});
