$(function() {
    var a = ""
    var z = document.getElementById("logCanvas");
    var x = document.getElementById("logCanvasHidden");
    var ctx = z.getContext("2d")
    var ctx2 = x.getContext("2d")
    var currentDate = new Date();
    var editC = ""
    $('#tblData').on('click', '.submitComment', function(e) {
        e.preventDefault();
        if ($(this).siblings('textarea').val().trim() != '') {
            firebaseAddComment($(this),  localStorage.getItem("Tester"), $(this).siblings('textarea').val().trim())
            $(this).siblings('textarea').val('')
        } else {
            alert('error fucking shit')
        }

    });
    $('#tblData').on('click', '.delComment', function(e) {
        e.preventDefault();
        delComment(this);

    });
    $('#tblData').on('click', '.editComment', function(e) {
        e.preventDefault();
        editComment(this);
    });
    $('#editModal').on('click', '.editSubmit', function(e) {
        e.preventDefault();
        editSubmit();
    });

    $('#btnaddLogs').click(function(event) {
        /* Act on the event */
        a = $('#addLogstextarea').val()
        firebaseAddLogs(a, localStorage.getItem("Tester"), imgsrc)
    });

    function delComment(e) {
        $(e).parents('tr').hide('slow/400/fast', function() {
            firebaseRemoveComment($(e))
            $(this).remove()
        });;
    }

    function editComment(e) {
        var ctable = $(e);
        a = $(e).closest('td').prev()
        $('#editTitle').text('Edit ' + a.text())
        $('#editTextarea').val(a.text())
        editC = ctable;
    }

    function editSubmit() {
        var newText = '' + $('#editTextarea').val()
        a.text(newText)
        $('#editModal').hide('slow/400/fast').modal('hide')
        firebaseEditComment(editC, localStorage.getItem("Tester"), newText);
    }

    $("#addModal").on("hide.bs.modal", function() {
        imgsrc = "";
        ctx.clearRect(0, 0, z.width, z.height);
        ctx2.clearRect(0, 0, x.width, x.height);
        $('#btnaddLogs').removeAttr('disabled');
        $('#logCanvas').html("")
        $('#addLogstextarea').val('')
    });

    function firebaseAddLogs(desc, tester, canvas) {
		$('#btnaddLogs').attr('disabled', 'disabled');
        data = {
        	projectID: passID,
            description: desc,
            tester: tester,
            stamp:firebase.firestore.FieldValue.serverTimestamp()
        }

        db.collection("Logs").add(data)
        .then(function(docRef) {
        	if (canvas){
        	var pfile = storageRef.child('imagesBlob/' + passID + '/'+docRef.id+'/'+docRef.id).put(canvas)
                pfile.on(firebase.storage.TaskEvent.STATE_CHANGED,null, function(e) {
                    console.log('Upload Error' + e)
                }, function() {
                    storageRef.child('imagesBlob/' + passID + '/'+docRef.id+'/'+docRef.id).getDownloadURL().then(function(result) {
                        data.canvas = result
                        db.collection("Logs").doc(docRef.id).set(data)
                        $('#addModal').hide('slow/200/fast').modal('hide');
                        $('#h'+docRef.id).attr('href',result)
                        $('#img'+docRef.id).attr('src',result)
                    }).catch(function(e) {
                        console.log("Added data without picture" + e)
                        $('#addModal').hide('slow/200/fast').modal('hide');
                    })
                })  		
        	}else {
        		     $('#addModal').hide('slow/200/fast').modal('hide');
        	}


        }).catch(function(err) {
        	console.log(err)
        })
        








        // if (canvas) {
        //     database.ref('Logs/' + passID).push(data).then(function(snapshot) {
        //         var pfile = storageRef.child('imagesBlob/' + passID + '/' + snapshot.key +'/'+snapshot.key).put(canvas)
        //         pfile.on(firebase.storage.TaskEvent.STATE_CHANGED,null, function(e) {
        //             console.log('Upload Error' + e)
        //         }, function() {
        //             storageRef.child('imagesBlob/' + passID + '/' + snapshot.key +'/'+snapshot.key).getDownloadURL().then(function(result) {
        //                 data.canvas = result
        //                 database.ref('Logs/' + passID).child(snapshot.key).set(data);
        //                 $('#addModal').hide('slow/200/fast',function() {
        //                 	location.reload();
        //                 })

        //             }).catch(function(e) {
        //                 console.log("Added data without picture" + e)
        //                 $('#addModal').hide('slow/200/fast',function() {
        //                 	location.reload();
        //                 });
        //             })
        //         })
        //     })
        // } else {
        //     database.ref('Logs/' + passID).push(data).then(function(snapshot) {
        //     	data.canvas = ''
        //     	setTimeout(function() {
        //     		database.ref('Logs/' + passID).child(snapshot.key).set(data).then(function() {
        //     			location.reload();
        //     		})
            		
        //     	}, 0);
            	
        //     })
        //     $('#addModal').hide('slow/200/fast').modal('hide')
        // // }


    }


    function firebaseAddComment(id, name, comment) {
        var nearId = id.closest('.tbl').find(".logID").text()
        data = {
        	projectID: passID,
        	log_comment: nearId,
            name: name,
            comment: comment,
            stamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        db.collection('LogsComments').add(data).then(function() {
        	console.log(data)
        })
    }

    function firebaseRemoveComment(id) {
        var nearId = id.closest('table').attr('id');
        var Id = id.closest('tr').attr('id');
        console.log(passID, nearId , Id)
        db.collection('LogsComments').doc(Id).delete().then(function() {
        	console.log('comment successfully removed!')
        })
    }

    function firebaseEditComment(id, name, comment) {
        var nearId = id.closest('table').attr('id')
        var Id = id.closest('tr').attr('id')
        console.log(Id , nearId)
        data = {
            comment: comment
        }
        db.collection('LogsComments/').doc(Id).update(data)
    }



});