'use strict';

var midiservicemock = {
        getInputs:function () {
        	var input = {
        		name: "midi input 1",
        	}
          return [input];
        },
        getOutputs:function () {
          return[];
    	}
    };