//
// Chart Display
// Takes a datastream in, outputs a chart
// 
// This work may be reproduced, modified, distributed, performed, and 
// displayed for any purpose, but must acknowledge the mods
// project. Copyright is retained and must be preserved. The work is 
// provided as is; no warranty is provided, and users accept all 
// liability.
//
// closure
//

(function(){
//
// module globals
//
var mod = {
}

var input
//
// name
//
var name = 'Chart'
//
// initialization
//
var init = function() {
}

//
// inputs
//
var inputs = {
  input:{type:'data',
    event:function(evt){
      }
    }
  }
//
// outputs
//
var outputs = {
  output:{
    type:'int',
    event:function(){
      console.log(mod.value)
         mods.output(mod,'output',[mod.val.value])}
    }
  }
//
// interface
//

var interface = function(div){
  mod.div = div

  var input = document.createElement('input')
    input.type = 'text'
    input.size = 6
    input.value = 0
    mod.div.appendChild(input)
    mod.val = input

  var btn = document.createElement('button')
    btn.style.padding = mods.ui.padding
    btn.style.margin = 1
    btn.appendChild(document.createTextNode('send'))
    btn.addEventListener('click', outputs.output.event)
    mod.div.appendChild(btn)
  }

function plotChart(){
    chart_data = google.visualization.arrayToDataTable(mod.data);
    console.log(mod.data)

    mod.chart = new google.visualization.ScatterChart(mod.subdiv);

    mod.chart.draw(chart_data, mod.options);   
  }

//
// return values
//
return ({
   name:name,
   init:init,
   inputs:inputs,
   outputs:outputs,
   interface:interface
   })
}())
