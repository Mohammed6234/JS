"use strict";

const { Console } = require('console');
const testlib = require( './testlib.js' );

var pattern; //global array for patterns
var obj ={}; //to keep track of each instance of pattern
var counter; //for the sequence matching counter
var buffer = []; //for all the data in the file
var longestPattern =0; // for the longest length of pattern
const patternMap = new Map(); //to keep track of all the different combinations of patterns
const switchCharacters = {
    R: ['A','G'],
    Y: ['T','C'],
    K: ['G','T'],
    M: ['A','C'],
    S: ['G','C'],
    W: ['A','T'],
    B: ['G','T','C'],
    D: ['G','A','T'],
    H: ['A','C','T'],
    V: ['G','C','A'],
    N: ['A','G','C','T']
}; //obj for all the possible character combinations


/**
 * Makes the pattern a global variable and sets the longest pattern length
 * Also computes every possible pattern based on the characters that can be switched out
 * Called at the start of the program
 * Sets up the object to be passed into the frequency table at the end of each line
 */
testlib.on('ready',function(patterns) {
    console.log("It's about to start");
    pattern = patterns;
    pattern.forEach((item,index)=>{
        if(item.length > longestPattern)
        {
            longestPattern = item.length;
        }
        obj[item] = 0;
    }) 
    pattern.forEach((item,index)=>{
        patternMap.set(item,[]);
        addPattern(item,item);
        //addFirstLetterPatterns(item,item);
       
    })
    console.log(patternMap);
    testlib.runTests();
});

/**
 * 
 * @param {*} OGWord  Passes in the original word so it can be referenced when the pattern starts again
 * @param {*} word The word to be checked and a charcater replaced if needed
 * 
 * This recursive function takes a word from the pattern array, checks if it contains any charcaters that can be swapped out
 * If it can, it'll start a recursive algorithm where evry possible combination of charcaters will be added to that patterns map
 * Systematically goes through each possible combo
 */
function addPattern(OGWord,word)
{
    let wordArray = word.split("");
    wordArray.forEach((item,index)=>{
        var original = item;
        if(Object.keys(switchCharacters).includes(item) == true){
            switchCharacters[item].forEach((itemToSwap,indexToSwap)=>{
                var newArray = wordArray;
                newArray[index] = itemToSwap;
                let newWord = newArray.join("");
                if(patternMap.get(OGWord).includes(newWord) != true)
                    patternMap.get(OGWord).push(newWord);
                addPattern(OGWord,newWord);
            })
        }
        wordArray[index] = original;
    })
}

/**
 * Reads each charcater one by one, adds it into the buffer and then checks it against the patterns in the map
 * Checks against every possible combination of patterns possible
 * Also keeps track of when the pattern was found through the count variable
 * Increments pattern value by 1 when pattern match occurs. Not the combination version but the main original pattern
 */
testlib.on('data',function(data) {

   counter++;
   buffer.push(data);
    var string ="";
    var tempBuffer = buffer.slice(-longestPattern);
    
        pattern.forEach((item,index,array)=>{
            var long = item.length;
            var comparison = tempBuffer.slice(-long).join("");
            if(comparison == item)
            {
                obj[item]++;
                testlib.foundMatch(item,counter);
            }
            patternMap.get(item).forEach((itemNew,indexNew)=>{
               
                if(comparison == itemNew)
                {
                    obj[item]++;
                    testlib.foundMatch(item,counter);
                }
            })
        })

});


/**
 * Reset occurs at the end of every data line
 * Count gets reset 
 * Buffer also gets cleared. Speeds up process 
 */
testlib.on('reset',function() {
    testlib.frequencyTable(obj);
    buffer = [];
    if(pattern != undefined)
   {
       pattern.forEach((item,index)=>{
            obj[item] = 0;
       })
   }
    counter =0;
    
});

/**
 * Prints out frequency table for the final line
 */
testlib.on("end",function(){

    testlib.frequencyTable(obj);
});
/**
 * Sets up the file that you wanna check
 */
testlib.setup(3,0);