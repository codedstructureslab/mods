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
  counter: 0,
  data:[
          ['Time', 'Current']
       ],
  options:{
            title: 'Current Draw',
            hAxis: {title: 'Time', minValue: 0, maxValue: 15},
            vAxis: {title: 'Current (A)', minValue: 0, maxValue: 15},
            legend: 'none'
          }
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
  data:{
    type:'data',
    event:function(evt){
      console.log(evt)
        outarr = [mod.counter]
        evt.detail.forEach(function(entry){
          outarr.push(parseInt(entry))
        })
       mod.data.push(outarr)
       mod.counter++
       plotChart()
       outputs.output.event()
       }
    },
  options:{
    type:'str',
    event:function(evt){

      }
    } 
  }

//
// outputs
//
var outputs = {
   output:{type:'string',
      event:function(){
         mods.output(mod,'output',mod.value)}}}
//
// interface
//

var interface = function(div){
  mod.div = div
  
  var canvas = document.createElement('canvas')
    canvas.width =500
    canvas.height =0
    canvas.style.backgroundColor = 'rgb(255,255,255)'
    div.appendChild(canvas)
  
  mod.subdiv = document.createElement('div')
    div.appendChild(mod.subdiv)

  google.charts.load('current', {'packages':['corechart']});      
  google.charts.setOnLoadCallback(plotChart);
   //

  var btn = document.createElement('button')
      btn.style.padding = mods.ui.padding
      btn.style.margin = 1
      btn.appendChild(document.createTextNode('view window'))
      btn.addEventListener('click',plotChart)
      div.appendChild(btn)
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
