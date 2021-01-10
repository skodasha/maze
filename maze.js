const X = 'wall'
const _ = ' '

let maze = [
    [X, X, X, X, _, X, X, X, X],
    [X, _, X, _, _, X, _, _, X],
    [X, _, X, X, _, X, _, X, X],
    [_, _, X, _, _, _, _, X, _],
    [X, _, X, _, X, _, X, X, X],
    [X, _, _, _, X, _, _, _, X],
    [X, X, X, X, X, X, X, _, X],
]

/* get all the maze path */
function getAllMazePath(maze, start) {
    let exits = getExits(maze).filter(item => item.x != start.x && item.y != start.y)
    let result = []
    maze = fillMaze(maze, start)
    
    for (let i = 0; i < exits.length; i++) {
        result.push(getPath(maze, exits[i]))
    }
   
    return result.filter(item => item.length > 1).map(item => item.reverse())
}

/* filling with numbers the math;
   each next pass has greater value */
function fillMaze(maze, start) {
    let { x, y } = start
    let height = maze.length
    let width = maze[0].length
    let queue = [x, y]
    maze[x][y] = '1'
       
    while (queue.length != 0) {
        x = queue.shift()
        y = queue.shift()
        let value = parseInt(maze[x][y])

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((Math.abs(i) == Math.abs(j)) || (x + i < 0) || (x + i >= height) || (y + j < 0) || (y + j >= width)) 
                    continue
                if (maze[x + i][y + j] == _) {
                    maze[x + i][y + j] = (value + 1).toString()
                    queue.push(x + i)
                    queue.push(y + j)
                }
            }
        }
    }
    return maze
}

/* get all exits of maze */
function getExits(maze) {
    let result = []

    for(let i = 0; i < maze.length; i++) {
        if(maze[i][0] == _)
            result.push({x: i, y: 0})

        if(maze[i][maze[0].length - 1] == _)
            result.push({x: i, y: maze[0].length - 1})
    }
    
    for(let j = 0; j < maze[0].length; j++) {
        if(maze[0][j] == _)
            result.push({x: 0, y: j})

        if(maze[maze.length - 1][j] == _)
            result.push({x: maze.length - 1, y: j})
    }

    return result
}

/* get one of the paths of maze */
function getPath(maze, exit) {
    let height = maze.length
    let width = maze[0].length
    let { x, y } = exit
    let result = []
    
    result.push(exit)    
    let value = parseInt(maze[x][y])
    
    while (value > 1) {   
        let isOut = false

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (Math.abs(i) == Math.abs(j) || (x + i < 0) || (x + i >= height) || (y + j < 0) || (y + j >= width))
                    continue

                if (maze[x + i][y + j] == (value - 1).toString()) {
                    x = x + i
                    y = y + j
                    value = parseInt( maze[x][y])
                    result.push({x, y})
                    isOut = true
                    break
                }

            }
            if (isOut) 
                break
        }
    }

    return(result)
}

console.log(getAllMazePath(maze, {x: 0, y: 4}))
