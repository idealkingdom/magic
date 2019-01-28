
function homepageload() {
  $("#dataAppend").load('https://raw.githubusercontent.com/idealkingdom/magic/master/custom/templates/ProjectTemplate.html',function() {
        listProject();
  })
}

function logspageLoad(id){
    $("#dataAppend").load('https://raw.githubusercontent.com/idealkingdom/magic/master/custom/templates/Logstemplate.html',function() {
       loadandlisten(id)
  })
}



function loadandlisten(id) {
database.ref('Logs/'+id).once('value', function(snapshot) {
      snapshot.forEach(function(e,i) {
               $('#tblData').append(`<div class="form-group tbl" id="logtbl${e.key}" align="left" style="border: 2px solid gray; padding: 10px;">
                <div >
                  <table>
                    <caption></caption>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Error Id</td>
                        <td style="background-color: white;" class ="logID"id="logID${e.key}">${e.key}</td>
                      </tr>
                      <tr>
                        <td>Tester</td>
                        <td style="background-color: white;">${e.val()['tester']}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td style="background-color: white;" class="descComment" id="descComment${e.key}">${e.val()['description']} <br/><br/>
                        <a id="h${e.key}" href="${e.val()['canvas']}" target="_blank"><img id="img${e.key}" style="max-width:950px; min-width:0px;" class="img-fluid" src="${e.val()['canvas']}" alt=""> </a> 
                        </td>
                      </tr>
                      <div align="middle">
                      <table style="margin-top: 4%;" width="800px" class="commentTbl" id="${e.key}">
                        <tbody>
                        </tbody>
                      </table>
                    </tbody>
                  </table>
                  </div>
                  <div class="form-group">
                    <label>Comment</label>
                    <textarea class="form-control" rows="3" style="resize: none;" width="800px"></textarea>
                    <button type="submit" id="comment142" class="btn btn-primary submitComment" style="float:right; margin-top: 2px;">Add comment</button>
                  </div>
                </div>
              </div>`)
      });



        database.ref('Logs/'+id).orderByKey().limitToLast(1).on('child_changed', function(snapshot) {
       $('#tblData').append(`<div class="form-group tbl" id="logtbl${snapshot.key}" align="left" style="border: 2px solid gray; padding: 10px;">
                <div >
                  <table>
                    <caption></caption>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Error Id</td>
                        <td style="background-color: white;" class ="logID"id="logID${snapshot.key}">${snapshot.key}</td>
                      </tr>
                      <tr>
                        <td>Tester</td>
                        <td style="background-color: white;">${snapshot.val()['tester']}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td style="background-color: white;" class="descComment" id="descComment${snapshot.key}">${snapshot.val()['description']} <br/><br/>
                        <a id="h${snapshot.key}" href="${snapshot.val()['canvas']}" target="_blank"><img id="img${snapshot.key}" style="max-width:950px; min-width:0px;" class="img-fluid" src="${snapshot.val()['canvas']}" alt=""> </a> 
                        </td>
                      </tr>
                      <div align="middle">
                      <table style="margin-top: 4%;" width="800px" class="commentTbl" id="${snapshot.key}">
                        <tbody>
                        </tbody>
                      </table>
                    </tbody>
                  </table>
                  </div>
                  <div class="form-group">
                    <label>Comment</label>
                    <textarea class="form-control" rows="3" style="resize: none;" width="800px"></textarea>
                    <button type="submit" id="comment142" class="btn btn-primary submitComment" style="float:right; margin-top: 2px;">Add comment</button>
                  </div>
                </div>
              </div>`)




})



})


                            




}


function commentLoaded (id) {
  setTimeout(function() {
     database.ref('LogsComments/'+id).on("value",function(snapshot) {
          snapshot.forEach( function(element, index) {
            $(`#${element.key}`).html("")
             database.ref('LogsComments/'+id+'/'+element.key).on('child_added',function(snap2) {
            $(`#${element.key}`).append(`<tr id ="${snap2.key}">
            <td style="background-color: skyblue;font-size: 10px;width:20%;">
            ${snap2.val()['name']}
            </td>
            <td style="width:80%;background-color:white;white-space: pre-wrap;">${snap2.val()['comment']}</td>
            <td ><div><button class="btn btn-sm btn-info editComment" data-toggle="modal" data-target="#editModal" style="float:right;">Edit</button>
            <button class="btn btn-sm btn-danger delComment"  id="delComment" style="float:right;">Delete</button></div></tr>`)
             })


             database.ref('LogsComments/'+id+'/'+element.key).on('child_removed',function(snap2) {
                        $(`#${snap2.key}`).hide('slow/400/fast', function() {
                              $(`#${element.key} > tbody > #${snap2.key}`).remove()
                                                      });
                      })

          });

}) 
  }, 500);


}