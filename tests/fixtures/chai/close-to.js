describe('closeTo', function() {
  it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(pi).not.to.be.closeTo(e, 2);
    expect(pi).to.be.closeTo(e, 0);
  });
});

