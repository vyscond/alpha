//var casper = require('casper').create();
//var fs = require('fs');
//var file = 'file://' + fs.absolute('../examples/basic.html');

casper.start('http://localhost:8080');

casper.then(function() {
  var self = this;
  this.echo('First Page: ' + this.getTitle());
  casper.test.begin('Asserting String Prototypes', function(test) {
    test.assertEquals(self.getTitle(), 'AlphaJS | test');
    test.assertExists('div#myElement');
    test.assertSelectorHasText('div#myElement', 'Hello World from AlphaJS');
    test.done();
  });
});

casper.thenOpen('http://phantomjs.org', function() {
  this.echo('Second Page: ' + this.getTitle());
});

casper.run();
