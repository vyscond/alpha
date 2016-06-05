//var casper = require('casper').create();
casper.start('');

casper.then(function() {
  this.echo('First Page: ' + this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
  this.echo('Second Page: ' + this.getTitle());
});

casper.run();
