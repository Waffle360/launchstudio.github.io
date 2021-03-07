
var url = null
const editor = ace.edit('editor')
document.getElementById('editor').style.fontSize='16px';
editor.setTheme("ace/theme/monokai")

editor.session.setMode("ace/mode/html");
 
editor.setShowPrintMargin(false);
editor.renderer.setShowGutter(true);
editor.session.setUseWorker(false)
function createUrl(html) {
  var blob = new Blob([html], { type: 'text/html' })
  return URL.createObjectURL(blob)
}


function removeUrl(url) {
  URL.revokeObjectURL(url)
}
function getIframe() {
  var iframe = document.getElementById('iframe')
  return iframe
}

function setIframeUrl(url) {
  var iframe = getIframe()
  iframe.src = url
}

function getEditorCode() {
  return editor.getValue()
}

function buttonclick() {
  var code = getEditorCode()
  removeUrl(url)
  url = createUrl(code)
  setIframeUrl(url)
  
}
// Get the modal
function buttonclick68() {
  var code = getEditorCode()
  removeUrl(url)
  url = createUrl(code)
  window.open(url);
  
}
function download_txt() {
  var textToSave = getEditorCode() ;
  var hiddenElement = document.createElement('a');

  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'MyLaunch.html';
  hiddenElement.click();
}

document.getElementById('test').addEventListener('click', download_txt);


function buttonclick3() {
editor.setTheme("ace/theme/monokai") 
}
function buttonclick4() {
document.getElementById('editor').style.fontSize='12px';
}
function buttonclick5() {
document.getElementById('editor').style.fontSize='16px';
}
function buttonclick6() {
document.getElementById('editor').style.fontSize='18px';
}
function buttonclick7() {
document.getElementById('editor').style.fontSize='21px';
}
document.getElementById('file-upload') 
            .addEventListener('change', function() { 
              
            var fr=new FileReader(); 
            fr.onload=function(){ 
                document.getElementById('output') 
                editor.setValue(fr.result); 
            } 
              
            fr.readAsText(this.files[0]); 
        }) 
