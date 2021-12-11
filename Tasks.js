"use strict";

const testlib = require( './testlib.js' );
var previous;
var pattern;
var obj ={};
var counter;


testlib.on('ready',function(patterns) {
    console.log("It's about to start");
    console.log(patterns);
    pattern = patterns;
    pattern.forEach((item,index)=>{
        obj[item] = 0;
    })
    testlib.runTests();
});

testlib.on( 'data', function( data ) {
   
    let currentPattern = previous + data;
    counter++;
    //console.log(data);
    pattern.forEach((item,index,array)=>{
        if(currentPattern == item)
        {
            obj[item]++;
            console.log("The pattern, ",item, " is at ",counter);
        }
    })
    previous = data;
    if(data==null)
    {
        console.log("End of sequence");
    }
   
    
    
} );

testlib.on("reset",function(){

    counter =0;

});

testlib.on("end",function(){

    testlib.frequencyTable(obj);
});

testlib.setup(2,0);