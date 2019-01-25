var imgsrc = ""
$(document).ready(function() {
function retrieveImageFromClipboardAsBlob(pasteEvent, callback){
    if(pasteEvent.clipboardData == false){
        if(typeof(callback) == "function"){
            callback(undefined);
        }
    };

    var items = pasteEvent.clipboardData.items;

    if(items == undefined){
        if(typeof(callback) == "function"){
            callback(undefined);
        }
    };

    for (var i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") == -1) continue;
        // Retrieve image on clipboard as blob
        var blob = items[i].getAsFile();
        if(typeof(callback) == "function"){
            callback(blob);
        }
    }
}    
setTimeout(function() {
window.addEventListener("paste", function(e){
    // Handle the event
    retrieveImageFromClipboardAsBlob(e, function(imageBlob){
        // If there's an image, display it in the canvas
        if(imageBlob){
            var canvas = document.getElementById("logCanvas");
            var canvashidden = document.getElementById("logCanvasHidden");
            var ctx = canvas.getContext('2d');
            var ctx2 = canvashidden.getContext('2d');
            // Create an image to render the blob on the canvas
            var img = new Image();
            var img2 = new Image();
            // Once the image loads, render the img on the canvas
            img.onload = function(){
                // Draw the image
                canvashidden.width = this.width;
                canvashidden.height = this.height;
                ctx2.drawImage(img2,0,0)
                ctx.drawImage(img,0,0,canvas.width,canvas.height);
            };
            // Crossbrowser support for URL
            var URLObj = window.URL || window.webkitURL;

            // Creates a DOMString containing a URL representing the object given in the parameter
            // namely the original Blob
            img.src = URLObj.createObjectURL(imageBlob);
            img2.src = URLObj.createObjectURL(imageBlob);
            imgsrc = imageBlob;
        }
    });


}, false);

}, 10);


});