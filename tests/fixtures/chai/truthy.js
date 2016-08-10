describe('truthy', function () {
  it("The 'toBeTruthy' matcher is for boolean casting testing", function() {
    var a, foo = "foo";

    expect(foo).to.be.ok;
    expect(a).not.to.be.ok;
  });
});
