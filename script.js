"use strict";
class SerialLEDController {
    constructor() {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
    }
    async init() {
        if ('serial' in navigator) {
            try {
                const port = await navigator.serial.requestPort();
                await port.open({ baudRate: 9600 });
                this.reader = port.readable.getReader();
                this.writer = port.writable.getWriter();
                let signals = await port.getSignals();
                console.log(signals);
            }
            catch (err) {
                console.error('There was an error opening the serial port:', err);
            }
        }
        else {
            console.error('Web serial doesn\'t seem to be enabled in your browser. Try enabling it by visiting:');
            console.error('chrome://flags/#enable-experimental-web-platform-features');
            console.error('opera://flags/#enable-experimental-web-platform-features');
            console.error('edge://flags/#enable-experimental-web-platform-features');
        }
    }
    async write(data) {
        const dataArrayBuffer = this.encoder.encode(data);
        return await this.writer.write(dataArrayBuffer);
    }
    async read() {
        try {
            const readerData = await this.reader.read();
            return this.decoder.decode(readerData.value);
        }
        catch (err) {
            const errorMessage = `error reading data: ${err}`;
            console.error(errorMessage);
            return errorMessage;
        }
    }
}
const serialLEDController = new SerialLEDController();
const serialMessagesContainer = document.getElementById('serial-messages-container');
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
function getEditorCode() {
  return editor.getValue()
}

if(editor.find('on')){
serialLEDController.write('1');
}
if(editor.find('off')){
serialLEDController.write('0');
}
if(editor.find('getSerialMessage()')){
console.log(getSerialMessage());
} 
function buttonclick() {
serialLEDController.init();

}
async function getSerialMessage() {
      serialMessagesContainer.innerText += await serialLEDController.read() + '\n';
}
// Get the modal
function buttonclick68() {
  var code = getEditorCode()
  removeUrl(url)
  url = createUrl(code)
  window.open(url);}
function download_txt() {
 var save = prompt("Save file as", "Mylaunch");
  var textToSave = editor.getValue() ;
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = save + ".txt";
  hiddenElement.click();
}
document.getElementById('test').addEventListener('click', download_txt);
document.getElementById('file-upload') 
            .addEventListener('change', function() { 
              
            var fr=new FileReader(); 
            fr.onload=function(){ 
                document.getElementById('output') 
                editor.setValue(fr.result); 
            } 
              
            fr.readAsText(this.files[0]); 
        }) 
