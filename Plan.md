a middly contains start code , an empty middlycollection, and end code

The start middly contains the input and output midi connections

Others are regular middlys that have a code sblock front and back (the back one is default == passthrough though)
a code block has input and output variables
it evals a string of data in the middle
it allows you to define input and outputs and keep as many as you want
there are two types of connections - midi and variables

the middlycollection keeps track of all the connections of the middlys inside it. It also records their position. 
Double clicking on a middly automatically opens the middly collection space of it.
addconnection(a1 to b3)
removeconnection(a1 to b3)
set position of middly
