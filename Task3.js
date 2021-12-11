"use strict";

const testlib = require( './testlib.js' );
var previous;
var pattern;
var obj ={};
var counter;
const buffer = [];
var longestPattern =0;


testlib.on('ready',function(patterns) {
    console.log("It's about to start");
    //console.log(patterns);
    pattern = patterns;
    pattern.forEach((item,index)=>{
        if(item.length > longestPattern)
        {
            longestPattern = item.length;
        }
        obj[item] = 0;
    })

    //console.log(longestPattern);
    //console.log(obj);
    testlib.runTests();
});


testlib.on('data',function(data) {

    
    counter++;
   buffer.push(data);
    var string ="";
    var tempBuffer = buffer;

    pattern.forEach((item,index,array)=>{
        var long = item.length;
        var comparison = tempBuffer.slice(-long).join("");
        if(comparison == item)
        {
            obj[item]++;
            console.log("Great success")
        }
        
    })

    //console.log(buffer + " counter is ",counter);

});

testlib.on('reset',function(patterns) {

    counter =0;

});


testlib.on("end",function(){

    testlib.frequencyTable(obj);
});

testlib.setup(2,0);