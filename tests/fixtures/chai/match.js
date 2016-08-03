describe('match', function() {
  it("The 'toMatch' matcher is for regular expressions", function() {
    var message = "foo bar baz";

    expect(message).to.match(/bar/);
    expect(message).to.match("bar");
    expect(message).not.to.match(/quux/);
  });
});
