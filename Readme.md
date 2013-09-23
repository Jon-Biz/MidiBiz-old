MidiBiz 0.4
===========

Midi Biz is a midi-javascript streaming interface originally built on Backbone, and now ported to Angular. A recent version distribution version can be found being served here:

http://http://midibiz.elbizri.com/

MidiBiz requires the Java VM for hardware connectivity. Chrome is recommended - not much testing has been performed on other browser on this current version. Cross browser compatibility testing will come with the first point release.

MidiBiz incorporates a fork of Abudan's [java-based midi-javascript interface](https://github.com/abudaan/midibridge-js) to access the hardware. It initializes midi ports, and then accepts midi data stream, converting it into a [bacon.js](https://github.com/raimohanska/bacon.js) stream suitable for real-time manipulation in javascript.

Inputs, Outputs create a modular midi manipulation architecture that is intended to be easily stored and shared among users. Inputs and Outputs are fully functional, and can be attached to eachother, using an onscreen GUI. The framework is designed to allow the creation of javascript based widgets to modify the stream of data in real time, with latencies appropriate for real time music production. 

Additionally, the framework is designed to accept non-Midi based connections as Angular services, such as OSC, ZIPI or non-audio related stream functions. A websocket service module, for networked communication of streams, is in development.

It is early in this project, but since some people are already finding utility in this tool, so it seems it is time to share it.


Installation
------------

1. Launch the index.html file in the ``dist`` directory in a browser with the java JVM installed.
2. Connect inputs to outputs to map your midi instruments to the outputs you want to set up.
