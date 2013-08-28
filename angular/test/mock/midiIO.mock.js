'use strict';

// mocks of global objects
// 
var jsPlumb = {ready:function(callback){}};

var midiBridge = {init:function(callback){}};


var MIDIAccess = {
	enumerateInputs : function () {
		var inputs = [{
				deviceName: "input 1",
			},
			{
				deviceName: "input 2"
			}
		]
		return inputs;
	},
	enumerateOutputs : function () {
		var outputs = [{
				deviceName: "output 1",
			},
			{
				deviceName: "output 2"
			}
		]
		return outputs;
	},
}

//
//
//

var midiservicemock = {
        inputs:[{
                		name: "midi input 1",
                }],
        outputs:[]
    };

var note_on = {
			CMD:'NOTE_ON',
			CHAN:0,
			NOTE:63,
			VELOCITY:1,
			TIME:856523000
		};


var note_off = {
			CMD:'NOTE_OFF',
			CHAN:0,
			NOTE:63,
			VELOCITY:1,
			TIME:856523000
		};