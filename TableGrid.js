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
    "AppName": "App6",
    "Branch": "Tech",
    "CompanyBrand": "Brand3"
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
    "AppName": "App30",
    "Branch": "Tech",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App2",
    "Branch": "Finance",
    "CompanyBrand": "Brand2"
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
        horizontalElementsData.push({
          nameInsideElement: nameInsideElement,
          columnsName: nameUniqueCols,
          rowName: rowName
        })
      }
      else {
        let r = []
        let nameCol = nameUniqueCols[0]
        r = rowsData.filter(el => el[dimColumn] === nameCol)
          .map(el => el[dimRow])
          .sort((a, b) => {
            return rowsName.indexOf(a) - rowsName.indexOf(b)
          })

        if (r.length > 1) {
          verticalElementsData.push({
            nameInsideElement: nameInsideElement,
            columnName: nameCol,
            rowsName: r
          })
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
  var cell = row.selectAll(".Cell")
    .data(function(row) { return row; })
    .enter()
    .append('g')
    .attr('class', 'Cell')

  // Create rectangles for cells
    cell.append("rect")
    .attr("class","Rect")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })
    .style("fill", "#fff")
    .style("stroke", "#222");

  // Append name of rows and columns
    cell.append('text')
    .attr('x', cell => cell.x + cell.width/2)
    .attr('y', cell => cell.y + cell.height/2)
    .attr("dy", ".35em")
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
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

  // Create a g for each cell (inCell is in front of cell, same size)
  inCell = cell.append('g')
    .attr('class', 'InCell')
    .attr('id', inCell => {
      if (typeof inCell.rowName !== 'undefined') {
        return '' + inCell.rowName + inCell.columnName
      }
    })

  // Create a grid of <svg> to be later usable to put elements inside
  inCell.selectAll('svg')
    .data(inCell => {
      let posSvg = []
      for(let i=0; i<maxElementInCell; i++) {
        posSvg[i] = {x: inCell.x + (i%maxCellWidth)*(inCell.width/maxCellWidth),
        y: inCell.y + (Math.trunc(i/maxCellWidth))*(inCell.height/maxCellHeight),
        width: inCell.width/maxCellWidth,
        height: inCell.height/maxCellHeight,
        posInCell: i,
        rowName: inCell.rowName,
        columnName: inCell.columnName}
      }
      return posSvg
    })
    .enter()
    .append ('svg')
    .attr('isEmpty', 'true')

  // Create element inside for each item of dataset that is on more than a dimension
  verticalElementsData.forEach(vertEl => {

    let vValue = 0
    let hValue = 0
    vertEl.rowsName.forEach(function (row, i, allRows) {
      if (i === 0) {
        // Create top of element in the upper row
        let matrixSelectionUpperSvg = getCellMatrix(grid,
          '#' + vertEl.rowsName[i] + vertEl.columnName,
          maxCellWidth,
          maxElementInCell)
        // get left lower part of the cell
        for (var v = 0; v < maxCellHeight; v++) {
          for (var h = 0; h < maxCellWidth; h++) {
            if (matrixSelectionUpperSvg[v][h].attr('isEmpty') === 'true') {
              if ((h < hValue && v === vValue) || v > vValue) {
                hValue = h
                vValue = v
              }
            }
          }
        }

        // Create top of element
        matrixSelectionUpperSvg[vValue][hValue].append('rect')
          .attr('x', svg => svg.x)
          .attr('y', svg => svg.y + svg.height / 2)
          .attr('width', svg => svg.width)
          .attr('height', svg => svg.height / 2 + 3)
          .style('fill', "red")

        matrixSelectionUpperSvg[vValue][hValue].append('circle')
          .attr('cx', svg => svg.x + svg.width / 2)
          .attr('cy', svg => svg.y + svg.height / 2)
          .attr('r', svg => svg.width / 2)
          .attr('fill', 'red')

        matrixSelectionUpperSvg[vValue][hValue].attr('isEmpty', 'false')
      }

      else if (i>0 && i !== allRows.length -1) {
        // Create Middle parts of the element
        let matrixSelectionMiddleSvg = getCellMatrix(grid,
          '#' + vertEl.rowsName[i] + vertEl.columnName,
          maxCellWidth,
          maxElementInCell)

        for (let v=0; v<maxCellHeight; v++) {
          // Create the body of the element on each row of the cell
          matrixSelectionMiddleSvg[v][hValue].append('rect')
            .attr('x', svg => svg.x)
            .attr('y', svg => svg.y)
            .attr('width', svg => svg.width)
            .attr('height', svg => svg.height + 3)
            .style('fill', "red")

          matrixSelectionMiddleSvg[v][hValue].attr('isEmpty', 'false')
        }

        // Append name of vertical element
        let isEven = (maxCellHeight%2 === 0)?true:false
        matrixSelectionMiddleSvg[Math.trunc(maxCellHeight/2)][hValue].append('text')
          .attr('x', svg => svg.x + svg.width/2)
          .attr('y', svg => {
            return isEven?svg.y:(svg.y + svg.height/2)
          })
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'central')
          .text(vertEl.nameInsideElement)
      }

      else if (i === allRows.length -1) {
        // Create the lower part of the element in the lower row
        let matrixSelectionLowerSvg = getCellMatrix(grid,
          '#' + vertEl.rowsName[i] + vertEl.columnName,
          maxCellWidth,
          maxElementInCell)

        // Create top of element
        matrixSelectionLowerSvg[0][hValue].append('rect')
          .attr('x', svg => svg.x)
          .attr('y', svg => svg.y)
          .attr('width', svg => svg.width)
          .attr('height', svg => svg.height / 2)
          .style('fill', "red")

        matrixSelectionLowerSvg[0][hValue].append('circle')
          .attr('cx', svg => svg.x + svg.width / 2)
          .attr('cy', svg => svg.y + svg.height / 2)
          .attr('r', svg => svg.width / 2)
          .attr('fill', 'red')

        matrixSelectionLowerSvg[0][hValue].attr('isEmpty', 'false')

        // Append name of element if it is a two rows element
        if (allRows.length === 2) {
          matrixSelectionLowerSvg[0][hValue].append('text')
            .attr('x', svg => svg.x + svg.width / 2)
            .attr('y', svg => svg.y)
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .text(vertEl.nameInsideElement)
        }
      }
    })
  })

  // Create horizontal elements
  horizontalElementsData.forEach(horizEl => {
    let vValue = 0
    let hValue = 0
    horizEl.columnsName.forEach(function (col, i, allColumns) {
      if (i === 0) {
        // Create left of element in the left column
        let matrixSelectionLeftSvg = getCellMatrix(grid,
          '#' + horizEl.rowName + horizEl.columnsName[i],
          maxCellWidth,
          maxElementInCell)
        // get right upper part of the cell
        for (var v = maxCellHeight - 1; v > -1; v--) {
          for (var h = maxCellWidth  - 1; h > -1; h--) {
            if (matrixSelectionLeftSvg[v][h].attr('isEmpty') === 'true') {
              if ((v < vValue && h === hValue) || h > hValue) {
                hValue = h
                vValue = v
              }
            }
          }
        }

        // Create left of element
        matrixSelectionLeftSvg[vValue][hValue].append('rect')
          .attr('x', svg => svg.x)
          .attr('y', svg => svg.y)
          .attr('width', svg => svg.width + 3)
          .attr('height', svg => svg.height)
          .style('fill', "green")

        matrixSelectionLeftSvg[vValue][hValue].attr('isEmpty', 'false')
      }

      else if (i>0 && i !== allColumns.length -1) {
        // Create Middle parts of the element
        let matrixSelectionMiddleSvg = getCellMatrix(grid,
          '#' + horizEl.rowName + horizEl.columnsName[i],
          maxCellWidth,
          maxElementInCell)

        for (let h=0; h<maxCellWidth; h++) {
          // Create the body of the element on each row of the cell
          matrixSelectionMiddleSvg[vValue][h].append('rect')
            .attr('x', svg => svg.x)
            .attr('y', svg => svg.y)
            .attr('width', svg => svg.width + 3)
            .attr('height', svg => svg.height)
            .style('fill', "green")

          matrixSelectionMiddleSvg[vValue][h].attr('isEmpty', 'false')
        }

        // Append name of horizontal element
        let isEven = (maxCellWidth%2 === 0)?true:false
        matrixSelectionMiddleSvg[vValue][Math.trunc(maxCellWidth/2)].append('text')
          .attr('x', svg => {
            return (isEven)?svg.x:(svg.x + svg.width/2)
          })
          .attr('y', svg => svg.y + svg.height / 2)
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'central')
          .text(horizEl.nameInsideElement)
      }

      else if (i === allColumns.length -1) {
        // Create the right part of the element in the right column
        let matrixSelectionRightSvg = getCellMatrix(grid,
          '#' + horizEl.rowName + horizEl.columnsName[i],
          maxCellWidth,
          maxElementInCell)

        // Create top of element
        matrixSelectionRightSvg[vValue][0].append('rect')
          .attr('x', svg => svg.x)
          .attr('y', svg => svg.y)
          .attr('width', svg => svg.width)
          .attr('height', svg => svg.height)
          .style('fill', "green")

        matrixSelectionRightSvg[vValue][0].attr('isEmpty', 'false')

        // Append name of element if it is a two rows element
        if (allColumns.length === 2) {
          matrixSelectionRightSvg[vValue][0].append('text')
            .attr('x', svg => svg.x)
            .attr('y', svg => svg.y + svg.height / 2)
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .text(horizEl.nameInsideElement)
        }
      }
    })
  })

  // Create single elements
  singleElementsData.forEach((element, i) => {
    // TODO : here center single elements 1) collect all empty cells and indexes (i, j) of position of svg in cell
    // TODO : 2) calculate distance with centerpoint and minimize
    let matrixSelectionSvg = getCellMatrix(grid,
      '#' + element[dimRow] + element[dimColumn],
      maxCellWidth,
      maxElementInCell)

    let xCenter = maxCellWidth / 2
    let yCenter = maxCellHeight / 2
    let dist = Math.pow(Math.pow(xCenter, 2) + Math.pow(yCenter, 2), 0.5)
    let iRow = 0
    let jCol = 0

    matrixSelectionSvg.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.attr('isEmpty') === 'true') {
          if ((Math.pow(Math.pow(xCenter - j - 0.5, 2) + Math.pow(yCenter - i - 0.5, 2), 0.5)) < dist) {
            iRow = i
            jCol = j
            dist = Math.pow(Math.pow(xCenter - jCol - 0.5, 2) + Math.pow(yCenter - iRow - 0.5, 2), 0.5)
          }
        }
      })
    })

    matrixSelectionSvg[iRow][jCol].append('circle')
      .attr('cx', svg => svg.x + svg.width/2)
      .attr('cy', svg => svg.y + svg.height/2)
      .attr('r', svg => Math.min(svg.height/2, svg.width/2))
      .attr('fill', '#66ccff')

    matrixSelectionSvg[iRow][jCol].append('text')
      .attr('x', svg => svg.x + svg.width/2)
      .attr('y', svg => svg.y + svg.height/2)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .text(element[dimElementInside])

    matrixSelectionSvg[iRow][jCol].attr('isEmpty', 'false')
  })

  console.log('sel', getCellMatrix(grid, '#Brand1Finance', maxCellWidth, maxElementInCell))

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
}

createGridChart(dataTest, chartOptions)