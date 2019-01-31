
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
var aPromise = new Promise((resolve,reject)=>{

        resolve(db.collection("Logs").where("projectID","==",passID).orderBy("stamp", "asc").onSnapshot(function(snapshot) {
              snapshot.docChanges().forEach( function(change) {
                  if (change.type === "added") {
                      console.log("Added ", change.doc.data());
                                     $('#tblData').append(`
                                      <button style="float:right;" id="d${change.doc.id}" class="btn-sm delLog">X</button><div class="form-group tbl" id="logtbl${change.doc.id}" align="left" style="border: 2px solid gray; padding: 10px; display:none; margin-bottom:5%;">

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
                        <td style="background-color: white;" class ="logID"id="logID${change.doc.id}">${change.doc.id}</td>
                      </tr>
                      <tr>
                        <td>Tester</td>
                        <td style="background-color: white;">${change.doc.data()['tester']}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td style="background-color: white;" class="descComment" id="descComment${change.doc.id}">${change.doc.data()['description']} <br/><br/>
                        <a id="h${change.doc.id}" href="${change.doc.data()['canvas'] || ''}" target="_blank"><img id="img${change.doc.id}" style="max-width:950px; min-width:0px;" class="img-fluid" src="${change.doc.data()['canvas'] || ''}" alt=""> </a> 
                        </td>
                      </tr>
                      <div align="middle">
                      <table style="margin-top: 4%;table-layout:fixed" width="800px" class="commentTbl" id="${change.doc.id}">
                        <tbody>
                        </tbody>
                      </table>
                    </tbody>
                  </table>
                  </div>
                  <div class="form-group">
                    <label>Comment</label>
                    <textarea class="form-control" rows="5" style="resize: none;" cols="40"></textarea>
                    <button type="submit" id="comment142" class="btn btn-primary submitComment" style="float:right; margin-top: 2px;">Add comment</button>
                  </div>
                </div>
              </div>`)
                  setTimeout(function() {$(`#logtbl${change.doc.id}`).show('slow');}, 100);
                  }
                          setTimeout(function() {
                          $(`#h${change.doc.id}`).attr('href',change.doc.data()['canvas'])
                          $(`#img${change.doc.id}`).attr('src',change.doc.data()['canvas'])
              }, 5000);
                  if (change.type === "modified") {
                      console.log("modified", change.doc.data());
                  }
                  if (change.type === "removed") {
                      console.log("removed", change.doc.data());
                      $(`#logtbl${change.doc.id}`).remove()
                      $(`#d${change.doc.id}`).remove()
                  }
              });
          })
)  


}).then((fetchData)=>{

  db.collection("LogsComments").where("projectID","==",passID).orderBy("stamp","asc").onSnapshot(function(snapshot) {


  snapshot.docChanges().forEach( function(change) {
    if (change.type === "added"){

      var a = `<tr id ="${change.doc.id}">
            <td style="background-color: skyblue;font-size: 10px;width:20%; text-align: center; ">
            ${change.doc.data()['name']}
            </td>
            <td id="comment${change.doc.id}" style="width:80%;background-color:white;white-space: pre-wrap;word-wrap: break-word">${change.doc.data()['comment']}</td>
            <td ><div style="float:right;"><button class="btn btn-sm btn-info editComment" data-toggle="modal" data-target="#editModal" >Edit</button>
            <button class="btn btn-sm btn-danger delComment"  id="delComment" >Delete</button></div></tr>`
      var b = `<tr id ="${change.doc.id}" >
            <td style="background-color: skyblue;font-size: 10px; width: 150px;text-align: center;">
            ${change.doc.data()['name']}
            </td>
            <td id="comment${change.doc.id}" style="width:700px;background-color:skyblue;white-space: pre-wrap; word-wrap: break-word">${change.doc.data()['comment']}</td>
            <td style="width:100px;"><div style="float:right;"><button class="btn btn-sm btn-info  " disabled   >Edit</button>
            <button class="btn btn-sm btn-danger  " disabled  id="">Delete</button></div></td></tr>`
              if(change.doc.data()['name'] == localStorage.getItem("Tester")){
                console.log($(`#${change.doc.id}`).length)
                 if ($(`#${change.doc.id}`).length < 1) {
                    $(a).appendTo(`#${change.doc.data()['log_comment']}`).eq(0)
                 }
                }
              else{
                if ($(`#${change.doc.id}`).length < 1) {
                     $(b).appendTo(`#${change.doc.data()['log_comment']}`).eq(0)
                 }
                 
                }


    }
    if (change.type==="removed"){
                              $(`#${change.doc.id}`).hide('slow/400/fast', function() {
                              $(`#${change.doc.data()['log_comment']} > tbody > #${change.doc.id}`).remove()
                                                      });
    }
    if (change.type==="modified"){
                    $(`#comment${change.doc.id}`).text(change.doc.data()['comment'])
                    console.log(change.doc.data()['comment'])
    }
  });

})

})

// database.ref('Logs/'+id).once('value', function(snapshot) {
//       snapshot.forEach(function(e,i) {
//                $('#tblData').append(`<div class="form-group tbl" id="logtbl${e.key}" align="left" style="border: 2px solid gray; padding: 10px;">
//                 <div >
//                   <table>
//                     <caption></caption>
//                     <thead>
//                       <tr>
//                         <th></th>
//                         <th>Details</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Error Id</td>
//                         <td style="background-color: white;" class ="logID"id="logID${e.key}">${e.key}</td>
//                       </tr>
//                       <tr>
//                         <td>Tester</td>
//                         <td style="background-color: white;">${e.val()['tester']}</td>
//                       </tr>
//                       <tr>
//                         <td>Description</td>
//                         <td style="background-color: white;" class="descComment" id="descComment${e.key}">${e.val()['description']} <br/><br/>
//                         <a id="h${e.key}" href="${e.val()['canvas']}" target="_blank"><img id="img${e.key}" style="max-width:950px; min-width:0px;" class="img-fluid" src="${e.val()['canvas']}" alt=""> </a> 
//                         </td>
//                       </tr>
//                       <div align="middle">
//                       <table style="margin-top: 4%;" width="800px" class="commentTbl" id="${e.key}">
//                         <tbody>
//                         </tbody>
//                       </table>
//                     </tbody>
//                   </table>
//                   </div>
//                   <div class="form-group">
//                     <label>Comment</label>
//                     <textarea class="form-control" rows="3" style="resize: none;" width="800px"></textarea>
//                     <button type="submit" id="comment142" class="btn btn-primary submitComment" style="float:right; margin-top: 2px;">Add comment</button>
//                   </div>
//                 </div>
//               </div>`)
//       });



// //         database.ref('Logs/'+id).orderByKey().limitToLast(1).on('child_changed', function(snapshot) {
// //        $('#tblData').append(`<div class="form-group tbl" id="logtbl${snapshot.key}" align="left" style="border: 2px solid gray; padding: 10px;">
// //                 <div >
// //                   <table>
// //                     <caption></caption>
// //                     <thead>
// //                       <tr>
// //                         <th></th>
// //                         <th>Details</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       <tr>
// //                         <td>Error Id</td>
// //                         <td style="background-color: white;" class ="logID"id="logID${snapshot.key}">${snapshot.key}</td>
// //                       </tr>
// //                       <tr>
// //                         <td>Tester</td>
// //                         <td style="background-color: white;">${snapshot.val()['tester']}</td>
// //                       </tr>
// //                       <tr>
// //                         <td>Description</td>
// //                         <td style="background-color: white;" class="descComment" id="descComment${snapshot.key}">${snapshot.val()['description']} <br/><br/>
// //                         <a id="h${snapshot.key}" href="${snapshot.val()['canvas']}" target="_blank"><img id="img${snapshot.key}" style="max-width:950px; min-width:0px;" class="img-fluid" src="${snapshot.val()['canvas']}" alt=""> </a> 
// //                         </td>
// //                       </tr>
// //                       <div align="middle">
// //                       <table style="margin-top: 4%;" width="800px" class="commentTbl" id="${snapshot.key}">
// //                         <tbody>
// //                         </tbody>
// //                       </table>
// //                     </tbody>
// //                   </table>
// //                   </div>
// //                   <div class="form-group">
// //                     <label>Comment</label>
// //                     <textarea class="form-control" rows="3" style="resize: none;" width="800px"></textarea>
// //                     <button type="submit" id="comment142" class="btn btn-primary submitComment" style="float:right; margin-top: 2px;">Add comment</button>
// //                   </div>
// //                 </div>
// //               </div>`)




// // })



// })


                            




}


function commentLoaded (id) {




//   setTimeout(function() {
//      database.ref('LogsComments/'+id).once("value",function(snapshot) {
//           snapshot.forEach( function(element, index) {
//             $(`#${element.key}`).html("")

//              database.ref('LogsComments/'+id+'/'+element.key).on('child_removed',function(snap2) {
//                         $(`#${snap2.key}`).hide('slow/400/fast', function() {
//                               $(`#${element.key} > tbody > #${snap2.key}`).remove()
//                                                       });
//                       })

//           });

// }) 
//   }, 500);



            //    database.ref('LogsComments/'+id).on('value',function(snap2) {
            //     console.log(snap2.key)
            //   if(snap2.val()['name'] == localStorage.getItem("Tester")){
            //   $(`#${element.key}`).append(`<tr id ="${snap2.key}">
            // <td style="background-color: skyblue;font-size: 10px;width:20%;">
            // ${snap2.val()['name']}
            // </td>
            // <td style="width:80%;background-color:white;white-space: pre-wrap;">${snap2.val()['comment']}</td>
            // <td ><div><button class="btn btn-sm btn-info editComment" data-toggle="modal" data-target="#editModal" style="float:right;">Edit</button>
            // <button class="btn btn-sm btn-danger delComment"  id="delComment" style="float:right;">Delete</button></div></tr>`)
            //   }
            //   else{
            // $(`#${element.key}`).append(`<tr id ="${snap2.key}" >
            // <td style="background-color: skyblue;font-size: 10px;width:20%;">
            // ${snap2.val()['name']}
            // </td>
            // <td style="width:80%;background-color:skyblue;white-space: pre-wrap;">${snap2.val()['comment']}</td>
            // <td><div><button class="btn btn-sm btn-info  " disabled   style="float:right;">Edit</button>
            // <button class="btn btn-sm btn-danger  " disabled  id="" style="float:right;">Delete</button></div></td></tr>`)
            //   }


            //  })


}