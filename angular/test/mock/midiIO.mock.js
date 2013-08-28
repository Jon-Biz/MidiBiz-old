'use strict';

var midiservicemock = {
        inputs:[{
                		name: "midi input 1",
                }],
        outputs:[]
    };

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

var jsPlumb = {ready:function(callback){}};

var midiBridge = {init:function(callback){}};