var root = 'https://idealkingdom.github.io/magic/';
var useHash = true;
var hash = '#!';
var router = new Navigo(root, useHash, hash);
var passID = 0
$(document).ready(function() {
	router
	.on({
	  'logs/:id':function(params) {
	  	if(localStorage.getItem("Tester")===null){
	  		document.write("No tester set go back to homepage first! You will be redirected in 3 seconds.")
	  		setTimeout(function() {
	  			location.replace("https://idealkingdom.github.io/magic/")
	  		}, 3000);
	  	}
	     passID = params.id
	  			logspageLoad(params.id)
	  			setTimeout(function() {
	  				commentLoaded(params.id)
	  				location.replace('#logs/'+params.id)
	  			}, 200);
	  			


	},
	  '*':function() {
	  	homepageload()
	  }
	})
	.resolve();
});

	
