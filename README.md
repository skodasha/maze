# maze

The maze is basically a field that consists of squares that can and cannot be walked on.
It's represented by an array of lines, each line is an array of cells.
A cell can be addressed as maze[lineIndex][columnIndex]. Coordinates start from the topleft cell { x: 0, y: 0 }.

One point at the edge is the entry point. In the example it's { x: 0, y: 3 } (line #4, column #1).
Any other point at the edge that can be reached by walking from the entry point, can be called an exit point.
The example maze has one exit at { x: 4, y: 0 }.

Function find all path of the maze and outputs as an array of arrays.
