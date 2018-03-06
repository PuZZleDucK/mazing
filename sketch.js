

var grid = []
var grid_height = 75
var grid_width = 160
var cell_size = 8
var spacing = 2
var start_cell
var end_cell
var finished = false
var current_cell
var options = []
var walls_drawn = false


function setup() {
  createCanvas(1300,630)
  background(210)
  for(var i = 0; i < grid_height; i++) {
    for(var j = 0; j < grid_width; j++) {
      grid.push(new Cell(j,i))
    }
  }
  while(start_cell == end_cell) {
    start_cell = random(grid)
    end_cell = random(grid)
  }
  end_cell.walls = [false, false, false, false]
  start_cell.walls = [false, false, false, false]
  current_cell = start_cell
}

function draw() {
  grid.forEach( x => x.draw())
  noStroke()
  fill(0,255,0)
  rect((start_cell.x * cell_size), (start_cell.y * cell_size), cell_size, cell_size)
  fill(255,0,0)
  rect((end_cell.x * cell_size), (end_cell.y * cell_size), cell_size, cell_size)
  if(!finished) {
    if(current_cell.x == end_cell.x && current_cell.y == end_cell.y){
      finished = true
    }
    current_cell.visited = true
    options = options.concat(current_cell.neighbours())
    fill(0,0,255)
    options.forEach(opt => {
      rect((opt.x * cell_size)+2, (opt.y * cell_size)+2, cell_size-4, cell_size-4)
    })
    walls_drawn = true

    // random search
    // index = floor(random(options.length-1))
    // selection = options[index]
    // options.splice(index, 1)
    // current_cell = selection || current_cell

    // depth first search
    // index = options.length-1
    // selection = options[index]
    // options.splice(index, 1)
    // current_cell = selection || current_cell

    // breadth first search
    // index = 0
    // selection = options[index]
    // options.splice(index, 1)
    // current_cell = selection || current_cell

    // as the crow flies metric
    options.sort((a, b)  => sqrt((a.x - end_cell.x) ** 2 + (a.y - end_cell.y) ** 2) - sqrt((b.x - end_cell.x) ** 2 + (b.y - end_cell.y) ** 2))
    index = 0
    selection = options[index]
    options.splice(index, 1)
    current_cell = selection || current_cell
    if(options.length == 0) {
      finished = true
    }
  } else {
    // reset
    finished = false
    walls_drawn = false
    options = []
    grid = []
    background(210)
    for(var i = 0; i < grid_height; i++) {
      for(var j = 0; j < grid_width; j++) {
        grid.push(new Cell(j,i))
      }
    }
    start_cell = random(grid)
    end_cell = random(grid)
    while(start_cell == end_cell) {
      start_cell = random(grid)
      end_cell = random(grid)
    }
    end_cell.walls = [false, false, false, false]
    start_cell.walls = [false, false, false, false]
    current_cell = start_cell
  }
}
