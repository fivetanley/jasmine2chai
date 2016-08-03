describe('defined', function() {
  it("The 'toBeDefined' matcher compares against `undefined`", function() {
    var a = {
      foo: "foo"
    };

    expect(a.foo).to.not.be.undefined;
    expect(a.bar).to.be.undefined;
  });
});
