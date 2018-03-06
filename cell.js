
Cell = function(x, y) {
  this.x = x
  this.y = y
  this.walls = [random([true, false, false, false]), random([true, false, false, false]), random([true, false, false, false]), random([true, false, false, false])]
  this.visited = false
  this.name = ""

  this.draw = function() {
    if(!walls_drawn){
      strokeWeight(2)
      stroke(0)
      if(this.walls[0]) {
        line((this.x * cell_size), (this.y * cell_size), ((this.x + 1) * cell_size), (this.y * cell_size)) //top
      }
      if(this.walls[1]) {
        line((this.x + 1) * cell_size, (this.y + 1) * cell_size, (this.x + 1) * cell_size, this.y * cell_size) //right
      }
      if(this.walls[2]) {
        line((this.x + 1) * cell_size, (this.y + 1) * cell_size, this.x * cell_size, (this.y + 1) * cell_size) //bottom
      }
      if(this.walls[3]) {
        line(this.x * cell_size, this.y * cell_size, this.x * cell_size, (this.y + 1) * cell_size)  //left
      }
    }
    if(this.visited) {
      noStroke()
      fill(255,255,0,50)
      rect((this.x * cell_size)+1, (this.y * cell_size)+1, cell_size-2, cell_size-2)
    }
  }
  this.neighbours = function() {
    var neighbor_cells = []
    var top_neighbor = grid[this.x + ((this.y - 1) * grid_width)]
    var right_neighbor = grid[(this.x + 1) + ((this.y) * grid_width)]
    var bottom_neighbor = grid[this.x + ((this.y + 1) * grid_width)]
    var left_neighbor = grid[(this.x - 1) + ((this.y) * grid_width)]
    if(top_neighbor && this.y > 0 && !this.walls[0] && !top_neighbor.walls[2] && !top_neighbor.visited) {
      neighbor_cells.push(top_neighbor)
    }
    if(right_neighbor && this.x < (grid_width-1) && right_neighbor && this.y < grid_width && !this.walls[1] && !right_neighbor.walls[3] && !right_neighbor.visited) {
      neighbor_cells.push(right_neighbor)
    }
    if(bottom_neighbor && this.y < (grid_height-1) && !this.walls[2] && !bottom_neighbor.walls[0] && !bottom_neighbor.visited) {
      neighbor_cells.push(bottom_neighbor)
    }
    if(left_neighbor && this.x > 0 && !this.walls[3] && !left_neighbor.walls[1] && !left_neighbor.visited) {
      neighbor_cells.push(left_neighbor)
    }
    return neighbor_cells
  }
}
