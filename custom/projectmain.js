var pmodal = $("#addProject");
var pno = $('#addProjectNo');
var pname = $('#addProjectName');
var pnote = $('#addProjectNote')
jQuery(document).ready(function($) {
	$("#btnaddProject").click(function(event) {
	firebaseAddProject(pno.val(),pname.val(),localStorage.getItem("Tester"),pnote.text());
});

function firebaseAddProject(pno,pname,tester,note) {
	var exist = 0;
	data = {
			projectNo : pno,
			projectName:pname,
			tester: tester,
		    stamp: firebase.firestore.FieldValue.serverTimestamp(),
			Note:note}
	 db.collection("Projects").where("projectNo","==",""+pno).get().then(function(docSnapshot) {
	 				docSnapshot.forEach( function(snap) {
	 					if (snap.exists){
	 							alert("Project already exists")
	 							exist = 1;
	 							pmodal.hide('slow/400/fast').modal('hide');
	 					}
	 				})
	 }).then(function() {
	 	if (exist == 0) {
	 				 		db.collection("Projects").doc(pno).set(data).then(function() {
	 							console.log('Project Added')
	 							pmodal.hide('slow/400/fast').modal('hide');
	 						})
	 	}
	 })
}





});


function listProject() {
		  db.collection("Projects").orderBy("stamp","asc").get().then(function(querySnapshot) {
		  		querySnapshot.forEach( function(docs) {
		  			console.log(docs.data())
		  			$('#projectList').append(`<tr><td align="middle"><a href="#logs/${docs.data()['projectNo']}">${docs.data()['projectNo']}</a></td><tr>`)
		  		});
		  })
}






$(function() {
pmodal.on("hide.bs.modal", function () {
		pno.val(""),pname.val("")
});
});


