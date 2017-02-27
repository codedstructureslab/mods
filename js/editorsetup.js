function loaded(){
	var mod = window.mod
	var target = "*"
	var fontsize = 15

	var editor = ace.edit('edit_module_text');
		editor.getSession().setUseWorker(false);
		editor.setTheme('ace/theme/dreamweaver');
		editor.getSession().setMode('ace/mode/javascript');
		editor.setValue(window.mod.dataset.definition)
		editor.setFontSize(fontsize)
		editor.clearSelection()

	var file = document.getElementById('edit_module_file')
	file.addEventListener('change',function() {
	      edit_module_read_handler()
	      })
	function edit_module_read_handler() {
	   var file = document.getElementById('edit_module_file')
	   var file_reader = new FileReader()
	   file_reader.onload = edit_module_load_handler
	   file_reader.readAsText(file.files[0])
	   }
	function edit_module_load_handler(event) {
	   str = event.target.result
	   var text = document.getElementById('edit_module_text')
	   editor.setValue(str)
	   mod.dataset.definition = str
	   var message = mod.outerHTML
	   window.opener.postMessage(message,window.source)
	   window.close()
	   }

    var btn = document.getElementById('update_close_btn')
	btn.addEventListener('click',function(){
		mod.dataset.definition = editor.getValue()
		var message = mod.outerHTML
		var tor = window.opener.location.origin
		if(tor == 'null'){
			tor = "*"
		}
		window.opener.postMessage(message,tor)
		window.close()
		})      
	var btn = document.getElementById('update_btn')
    btn.addEventListener('click',function(){
        mod.dataset.definition = editor.getValue()
		var message = mod.outerHTML
		var tor = window.opener.location.origin
		if(tor == 'null'){
			tor = "*"
		}
		window.opener.postMessage(message,tor)
        })

	var btn = document.getElementById('close_btn')
	btn.addEventListener('click',function(){
	   window.close()
	   })

	var btn = document.getElementById('save_btn')
    btn.addEventListener('click',function(){
       var a = document.createElement('a')
       a.setAttribute('href','data:text/plain;charset=utf-8,'+
          encodeURIComponent(editor.getValue()))
       a.setAttribute('download',name)
       a.style.display = 'none'
       document.body.appendChild(a)
       a.click()
       document.body.removeChild(a)
       })

    var btn = document.getElementById('reload_btn')
    btn.addEventListener('click',function(){
       var file = document.getElementById('edit_module_file')
       file.value = null
       file.click()
       })

    var btn = document.getElementById('inc_font_btn')
    btn.addEventListener('click',function(){
       fontsize *= 1.2
       editor.setFontSize(fontsize)
	   })
    var btn = document.getElementById('dec_font_btn')
    btn.addEventListener('click',function(){
       fontsize /= 1.2
       editor.setFontSize(fontsize)
	   })

    var isCtrl = false;
    var isShift = false;
	document.onkeyup=function(e) {
		if(e.which == 17) isCtrl=false;
		if(e.which == 16) isShift=false;
		}
	document.onkeydown=function(e){

		if(e.which == 16) isShift=true;
		if(e.which == 17) isCtrl=true;
		if(e.which == 83 && isCtrl == true) {
		     var btn = document.getElementById('save_btn')
		     btn.click()
			}
		if(e.which == 82 && isCtrl == true) {
		     var btn = document.getElementById('reload_btn')
		     btn.click()
			}
		if(e.which == 85 && isCtrl == true) {
			if(isShift == true){
		     	var btn = document.getElementById('update_close_btn')
		     	btn.click()
			}else{
		     	var btn = document.getElementById('update_btn')
		     	btn.click()
		 		}	
			}
		if(e.which == 27 && isCtrl == true) {
		     var btn = document.getElementById('close_btn')
		     btn.click()
			}
		if(e.which == 107 && isCtrl == true) {
		     var btn = document.getElementById('inc_font_btn')
		     btn.click()
			}
		if(e.which == 109 && isCtrl == true) {
		     var btn = document.getElementById('dec_font_btn')
		     btn.click()
			}
		}
}