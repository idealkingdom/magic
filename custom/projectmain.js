var pmodal = $("#addProject");
var pno = $('#addProjectNo');
var pname = $('#addProjectName');
var pnote = $('#addProjectNotes')
jQuery(document).ready(function($) {
	$("#btnaddProject").click(function(event) {
	if (pno.val()!= "" && pname.val()!= "" && pnote.val()!= "") {
		firebaseAddProject(pno.val(),pname.val(),localStorage.getItem("Tester"),pnote.val());
	}
	else{
		alert("Input must not be empty.");
	}


});

	$('#projectList').on('click', '.viewing', function(event) {
			viewDetails($(this).attr('id').substring(4));
	});
	

function firebaseAddProject(pno,pname,tester,note) {
	var exist = 0;
	data = {
			projectNo : pno,
			projectName:pname,
			tester: tester,
		    stamp: firebase.firestore.FieldValue.serverTimestamp(),
			note:note}
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
		  			$('#projectList').append(`<tr><td align="middle" style="font-size:15px;background-color:white;"><a href="#logs/${docs.data()['projectNo']}">${docs.data()['projectNo']} - ${docs.data()['projectName']}</a></td>
		  				<td style="background-color:#afaf9e;"><button type="" class="btn btn-sm btn-info viewing" id="view${docs.data()['projectNo']}"  class="btn btn-sm btn-info">View</button></td><tr>`)
		  		});
		  })
}



function viewDetails(id){
	 db.collection("Projects").doc(id).get().then(function(querySnapshot) {
	 	console.log(querySnapshot.data())
	 	$("#viewProject").modal("show");
	 	$("#viewProjectNo").val(querySnapshot.data()['projectNo'])
	 	$("#viewProjectName").val(querySnapshot.data()['projectName'])
	 	$("#viewProjectDate").val(Date(querySnapshot.data()['stamp']))
	 	$("#viewProjectNotes").val(querySnapshot.data()['note'])
	 })
}






$(function() {
pmodal.on("hide.bs.modal", function () {
		pno.val(""),pname.val(""),pnote.val("")
});
});


