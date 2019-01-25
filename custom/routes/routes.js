var root = 'https://idealkingdom.github.io/magic/';
var useHash = true;
var hash = '#!';
var router = new Navigo(root, useHash, hash);
var passID = 0
$(document).ready(function() {
	router
	.on({
	  'logs/:id':function(params) {
	  	logspageLoad(params.id)
	    passID = params.id
	},
	  '*':function() {
	  	homepageload()
	  }
	})
	.resolve();
});

	
