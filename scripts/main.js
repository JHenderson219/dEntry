//var tsv is the TSV file with headers
function tsvObj(tsv){
  var lines=tsv.split('\n');
 
  var result = [];
 
  var headers=lines[0].split('\t');
 
  for(var i=1;i<lines.length;i++){
 
	  var obj = {};
	  var currentline=lines[i].split('\t');
 
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
 
	  result.push(obj);
 
  }
  
  return result;
  //Thanks to iwek on GitHub for the initial idea for this code! github.com/iwek || https://gist.github.com/iwek/7154706
}

let headersSelectors = {};

$("#printFile").on("click", function(){
  let selectedRow = document.getElementById("rowSelector").value;
  let currentFile = document.getElementById("uploadedFile").files[0];
  if (currentFile){
    let reader = new FileReader();
    reader.readAsText(currentFile, "UTF-8");
    reader.onload = function (evt){
      let currentObj = tsvObj(evt.target.result);
      const headers = Object.keys(currentObj[0]);
      $("#printArea").empty()
      headers.map(function(e,i){
        $("#printArea").append("<br><p id='header"+i+"'>"+e+"</p>")
      });
      headers.map(function(e,i){
        let label=i+1;
        $("#header"+i).append("<br><label for='column"+label+"'>#"+label+"</label><input readonly class='selectBox' type='text' id='column"+i+"'value='"+currentObj[selectedRow][e]+"'>")
      });
      headers.map(function(e,i){
        headersSelectors[i+1]=e;
        console.log(headersSelectors);
      });
    }
  }
});
function doc_keyUp(e){
//  if(e.shiftKey)
}

document.onkeypress = function (e){
  e = e;
  let val = e.key;
  let tgt = val-1
  if(headersSelectors.hasOwnProperty(val)){
    console.log(val);
    $("#column"+tgt).focus().select();
  }
}