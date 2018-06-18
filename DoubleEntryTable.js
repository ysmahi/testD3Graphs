/*****************************************************************************************
 @author: Arpit Narechania
 @email: arpitnarechania@gmail.com
 @project: d3-spotmatrix
 Copyright 2017 Arpit Narechania
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 OR OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************************/

 let dataset = [{
  "Dimensions": "Dimension 1",
  "Usable": 82,
  "Scalable": 32,
  "Flexible": 34,
  "Durable": 10,
  "Capable": 73,
  "Stable": 17
}, {
  "Dimensions": "Dimension 2",
  "Usable": 55,
  "Scalable": 12,
  "Flexible": 42,
  "Durable": 50,
  "Capable": 19,
  "Stable": 61
}, {
  "Dimensions": "Dimension 3",
  "Usable": 5,
  "Scalable": 32,
  "Flexible": 2,
  "Durable": 21,
  "Capable": 19,
  "Stable": 72
}, {
  "Dimensions": "Dimension 4",
  "Usable": 75,
  "Scalable": 32,
  "Flexible": 42,
  "Durable": 0,
  "Capable": 1,
  "Stable": 51
}]

let dataTest = [
  {
    "AppName": "App1",
    "Branch": "Finance",
    "CompanyBrand": "Brand1"
  },
  {
    "AppName": "App2",
    "Branch": "HR",
    "CompanyBrand": "Brand2"
  },
  {
    "AppName": "App3",
    "Branch": "Tech",
    "CompanyBrand": "Brand3"
  },
  {
    "AppName": "App4",
    "Branch": "Sales",
    "CompanyBrand": "Brand4"
  },
  {
    "AppName": "App5",
    "Branch": "Finance",
    "CompanyBrand": "Brand5"
  },
  {
    "AppName": "App6",
    "Branch": "HR",
    "CompanyBrand": "Brand6"
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
    "Branch": "Finance",
    "CompanyBrand": "Brand3"
  },
  {
    "AppName": "App16",
    "Branch": "HR",
    "CompanyBrand": "Brand6"
  }
]

let chartOptions = {
  spot_radius : 30,
  svg_inside_width: 60,
  svg_inside_height: 60,
  spot_cell_padding : 10,
  spot_cell_margin : 5,
  min_color : '#efefef',
  max_color : '#01579b',
  stroke_color : '#01579b',
  spot_matrix_type : 'ring'
}

function SpotMatrix(data, chartOptions) {
  let spotRadius = chartOptions.spot_radius;
  let svgInsideWidth = chartOptions.svg_inside_width;
  let svgInsideHeight = chartOptions.svg_inside_height;
  let minColor = chartOptions.min_color;
  let maxColor = chartOptions.max_color;
  let spotCellPadding = chartOptions.spot_cell_padding;
  let spotCellMargin = chartOptions.spot_cell_margin;
  let spotMatrixType = chartOptions.spot_matrix_type;
  let strokeColor = chartOptions.stroke_color;
  let dimColumn = 'Branch';
  let dimRows = 'CompanyBrand';
  let dimElementInside = 'AppName'

  if (isNaN(spotRadius) || spotRadius < 0) {
    throw new Error("Spot Radius must be a Positive Number");
  }

  if (isNaN(spotCellPadding) || spotCellPadding < 0) {
    throw new Error("Spot Cell Padding must be a Positive Number");
  }

  if (isNaN(spotCellMargin) || spotCellMargin < 0) {
    throw new Error("Spot Cell Margin must be a Positive Number");
  }

  if (!(spotMatrixType.localeCompare("fill") || spotMatrixType.localeCompare("color") || spotMatrixType.localeCompare("size") || spotMatrixType.localeCompare("ring"))) {
    throw new Error("Valid spotMatrixTypes are 'fill,'color','size','ring'");
  }

  if (!isNaN(minColor)) {
    throw new Error("minColor must be a String");
  }

  if (!isNaN(maxColor)) {
    throw new Error("maxColor must be a String");
  }

  if (!isNaN(strokeColor)) {
    throw new Error("strokeColor must be a String");
  }

  let div = d3.select('body').append('div')
    .attr('class', 'DoubleEntryTable');
  let columnsName = data.map(el => el[dimColumn]).filter((v, i, a) => a.indexOf(v) === i)
  let colNamesPlusEmpty = data.map(el => el[dimColumn]).filter((v, i, a) => a.indexOf(v) === i)
  colNamesPlusEmpty.unshift('')
  let extentOfData = d3.extent(
    function(array, names) {
      let res = [];
      array.forEach(function(item) {
        names.forEach(function(name) {
          if (!isNaN(item[name]))
            res = res.concat(item[name]);
        });
      });
      return (res);
    }(data, colNamesPlusEmpty)
  )

  function toRadians(degs) {
    return Math.PI * degs / 180;
  }

  function toDegrees(radians) {
    return 180 * radians / Math.PI;
  }

  let minValue = extentOfData[0];
  let maxValue = extentOfData[1];

  let colorScale = d3.scaleLinear().domain([minValue, maxValue])
    .range([minColor, maxColor]);

  let radiusScale = d3.scaleLinear().domain([minValue, maxValue])
    .range([0, spotRadius]);

  let inverseRadiusScale = d3.scaleLinear().domain([minValue, maxValue])
    .range([spotRadius, 0]);

  let radialScale = d3.scaleLinear().domain([minValue, maxValue])
    .range([0, toRadians(359)]);

  let gradientScaleSVG = div.append("svg").attr("width", 0).attr("height", 0);

  // append a table to the div
  let table = div.append("table")
    .attr("class", "table_spot-matrix")
    .classed("display", true);

  // append a header to the table
  let thead = table.append("thead");

  // append a body to the table
  let tbody = table.append("tbody");

  // append a row to the header
  let theadRow = thead.append("tr");

  // return a selection of cell elements in the header row
  // attribute (join) data to the selection
  // update (enter) the selection with nodes that have data
  // append the cell elements to the header row
  // return the text string for each item in the data array

  theadRow.selectAll("td")
    .data(colNamesPlusEmpty)
    .enter()
    .append("td")
    .attr('style', "padding:" + spotCellPadding + "px;" + "margin:" + spotCellMargin + "px")
    .html(function(d) {
      return evalText(d);
    });

  let rowsName = data.map(el => el[dimRows]).filter((v, i, a) => a.indexOf(v) === i)

  // Position of elements in the table body matrix
  let matrixElements = new Array(rowsName.length).fill()
    .map(()=> {
      return new Array(columnsName.length).fill()
        .map(() => {
          return []
        })
    });

  data.forEach(el => {
    let columnPos = columnsName.indexOf(el[dimColumn])
    let rowPos = rowsName.indexOf(el[dimRows])
    matrixElements[rowPos][columnPos].push({name: el[dimElementInside]})
  })

  // Table body matrix
  let cellData = []
  rowsName.forEach((nameX,  i) => {
    cellData[i] = []
    columnsName.forEach((nameY,j) => {
      cellData[i][j] = {
        nameX: nameX,
        nameY: nameY,
        insideElements: matrixElements[i][j]
      }
    })
  })

  // Array of each row name plus each cell data (rowName x columnName)
  let dataRows = rowsName.map((colName, i) => {
    return {
      columnName: colName,
      rowData: cellData[i]
    }
  })

  console.log('datarows', dataRows)

  // table body rows
  // title rows (filter to get unique values of dimRows)
  let tableBodyRows = tbody.selectAll("tr")
    .data(dataRows)
    .enter()
    .append("tr")
    .attr('class', 'Row');

  //table body row cells
  let cells = tableBodyRows.selectAll("td")
    .data(td => {
      let row = td.rowData
      row.unshift({nameRow: td.columnName})
      return row
    })
    .enter()
    .append("td")
    .attr('style', "padding:" + spotCellPadding + "px;" + "margin:" + spotCellMargin + "px;")
    .attr('class', 'Cell')

  cells.html(function(d) {
      if (d.hasOwnProperty('nameRow')) {
        return evalText(d.nameRow);
      }
    })

  cells.selectAll('.Cell')
    .data((filledCell, i) => {
      if (filledCell.hasOwnProperty('nameRow')) {
        return []
      }
      else {
        return filledCell.insideElements
      }
    })
    .enter()
    .append('svg')
    .attr('class', 'Component')
    .attr('width', svgInsideWidth)
    .attr('height', svgInsideHeight)
    .attr('margin', '5px')
    .attr('padding', '3px')

  // Circles representing each inside component
  cells.selectAll('.Component')
    .append('circle')
    .attr('cx', spotRadius)
    .attr('cy', spotRadius)
    .attr('r', 25)
    .style('fill', '#66ccff')

  // Append text to each svg
  cells.selectAll('.Component')
    .append('text')
    .style('transform', 'translate( 50%, 50%)')
    .style('fill', '#FFFFFF')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .text(svg => svg.name)
    .text(svg => {
      return svg.name;
    })

    /*.append(function(d, i, j) {
      return renderSpots(d, i, j);
    }); */

  function renderSpots(d, i, j) {

    let w = spotRadius * 2;
    let h = spotRadius * 2;

    let spots = document.createElement("div");
    let svg = d3.select(spots).append("svg");

    svg.attr("width", w);
    svg.attr("height", h);
    svg.attr("style", "padding:" + spotCellPadding + "px;" + "margin:" + spotCellMargin + "px;");

    let elem = svg.selectAll("div")
      .data([d]);

    let elemEnter = elem.enter()
      .append("g");

    let elemEnterCircle = elemEnter.append("circle");
    elemEnterCircle.attr("class", "spots")
    spotAttr(elemEnterCircle, d, i, j);
    elemEnterCircle.attr("fill", spotStyle(d, i, j));

    if (spotMatrixType == 'ring') {
      let elem = svg.selectAll("div")
        .data([d]);

      let elemEnter = elem.enter()
        .append("g");

      let elemEnterCircle = elemEnter.append("circle")
      elemEnterCircle.attr("class", "spots")
      elemEnterCircle.attr("cx", spotRadius);
      elemEnterCircle.attr("cy", spotRadius);
      elemEnterCircle.attr("r", inverseRadiusScale(d));
      elemEnterCircle.attr("fill", minColor);

    }
    if (spotMatrixType == 'sector') {

      let arc = d3.arc()
        .innerRadius(0)
        .outerRadius(spotRadius)
        .startAngle(0)
        .endAngle(radialScale(d));

      let elem = svg.selectAll("div")
        .data([d]);

      let elemEnter = elem.enter()
        .append("g");

      elemEnter.append("path")
        .attr("class", "arc spots")
        .attr("transform", "translate(" + spotRadius + "," + spotRadius + ")")
        .attr("d", arc)
        .style("fill", maxColor)
        .style("stroke", maxColor)
        .style("stroke-width", 1)
    }

    add_tooltips();

    function add_tooltips() {

      // Adding a tooltip which on mouseover shows the date range and the last_close points range.
      let tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip_spot-matrix');

      tooltip.append('div')
        .attr('class', 'value');

      svg.selectAll(".spots")
        .on('mouseover', function(d) {

          let html = d;
          tooltip.select('.value').html(html);

          tooltip.style('display', 'block');
          tooltip.style('opacity', 2);

        })
        .on('mousemove', function(d) {
          tooltip.style('top', (d3.event.layerY + 10) + 'px')
            .style('left', (d3.event.layerX - 25) + 'px');
        })
        .on('mouseout', function(d) {
          tooltip.style('display', 'none');
          tooltip.style('opacity', 0);
        });

    }

    return spots;
  }

  function spotAttr(elem, d, i, j) {
    elem.attr("cx", spotRadius);
    elem.attr("cy", spotRadius);
    elem.attr("stroke", strokeColor);

    if (spotMatrixType != 'size') {
      elem.attr("r", spotRadius);
    } else {
      elem.attr("r", radiusScale(d));
    }
  }

  function spotStyle(d, i, j) {
    if (spotMatrixType == 'color') {
      return colorScale(d)
    } else if (spotMatrixType == 'fill') {
      let gradientScale = gradientScaleSVG
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradientScale-" + i + "," + d)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      let offset = (d / maxValue) * 100;

      gradientScale.append("stop").attr("offset", offset + "%").style("stop-color", maxColor);
      gradientScale.append("stop").attr("offset", offset + "%").style("stop-color", minColor);
      return "url(#gradientScale-" + i + "," + d + ")"

    } else if (spotMatrixType == 'size') {
      return maxColor

    } else if (spotMatrixType == 'ring') {
      return maxColor
    } else if (spotMatrixType == 'sector') {
      return "white"
    }
  }

  function evalColor(d) {
    if (!isNaN(d)) {
      return createSVG(d);
    } else {
      return d;
    }
  }

  function evalText(d) {
    if (!isNaN(d)) {
      //Do nothing
    } else {
      return "<b>" + d + "</b>";
    }
  }

  // return div;
}

SpotMatrix(dataTest,chartOptions);