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

    var string ="";
    counter++;
    if(buffer.length < 5)
    {
        buffer.push(data);
    }
    if(buffer.length == 5)
    {
        buffer.push(data);
        buffer.shift();
    }

    buffer.forEach((item,index,array)=>{

        string = string +item;
    })

    console.log(string + " counter is ",counter);

});

testlib.on('reset',function(patterns) {

    counter =0;

});


testlib.on("end",function(){

    testlib.frequencyTable(obj);
});

testlib.setup(1,0);