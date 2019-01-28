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
    	tobeready = 1
        data = {
            description: desc,
            tester: tester,
            canvas: 'none'
        }
        $('#btnaddLogs').attr('disabled', 'disabled');
        if (canvas) {
            database.ref('Logs/' + passID).push(data).then(function(snapshot) {
                var pfile = storageRef.child('imagesBlob/' + passID + '/' + snapshot.key +'/'+snapshot.key).put(canvas)
                pfile.on(firebase.storage.TaskEvent.STATE_CHANGED,null, function(e) {
                    console.log('Upload Error' + e)
                }, function() {
                    storageRef.child('imagesBlob/' + passID + '/' + snapshot.key +'/'+snapshot.key).getDownloadURL().then(function(result) {
                        data.canvas = result
                        database.ref('Logs/' + passID).child(snapshot.key).set(data);
                        $('#addModal').hide('slow/200/fast').modal('hide')
                        $(`#h${snapshot.key}`).attr('href',result)
                        $(`#img${snapshot.key}`).attr('src',result)

                    }).catch(function(e) {
                        console.log("Added data without picture" + e)
                        $('#addModal').hide('slow/200/fast').modal('hide');
                    })
                })
            })
        } else {
            database.ref('Logs/' + passID).push(data).then(function(snapshot) {
            	data.canvas = ''
            	setTimeout(function() {
            		database.ref('Logs/' + passID).child(snapshot.key).set(data)
            	}, 0);
            	
            })
            $('#addModal').hide('slow/200/fast').modal('hide')
        }
    }


    function firebaseAddComment(id, name, comment) {
        var nearId = id.closest('.tbl').find(".logID").text()
        data = {
            name: name,
            comment: comment
        }
        database.ref('LogsComments/' + passID + '/' + nearId).push(data)
    }

    function firebaseRemoveComment(id) {
        var nearId = id.closest('table').attr('id');
        var Id = id.closest('tr').attr('id');
        console.log(passID, nearId , Id)
        database.ref('LogsComments/' + passID + '/' + nearId).child(Id).set(null)
    }

    function firebaseEditComment(id, name, comment) {
        var nearId = id.closest('table').attr('id')
        var Id = id.closest('tr').attr('id')
        console.log(Id , nearId)
        data = {
            name: name,
            comment: comment
        }
        database.ref('LogsComments/' + passID + '/' + nearId ).child(Id).set(data)
    }



});