MidiBiz
=======

Midi Biz is a javascript-based midi stream manipulation and routing tool. It incorporates Abudan's [java-based midi-javascript interface](https://github.com/abudaan/midibridge-js). It initializes midi ports, and then accepts midi data stream, converting it into a [bacon.js](https://github.com/raimohanska/bacon.js) stream suitable for real-time manipulation in javascript.

Inputs, Outputs, and Plugins are all [backbone.js](http://documentcloud.github.com/backbone/) models, creating a modular midi manipulation architecture that can be stored and shared among users. Inputs and Outputs are fully functional, and can be attached to eachother, though the Interface has not been set up. It is early in this project, but since some people are already finding utility in this tool, so it seems it is time to share it.

Installation
------------

1. Select the apropriate midi connections, hard coded in the index.html file in the repository. 
2.Launch it in a browser with the JVM installed. Yes, I know this isn't so frequent these days. Yes, we are testing an alternative.
3. If you are successful, all your midi devices should have emitted a tone. Play on!
