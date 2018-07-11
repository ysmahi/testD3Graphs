let dataTest = [
  {
    "AppName": "App1",
    "Branch": "Finance",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App1",
    "Branch": "Finance",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App1",
    "Branch": "Finance",
    "CompanyBrand": "Brand3"
  },

  {
    "AppName": "App78",
    "Branch": "Finance",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App78",
    "Branch": "Finance",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App1",
    "Branch": "Tech",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App2",
    "Branch": "Finance",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App2",
    "Branch": "Finance",
    "CompanyBrand": "Brand2"
  },{
    "AppName": "App2",
    "Branch": "Finance",
    "CompanyBrand": "Brand4"
  },
  {
    "AppName": "App2",
    "Branch": "Finance",
    "CompanyBrand": "Brand5"
  },
  {
    "AppName": "App6",
    "Branch": "Tech",
    "CompanyBrand": "Brand3"
  },
  {
    "AppName": "App30",
    "Branch": "Tech",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App3",
    "Branch": "Tech",
    "CompanyBrand": "Brand3"
  },
  {
    "AppName": "App30",
    "Branch": "Tech",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App30",
    "Branch": "Tech",
    "CompanyBrand": "Brand3"
  },
  {
    "AppName": "App30",
    "Branch": "Tech",
    "CompanyBrand": "Brand4"
  },
  {
    "AppName": "App3",
    "Branch": "HR",
    "CompanyBrand": "Brand3"
  },  {
    "AppName": "App3",
    "Branch": "Sales",
    "CompanyBrand": "Brand3"
  },
  {
    "AppName": "App4",
    "Branch": "Sales",
    "CompanyBrand": "Brand4"
  },
  {
    "AppName": "App4",
    "Branch": "Sales",
    "CompanyBrand": "Brand5"
  },
  {
    "AppName": "App62",
    "Branch": "Sales",
    "CompanyBrand": "Brand4"
  },
  {
    "AppName": "App62",
    "Branch": "Sales",
    "CompanyBrand": "Brand5"
  },
  {
    "AppName": "App112",
    "Branch": "Sales",
    "CompanyBrand": "Brand4"
  },
  {
    "AppName": "App112",
    "Branch": "Sales",
    "CompanyBrand": "Brand5"
  },
  {
    "AppName": "App5",
    "Branch": "Finance",
    "CompanyBrand": "Brand5"
  },
  {
    "AppName": "App6",
    "Branch": "HR",
    "CompanyBrand": "Brand3"
  },
  {
    "AppName": "App7",
    "Branch": "Tech",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App8",
    "Branch": "Sales",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App8",
    "Branch": "HR",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App9",
    "Branch": "Finance",
    "CompanyBrand": "Brand3"
  },
  {
    "AppName": "App10",
    "Branch": "HR",
    "CompanyBrand": "Brand4"
  },
  {
    "AppName": "App10",
    "Branch": "HR",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App10",
    "Branch": "HR",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App10",
    "Branch": "HR",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App10",
    "Branch": "HR",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App10",
    "Branch": "HR",
    "CompanyBrand": "Brand6"
  },
  {
    "AppName": "App10b",
    "Branch": "HR",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App10b",
    "Branch": "HR",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App11",
    "Branch": "Tech",
    "CompanyBrand": "Brand5"
  },
  {
    "AppName": "App42",
    "Branch": "Tech",
    "CompanyBrand": "Brand5"
  },  {
    "AppName": "App43",
    "Branch": "Tech",
    "CompanyBrand": "Brand5"
  },  {
    "AppName": "App44",
    "Branch": "Tech",
    "CompanyBrand": "Brand5"
  },  {
    "AppName": "App45",
    "Branch": "Tech",
    "CompanyBrand": "Brand5"
  },{
    "AppName": "App47",
    "Branch": "Tech",
    "CompanyBrand": "Brand5"
  },
  {
    "AppName": "App12",
    "Branch": "Sales",
    "CompanyBrand": "Brand6"
  },
  {
    "AppName": "App13",
    "Branch": "Finance",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App14",
    "Branch": "HR",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App15",
    "Branch": "HR",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App16",
    "Branch": "HR",
    "CompanyBrand": "Brand6"
  },
  {
    "AppName": "App16",
    "Branch": "Finance",
    "CompanyBrand": "Brand6"
  }
]

let chartOptions = {
}

function getLowerLeftEmptyCell (selectionCellMatrix) {
  
}

function createGridChart(data, chartOptions) {
  let dimColumn = 'Branch';
  let dimRow = 'CompanyBrand';
  let dimElementInside = 'AppName'

  let divGridGraph = d3.select('body').append('div')
    .attr('class', 'gridGraph')

  /* Retrieve data from dataset */
  // Create columns' and rows' name arrays
  let columnsName = data.map(el => el[dimColumn]).filter((v, i, a) => a.indexOf(v) === i)
  let colNamesPlusEmpty = data.map(el => el[dimColumn]).filter((v, i, a) => a.indexOf(v) === i)
  colNamesPlusEmpty.unshift('')
  let rowsName = data.map(el => el[dimRow]).filter((v, i, a) => a.indexOf(v) === i)

  // Create dataset of elements that are on multiple dimensions
  let ElementInsideNames = data.map(el => el[dimElementInside]).filter((v, i, a) => a.indexOf(v) === i)


  let namesDataMultiple = data.map(el => el[dimElementInside])
    .filter((v, i, a) => !(a.indexOf(v) === i))
    .filter((v, i, a) => a.indexOf(v) === i)

  // Separation of vertical and horizontal elements
  let horizontalElementsData = []
  let verticalElementsData = []
  let singleElementsData = data.filter(el => namesDataMultiple.indexOf(el[dimElementInside]) === -1)
  namesDataMultiple.forEach(nameInsideElement => {
    let rowsData = []
    let rows = []
    data.filter(item => item[dimElementInside] === nameInsideElement)
      .forEach(el => {
        rows.push(el[dimRow])
        rowsData.push(el)
      })

    uniqueRowsName = rows.filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => {
        return rowsName.indexOf(a) - rowsName.indexOf(b)
      })

    uniqueRowsName.forEach(rowName => {
      let cols = []
      rowsData.filter(data => data[dimRow] === rowName)
        .forEach(el => {
          cols.push(el[dimColumn])
        })
      let nameUniqueCols = cols.filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => {
          return columnsName.indexOf(a) - columnsName.indexOf(b)
        })

      if (nameUniqueCols.length > 1) {
        let cs = [nameUniqueCols[0]]
        for (let l=1; l<nameUniqueCols.length; l++) {
          if (columnsName.indexOf(nameUniqueCols[l]) - columnsName.indexOf(nameUniqueCols[l - 1]) > 1) {
            // columns not next to each other
            if (cs.length > 1) {
              // element is on multiple columns next to each other
              horizontalElementsData.push({
                nameInsideElement: nameInsideElement,
                columnsName: cs,
                rowName: rowName
              })
            }
            else {
              let dataElement = {}
              dataElement[dimElementInside] = nameInsideElement
              dataElement[dimColumn] = cs[0]
              dataElement[dimRow] = rowName
              singleElementsData.push(dataElement)
            }
            cs = [nameUniqueCols[l]]
            if (l === nameUniqueCols.length - 1) {
              let dataElement = {}
              dataElement[dimElementInside] = nameInsideElement
              dataElement[dimColumn] = cs[0]
              dataElement[dimRow] = rowName
              singleElementsData.push(dataElement)
            }
          }
          else {
            cs.push(nameUniqueCols[l])
            if (l === nameUniqueCols.length - 1) {
              horizontalElementsData.push({
                nameInsideElement: nameInsideElement,
                columnsName: cs,
                rowName: rowName
              })
            }
          }
        }
      }
      else {
        let r = []
        let nameCol = nameUniqueCols[0]
        r = rowsData.filter(el => el[dimColumn] === nameCol)
          .map(el => el[dimRow])
          .filter((v, i, a) => a.indexOf(v) === i)
          .sort((a, b) => {
            return rowsName.indexOf(a) - rowsName.indexOf(b)
          })

        if (r.length > 1) {
          let rs = [r[0]]
          for (let l=1; l<r.length; l++) {
            if (rowsName.indexOf(r[l]) - rowsName.indexOf(r[l - 1]) > 1) {
              // rows not next to each other
              if (rs.length > 1) {
                // element is on multiple rows next to each other
                verticalElementsData.push({
                  nameInsideElement: nameInsideElement,
                  columnName: nameCol,
                  rowsName: rs
                })
              }
              else {
                let dataElement = {}
                dataElement[dimElementInside] = nameInsideElement
                dataElement[dimColumn] = nameCol
                dataElement[dimRow] = rs[0]

                // Check if element already in singleElementsData
                let stringSingElData = singleElementsData.map(el => JSON.stringify(el))
                if (stringSingElData.indexOf(JSON.stringify(dataElement)) === -1) {
                  singleElementsData.push(dataElement)
                }
              }
              rs = [r[l]]
              if (l === r.length - 1) {
                let dataElement = {}
                dataElement[dimElementInside] = nameInsideElement
                dataElement[dimColumn] = nameCol
                dataElement[dimRow] = rs[0]

                // Check if element already in singleElementsData
                let stringSingElData = singleElementsData.map(el => JSON.stringify(el))
                if (stringSingElData.indexOf(JSON.stringify(dataElement)) === -1) {
                  singleElementsData.push(dataElement)
                }
              }
            }
            else {
              rs.push(r[l])
              if (l === r.length - 1) {
                verticalElementsData.push({
                  nameInsideElement: nameInsideElement,
                  columnName: nameCol,
                  rowsName: rs
                })
              }
            }
          }
        }
        else {
          // those element's columns and rows are not next to each other
          // They will therefore be considered as two distinct elements
          let dataElement = {}
          dataElement[dimElementInside] = nameInsideElement
          dataElement[dimColumn] = nameCol
          dataElement[dimRow] = r[0]
          singleElementsData.push(dataElement)
        }
      }
    })
  })

  // Data multiple horizontal elements
  horizontalElementsData = horizontalElementsData.filter((v, i, fullTable) => {
    let stringifiedObjectsTable = fullTable.map(el => JSON.stringify(el))
    return stringifiedObjectsTable.indexOf(JSON.stringify(v)) === i
  })
  // Data multiple vertical elements
  verticalElementsData = verticalElementsData.filter((v, i, fullTable) => {
    let stringifiedObjectsTable = fullTable.map(el => JSON.stringify(el))
    return stringifiedObjectsTable.indexOf(JSON.stringify(v)) === i
  })

  console.log('horiz', horizontalElementsData)
  console.log('vert', verticalElementsData)
  console.log('single', singleElementsData)

  // Create position data for grid
  let gridData = createGridData(rowsName.length + 1, columnsName.length + 1, 150, 150)
  // Append names of row and columns in data
  gridData[0].forEach((col, indexCol) => col.name = colNamesPlusEmpty[indexCol]) // name columns
  for(let i=1; i<gridData.length; i++) { // name rows
    let currentRow = gridData[i]
    currentRow[0].name = rowsName[i - 1]
  }

  for(let i=1; i<rowsName.length + 1; i++) {
    let currentRow = gridData[i]
    for (let j=0; j<columnsName.length; j++) {
      let currentCell = currentRow[j + 1]
      currentCell.rowName = rowsName[i - 1]
      currentCell.columnName = columnsName[j]
    }
  }

  console.log('gridData', gridData)

  /* Creation of the underneath grid */
  divGridGraph.append('div')
    .attr('id', 'grid')

  let grid = d3.select('#grid')
    .append('svg')
    .attr('width', '1000px')
    .attr('height', '1200px')

  // Create g for each row
  let row = grid.selectAll(".Row")
    .data(gridData)
    .enter()
    .append("g")
    .attr("class", "Row");

  // Create all cells
  let cell = row.selectAll(".Cell")
    .data(function(row) { return row; })
    .enter()
    .append('g')
    .attr('class', 'Cell')
    .attr('id', cell =>{
      let cellIsAnInsideCell = (cell.rowName && cell.columnName)

      if (cellIsAnInsideCell) return '' + cell.rowName + cell.columnName
      else return;
    })

  // Create rectangles for cells
  let rowIndex = 0
  cell.append("rect")
    .attr("class", (rect, i) => {
      let cellClass = 'insideTableRect'
      if (i%(columnsName.length + 1) === 0) {
        // Cell is row name
        cellClass = 'rowNameRect'
      }
      if (rowIndex === 0) {
        // Cell is column name
        cellClass = (i === 0)?'firstRect':'columnNameRect'
        rowIndex = (i === columnsName.length)?(rowIndex + 1):rowIndex
      }

      return cellClass
    })
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })

  // Adjust style of table
  d3.selectAll('.rowNameRect')
    .style('fill', '#668cff')
    .style('stroke', "#ffffff")

  d3.selectAll('.columnNameRect')
    .style('fill', '#668cff')
    .style('stroke', "#ffffff")

  d3.selectAll('.insideTableRect')
    .style('fill', '#d9d9d9')
    .style('stroke', "#ffffff")

  d3.selectAll('.firstRect')
    .style('opacity', '0')
    .style('filter', 'alpha(opacity=0)')

  // Append name of rows and columns
  cell.append('text')
    .attr('x', cell => cell.x + cell.width/2)
    .attr('y', cell => cell.y + cell.height/2)
    .attr("dy", ".35em")
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .style('font-weight', 'bold')
    .text(cell => {
      if (cell.hasOwnProperty('name')) {
        return cell.name
      }
    })

  /* Create superimposed svg elements */
  // Calculation of max horizontal elements in the same cell
  let matrixVertEl = new Array(rowsName.length).fill().map(() => {
    return new Array(columnsName.length)
      .fill()
      .map(() => [0])
  })

  verticalElementsData.forEach(el => {
    el.rowsName.forEach(rowName => {
      matrixVertEl[rowsName.indexOf(rowName)][columnsName.indexOf(el.columnName)] = parseInt(matrixVertEl[rowsName.indexOf(rowName)][columnsName.indexOf(el.columnName)]) + 1
    })
  })

  let matrixHorizEl = new Array(rowsName.length).fill().map(() => {
    return new Array(columnsName.length)
      .fill()
      .map(() => [0])
  })

  horizontalElementsData.forEach(el => {
    el.columnsName.forEach(colName => {
      matrixHorizEl[rowsName.indexOf(el.rowName)][columnsName.indexOf(colName)] = parseInt(matrixHorizEl[rowsName.indexOf(el.rowName)][columnsName.indexOf(colName)]) + 1
    })
  })

  let maxCellHeight = Math.max(...matrixHorizEl.map(el => Math.max(...el))) + 1
  let maxCellWidth = Math.max(...matrixVertEl.map(el => Math.max(...el))) + 1
  let maxElementInCell = maxCellWidth * maxCellHeight

  console.log('maxCellWidth', maxCellWidth)
  console.log('maxVertElements', maxCellHeight)

  // Drawing of vertical elements and creating
  draw(verticalElementsData)
  draw(horizontalElementsData)

  drawSingle(singleElementsData)

  // function that creates a grid
// http://www.cagrimmett.com/til/2016/08/17/d3-lets-make-a-grid.html
  function createGridData (numberRow, numberColumn, cellWidth, cellHeight) {
    let data = [];
    let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    let ypos = 1;
    let width = cellWidth;
    let height = cellHeight;

    // iterate for rows
    for (let row = 0; row < numberRow; row++) {
      data.push( [] );

      // iterate for cells/columns inside rows
      for (let column = 0; column < numberColumn; column++) {
        data[row].push({
          x: xpos,
          y: ypos,
          width: width,
          height: height
        })
        // increment the x position. I.e. move it over by width (width variable)
        xpos += width;
      }
      // reset the x position after a row is complete
      xpos = 1;
      // increment the y position for the next row. Move it down by height (height variable)
      ypos += height;
    }
    return data;
  }

  function getCellMatrix (selection, id, horizElements, totalElements) {
    let matrix = new Array(Math.trunc(totalElements/horizElements)).fill().map(el => [])
    selection.select(id).selectAll('svg')
      .each(function (svg, i) {
        let selSvg = d3.select(this)
        matrix[Math.trunc(i/horizElements)][i%horizElements] = selSvg
      })

    return matrix
  }

  /* Create an array of objects, each one of them contains all the data necessary to define an element visually  */
  function createElementsPositionData (elementsData) {

    let dataElements = []
    let smallMove = 0
    let elementIsSingle

    elementsData.forEach(element => {
      let elementIsVertical = (element.hasOwnProperty('rowsName'))
      elementIsSingle = (!element.hasOwnProperty('rowsName') && !element.hasOwnProperty('columnsName'))

      let idCellBeginning = (elementIsSingle)?'#' + element[dimRow] + element[dimColumn]:
        (elementIsVertical)?
        '#' + element.rowsName[0] + element.columnName:
        '#' + element.rowName + element.columnsName[0]

      let cellBeginning = grid.select(idCellBeginning)
      let xBeginning = cellBeginning.datum().x
      let yBeginning = cellBeginning.datum().y

      let idCellEnd = (elementIsSingle)?'#' + element[dimRow] + element[dimColumn]:
        (elementIsVertical)?
        '#' + element.rowsName[element.rowsName.length - 1] + element.columnName:
        '#' + element.rowName + element.columnsName[element.columnsName.length - 1]

      let cellEnd = grid.select(idCellEnd)
      let xEnd = cellEnd.datum().x
      let yEnd = cellEnd.datum().y
      let cellWidth = cellEnd.datum().width
      let cellHeight = cellEnd.datum().height

      let radiusElement = (elementIsSingle)?20:0

      let xCenter = xBeginning + cellWidth / 2
      let yCenter = yBeginning + cellHeight / 2

      let widthElement = (elementIsVertical)?
        cellWidth / 3:
        xEnd - xBeginning + cellWidth

      let heightElement = (elementIsVertical)?
        yEnd - yBeginning + cellHeight:
        cellHeight / 3

      dataElements.push({
        idealX: (elementIsSingle)?xCenter:(elementIsVertical)?xBeginning + widthElement:xBeginning,
        idealY: (elementIsSingle)?yCenter:(elementIsVertical)?yBeginning:yBeginning + heightElement,
        x: (elementIsVertical)?xBeginning + smallMove:xBeginning,
        y: (elementIsVertical)?yBeginning:yBeginning + smallMove,
        size: [widthElement, heightElement],
        radius: radiusElement,
        nameInsideElement: (elementIsSingle)?element[dimElementInside]:element.nameInsideElement,
        colorElement: (elementIsSingle)?'skyblue':(elementIsVertical)?'red':'green'
      })

      // smallMove is used so that no elements are exactly at the same position so that tick() works
      smallMove++
    })

    // Changes rectangles position so there is no overlapping and each element is on one row or one column
    let formOfElement = (elementIsSingle)?'circles':'rectangles'
    moveToRightPlace(dataElements, formOfElement)

    return dataElements
  }

  /* Function to draw all elements on the graph */
  function draw(elementsData) {
    let dataElements = createElementsPositionData(elementsData)

    let elementsSpace = grid.append('svg')
      .attr('class', 'superimposedElementsSpace')

    dataElements.forEach(rectangle => {
      let elementSelection = elementsSpace.append('g')
        .attr('class', 'element')

      elementSelection.append('rect')
        .attr('x', rectangle.x)
        .attr('y', rectangle.y)
        .attr('width', rectangle.size[0])
        .attr('height', rectangle.size[1])
        .style('fill', rectangle.colorElement)
        .attr('class', rectangle.nameInsideElement)
        .style('stroke', 'black')

      elementSelection.append('text')
        .attr('x', rectangle.x + rectangle.size[0] / 2)
        .attr('y', rectangle.y + rectangle.size[1] / 2)
        .attr('dy', '.3em')
        .text(rectangle.nameInsideElement)
        .attr('text-anchor', 'middle')

    })
  }

  /* Draw single elements as circles on the graph */
  function drawSingle (dataElementsSingle) {
    let data = createElementsPositionData(dataElementsSingle)

    let elementsSpace = grid.append('svg')
      .attr('class', 'superimposedSingleElementsSpace')

    data.forEach(singleElement => {
      let elementSelection = elementsSpace.append('g')
        .attr('class', 'element')

      elementSelection.append('circle')
        .attr('cx', singleElement.x)
        .attr('cy', singleElement.y)
        .attr('r', singleElement.radius)
        .attr('fill', singleElement.colorElement)

      elementSelection.append('text')
        .attr('x', singleElement.x )
        .attr('y', singleElement.y )
        .attr('dy', '.3em')
        .text(singleElement.nameInsideElement)
        .attr('text-anchor', 'middle')
    })
  }

  /* Creates force simulation to avoid overlapping of elements
   * and a force simulation to ensure each element is not out of a row or a column */
  function moveToRightPlace (elementsData, formOfElement) {
    let elementsAreCircles = (formOfElement === 'circles')
    let elementsAreRectangles = (formOfElement === 'rectangles')

    let collisionForce
    if (elementsAreRectangles) collisionForce = rectCollide().size(rectangle => [rectangle.size[0], rectangle.size[1]])
    if (elementsAreCircles) collisionForce = d3.forceCollide().radius(circle => circle.radius)

    let simulation = d3.forceSimulation(elementsData)
      .force("x", d3.forceX(function(element) { return element.idealX }))
      .force("y", d3.forceY(function(element) { return element.idealY }))
      .force("collision", collisionForce)
      .stop()

    for (let i = 0; i < 200 ; ++i) simulation.tick()
  }

  function rectCollide() {
    let nodes, sizes, masses
    let size = constant([0, 0])
    let strength = 1
    let iterations = 1

    function force() {
      let node, size, mass, xi, yi
      let i = -1
      while (++i < iterations) { iterate() }

      function iterate() {
        let j = -1
        let tree = d3.quadtree(nodes, xCenter, yCenter).visitAfter(prepare)

        while (++j < nodes.length) {
          node = nodes[j]
          size = sizes[j]
          mass = masses[j]
          xi = xCenter(node)
          yi = yCenter(node)

          tree.visit(apply)
        }
      }

      function apply(quad, x0, y0, x1, y1) {
        let data = quad.data
        let xSize = (size[0] + quad.size[0]) / 2
        let ySize = (size[1] + quad.size[1]) / 2
        if (data) {
          if (data.index <= node.index) { return }

          let x = xi - xCenter(data)
          let y = yi - yCenter(data)
          let xd = Math.abs(x) - xSize
          let yd = Math.abs(y) - ySize

          if (xd < 0 && yd < 0) {
            let l = Math.sqrt(x * x + y * y)
            let m = masses[data.index] / (mass + masses[data.index])

            if (Math.abs(xd) < Math.abs(yd)) {
              node.vx -= (x *= xd / l * strength) * m
              data.vx += x * (1 - m)
            } else {
              node.vy -= (y *= yd / l * strength) * m
              data.vy += y * (1 - m)
            }
          }
        }

        return x0 > xi + xSize || y0 > yi + ySize ||
          x1 < xi - xSize || y1 < yi - ySize
      }

      function prepare(quad) {
        if (quad.data) {
          quad.size = sizes[quad.data.index]
        } else {
          quad.size = [0, 0]
          let i = -1
          while (++i < 4) {
            if (quad[i] && quad[i].size) {
              quad.size[0] = Math.max(quad.size[0], quad[i].size[0])
              quad.size[1] = Math.max(quad.size[1], quad[i].size[1])
            }
          }
        }
      }
    }

    function xCenter(d) { return d.x + d.vx + sizes[d.index][0] / 2 }
    function yCenter(d) { return d.y + d.vy + sizes[d.index][1] / 2 }

    force.initialize = function (_) {
      sizes = (nodes = _).map(size)
      masses = sizes.map(function (d) { return d[0] * d[1] })
    }

    force.size = function (_) {
      return (arguments.length
        ? (size = typeof _ === 'function' ? _ : constant(_), force)
        : size)
    }

    force.strength = function (_) {
      return (arguments.length ? (strength = +_, force) : strength)
    }

    force.iterations = function (_) {
      return (arguments.length ? (iterations = +_, force) : iterations)
    }

    return force
  }

  function boundedBox() {
    let nodes, sizes
    let bounds
    let size = constant([0, 0])

    function force() {
      let node, size
      let xi, x0, x1, yi, y0, y1
      let i = -1
      while (++i < nodes.length) {
        node = nodes[i]
        size = sizes[i]
        xi = node.x + node.vx
        x0 = bounds[0][0] - xi
        x1 = bounds[1][0] - (xi + size[0])
        yi = node.y + node.vy
        y0 = bounds[0][1] - yi
        y1 = bounds[1][1] - (yi + size[1])
        if (x0 > 0 || x1 < 0) {
          node.x += node.vx
          node.vx = -node.vx
          if (node.vx < x0) { node.x += x0 - node.vx }
          if (node.vx > x1) { node.x += x1 - node.vx }
        }
        if (y0 > 0 || y1 < 0) {
          node.y += node.vy
          node.vy = -node.vy
          if (node.vy < y0) { node.vy += y0 - node.vy }
          if (node.vy > y1) { node.vy += y1 - node.vy }
        }
      }
    }

    force.initialize = function (_) {
      sizes = (nodes = _).map(size)
    }

    force.bounds = function (_) {
      return (arguments.length ? (bounds = _, force) : bounds)
    }

    force.size = function (_) {
      return (arguments.length
        ? (size = typeof _ === 'function' ? _ : constant(_), force)
        : size)
    }

    return force
  }

  function constant(_) {
    return function () { return _ }
  }
}

createGridChart(dataTest, chartOptions)