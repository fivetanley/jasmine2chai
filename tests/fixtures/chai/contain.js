describe('contain', function() {
  it("The 'toContain' matcher is for finding an item in an Array", function() {
    var a = ["foo", "bar", "baz"];

    expect(a).to.include("bar");
    expect(a).not.to.include("quux");
  });
});

