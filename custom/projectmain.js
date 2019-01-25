var pmodal = $("#addProject");
var pno = $('#addProjectNo');
var pname = $('#addProjectName');
jQuery(document).ready(function($) {
	$("#btnaddProject").click(function(event) {
	firebaseAddProject(pno.val(),pname.val());
});

function firebaseAddProject(pno,pname) {
	data = {
			projectName:pname}
	database.ref("Project/"+pno).once("value",snapshot => {
		    snapshot.exists() ? alert("Project Exists!") : database.ref("Project/"+pno).set(data).then(function() {
		    	alert("Project succesfully added!")
		    	pmodal.hide('slow/200/fast').modal('hide')
		    }, function(err) {
		    	alert("database error!"+err)
		    	pmodal.hide('slow/200/fast').modal('hide')
		    });
	})
}





});


function listProject() {
		  database.ref("Project").on("child_added",snapshot =>{
      		$('#projectList').append(`<tr>
    		<td style="text-align:center;"><a href="#logs/${snapshot.key}">${snapshot.key} - ${snapshot.val()['projectName']}</></td>
  				</tr>
				`);
  			})
}






$(function() {
pmodal.on("hide.bs.modal", function () {
		pno.val(""),pname.val("")
});
});


