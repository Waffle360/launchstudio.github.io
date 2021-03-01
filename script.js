
var url = null
const editor = ace.edit('editor')
document.getElementById('editor').style.fontSize='18px';
editor.setTheme("ace/theme/monokai")

editor.session.setMode("ace/mode/html");
 
editor.setShowPrintMargin(true);
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
