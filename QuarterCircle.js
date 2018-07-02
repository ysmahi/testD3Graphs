// TODO: avoid text overlapping (see https://stackoverflow.com/questions/17425268/d3js-automatic-labels-placement-to-avoid-overlaps-force-repulsion)
// TODO: place strong/weak on axis
// TODO: color of circles
// TODO: rawGraphs

let dataTest = [
  {
    "CompanyName": "Company Premiere",
    "Strategy": "0.4",
    "CurrentOffering": "0.6",
    "MarketPresence": 1
  },
  {
    "CompanyName": "Company 11111111111",
    "Strategy": "0.4",
    "CurrentOffering": "0.6",
    "MarketPresence": 1
  },
  {
    "CompanyName": "Company 2",
    "Strategy": "0.8",
    "CurrentOffering": "0.7",
    "MarketPresence": "0.3"
  },
  {
    "CompanyName": "Company Dos",
    "Strategy": "0.8",
    "CurrentOffering": "0.7",
    "MarketPresence": "0.5"
  },
  {
    "CompanyName": "Company 3",
    "Strategy": "0.7",
    "CurrentOffering": "0.7",
    "MarketPresence": "0.2"
  },
  {
    "CompanyName": "Company 4",
    "Strategy": "0.6",
    "CurrentOffering": "0.2",
    "MarketPresence": "0.3"
  },
  {
    "CompanyName": "Company 5",
    "Strategy": "0.6",
    "CurrentOffering": 1,
    "MarketPresence": 1
  },
  {
    "CompanyName": "Company 6",
    "Strategy": "0.3",
    "CurrentOffering": 1,
    "MarketPresence": "0.1"
  },
  {
    "CompanyName": "Company 7",
    "Strategy": 0,
    "CurrentOffering": "0.8",
    "MarketPresence": "0.3"
  },
  {
    "CompanyName": "Company 8",
    "Strategy": 1,
    "CurrentOffering": "0.3",
    "MarketPresence": "0.5"
  },
  {
    "CompanyName": "Company 9",
    "Strategy": "0.3",
    "CurrentOffering": "0.7",
    "MarketPresence": "0.4"
  },
  {
    "CompanyName": "Company 10",
    "Strategy": "0.9",
    "CurrentOffering": "0.2",
    "MarketPresence": "0"
  },
  {
    "CompanyName": "Company 11",
    "Strategy": "0.9",
    "CurrentOffering": "0.9",
    "MarketPresence": "0.9"
  },
  {
    "CompanyName": "Company 13",
    "Strategy": "1",
    "CurrentOffering": "1",
    "MarketPresence": "0.6"
  },
  {
    "CompanyName": "Company 20",
    "Strategy": "0",
    "CurrentOffering": "0",
    "MarketPresence": "0.9"
  },
  {
    "CompanyName": "Company 14",
    "Strategy": "0",
    "CurrentOffering": "0.1",
    "MarketPresence": "0.9"
  },
  {
    "CompanyName": "Company OOO",
    "Strategy": "0.23",
    "CurrentOffering": "0.03",
    "MarketPresence": "0.9"
  },
  {
    "CompanyName": "Company III",
    "Strategy": "0.21",
    "CurrentOffering": "0.03",
    "MarketPresence": "0.2"
  }
]

  function createQuarterCircleGraph (data) {
    let dimNameElement = "CompanyName"
    let dimX = "Strategy"
    let dimY = "CurrentOffering"
    let dimSizeElement = "MarketPresence"
    // Name of arcs
    let nameQuarterArcs = ['Leaders', 'Strong Performers', 'Contenders', 'Challengers']

    // Definition of graph lengths
    let rawWidth = 800
    let rawHeight = 800
    let borderGraph = 50
    let graphWidth = rawWidth - 3 * borderGraph
    let graphHeight = rawHeight - 3 * borderGraph
    let widthFirstArc = graphWidth / 3
    let widthMiddleArcs = graphWidth / 4
    let radiusCircleElement = 20

    let svgGraph = d3.select('body').append('svg')
      .attr('class', 'graph')
      .attr('width', rawWidth)
      .attr('height', rawHeight)


    /* Define x axis */
    let xAxisSpace = svgGraph.selectAll('.xAxisSpace')
      .data([{
        x0:  borderGraph,
        width: graphWidth,
        y0: graphHeight + borderGraph,
        height: 3 * borderGraph,
        nameXAxis: dimX
      }])
      .enter()
      .append('g')
      .attr('class', 'xAxisSpace')

    let defsX = xAxisSpace.append('defs')

    defsX.append("marker")
      .attr('id', 'arrow')
      .attr("refX", 0)
      .attr("refY", 3)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("markerUnits", 'strokeWidth')
      .attr("orient", "auto")
      .append('path')
      .attr('d', "M0,0 L0,6 L9,3 z")
      .attr('fill', 'black')
      .attr('class', 'arrowHead')

    xAxisSpace.append('line')
      .attr("class", "arrow")
      .attr("x2", borderGraph + 10)
      .attr("y1", 1.5 * borderGraph + graphHeight)
      .attr("x1", borderGraph + graphWidth)
      .attr("y2", 1.5 * borderGraph + graphHeight)
      .style("marker-end", "url(#arrow)")
      .style('stroke', 'black')

    // Append name of x axis
    xAxisSpace.append('text')
      .attr('x', d => d.x0 + d.width / 2)
      .attr('y', d => d.y0 + d.height / 5)
      .attr('dy', '.75em')
      .text(dimX)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')

    /* Define y axis */
    let yAxisSpace = svgGraph.selectAll('.yAxisSpace')
      .data([{
        x0:  0,
        width: borderGraph,
        y0: borderGraph,
        height: 2 * borderGraph + graphHeight,
        nameYAxis: dimY
      }])
      .enter()
      .append('g')
      .attr('class', 'yAxisSpace')

    let defsY = yAxisSpace.append('defs')

    defsY.append("marker")
      .attr('id', 'arrow')
      .attr("refX", 0)
      .attr("refY", 3)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("markerUnits", 'strokeWidth')
      .attr("orient", "auto")
      .append('path')
      .attr('d', "M0,0 L0,6 L9,3 z")
      .attr('fill', 'black')
      .attr('class', 'arrowHead')

    yAxisSpace.append('line')
      .attr("class", "arrow")
      .attr("x2", borderGraph / 2)
      .attr("y1", borderGraph + graphHeight)
      .attr("x1", borderGraph / 2)
      .attr("y2", borderGraph + 10)
      .style("marker-end", "url(#arrow)")
      .style('stroke', 'black')

    // Append name of y axis
    yAxisSpace.append('text')
      .attr('x', d => d.x0 + d.width / 2)
      .attr('y', d => d.y0 + d.height / 2)
      .attr('dy', '.75em')
      .text(dimY)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')

    /* Create quarter of arcs */
    let arcsSpace = svgGraph.append('g')
      .attr('transform', 'translate(' + borderGraph + ',' + borderGraph + ')')
      .attr('class', 'arcsSpace')

    arcsSpace.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', graphWidth)
      .attr('height', graphHeight)
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .style('fill-opacity', '0')

    let currentRadius = 0
    nameQuarterArcs.forEach((nameArc, i, arcsArray) => {

      let currentWidth = (i === 0) ? widthFirstArc : widthMiddleArcs
      let arc = d3.arc()
        .innerRadius(currentRadius)
        .outerRadius(currentRadius + currentWidth)
        .startAngle(Math.PI / 2)
        .endAngle(Math.PI)

      if (i !== arcsArray.length - 1) {
        // Create and append arc
        arcsSpace.append("path")
          .attr('d', arc)
          .style('fill', () => {
            return pickHex(i / arcsArray.length,
              {red: 204, green: 230, blue: 255},
              {red: 102, green: 181, blue: 255})
          })
      }

      svgGraph.append('text')
        .attr('x', () => currentRadius)
        .attr('y', 0)
        .attr('dy', '.75em')
        .text(nameArc)
        .attr('transform', 'translate(' + borderGraph +',' + (borderGraph - 20) + ')')
        .attr('text-anchor', 'left')
        .attr('alignment-baseline', 'middle')

      currentRadius += currentWidth
    })

    /* Append size scale */
    if (dimSizeElement) {
      let sizeScaleSpace = arcsSpace.selectAll('.sizeScaleSpace')
        .data([{x: graphHeight / 16,
          y: graphHeight - 3/2 * borderGraph,
          width: graphWidth / 4,
          height: borderGraph
        }])
        .enter()
        .append('g')
        .attr('class', 'sizeScaleSpace')

      // Circles of different radius
      let currentX = graphHeight / 16
      let currentY = graphHeight - borderGraph /2
      for (let j=0; j<4; j++) {

        currentX += 2 + (j + 1) * 0.25 * radiusCircleElement + (j) * 0.25 * radiusCircleElement

        sizeScaleSpace.append('circle')
        .attr('cx', d => currentX )
        .attr('cy', d => currentY)
        .attr('r', d => (j + 1) * 0.25 * radiusCircleElement)
        .style('fill', 'grey')
      }

      let defsSizeScale = sizeScaleSpace.append('defs')

      defsSizeScale.append("marker")
        .attr('id', 'arrow')
        .attr("refX", 0)
        .attr("refY", 3)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("markerUnits", 'strokeWidth')
        .attr("orient", "auto")
        .append('path')
        .attr('d', "M0,0 L0,6 L9,3 z")
        .attr('fill', 'black')
        .attr('class', 'arrowHead')

      sizeScaleSpace.append('line')
        .attr("class", "arrow")
        .attr("x2", currentX +4 * 0.25 * radiusCircleElement )
        .attr("y1", graphWidth - borderGraph)
        .attr("x1", graphWidth / 16 - 0.3 * radiusCircleElement)
        .attr("y2", graphWidth - borderGraph)
        .style("marker-end", "url(#arrow)")
        .style('stroke', 'black')

      sizeScaleSpace.append('text')
        .text(dimSizeElement)
        .attr('x', d => d.x + (currentX - d.x) / 2)
        .attr('y', d => d.y)
        .attr('dy', '.75em')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'bottom')
    }

    /* Create scatterplot */
    // setup x scale
    let xScale = d3.scaleLinear().domain([1,0]).range([2 * radiusCircleElement + 2, graphWidth - 2 * radiusCircleElement - 2])

    // setup y
    let yScale = d3.scaleLinear().domain([1,0]).range([2 * radiusCircleElement + 2, graphHeight - 2 * radiusCircleElement - 2])

    // Map the basic node data to d3-friendly format.
    let nodesElements = data.map((node) => {
      let nodeX = xScale(parseFloat(node[dimX]))
      let nodeY = yScale(parseFloat(node[dimY]))
      return {
        //radius: 0,
        //color: '#ff7f0e',
        x: nodeX,
        y: nodeY,
        nameElement: node[dimNameElement],
        sizeElement: parseFloat(node[dimSizeElement])
      };
    });

    /* Create a force simulation to avoid circles overlapping */
    let simulation = d3.forceSimulation(nodesElements)
      .force("x", d3.forceX(function(d) { return d.x }))
      .force("y", d3.forceY(function(d) { return d.y }))
      .force("collide", d3.forceCollide().radius((d) => (d.sizeElement + 0.01) * radiusCircleElement))
      .force("manyBody", d3.forceManyBody().strength(-10))
      .stop();

    for (var i = 0; i < 200; ++i) simulation.tick()

    /* Draw dataset elements to the graph on the arcs */
    let elementSpace = arcsSpace.selectAll('.elementSpace')
      .data(nodesElements)
      .enter().append('g')
      .attr("class", "elementSpace")

      elementSpace.append('circle')
      .attr("r", d => (d.sizeElement + 0.1) * radiusCircleElement)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .style("fill", 'grey')

    elementSpace.append('text')
      .text(el => el.nameElement)
      .attr('x', el => el.x + (el.sizeElement + 0.1) * radiusCircleElement)
      .attr('y', el => el.y)
      .attr('dy', '.75em')
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'bottom')
      .attr('class', 'labelCircle')
      .attr('transform', 'translate(0, 0)')

    // Avoid label overlaping
    arrangeLabels('.labelCircle')

    /* function that returns a color over a radient depending on the weight (between 0 and 1) */
    function pickHex(weight, color1, color2) {
      let w1 = weight;
      let w2 = 1 - w1;
      let rgb = [Math.round(color1.red * w1 + color2.red * w2),
        Math.round(color1.green * w1 + color2.green * w2),
        Math.round(color1.blue * w1 + color2.blue * w2)];
      return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }

    function arrangeLabels(classLabel) {
      var move = 1;
      while(move > 0) {
        move = 0;
        elementSpace.selectAll(classLabel)
          .each(function() {
            var that = this,
              a = this.getBoundingClientRect();
            elementSpace.selectAll(classLabel)
              .each(function() {
                if(this != that) {
                  var b = this.getBoundingClientRect();
                  if((Math.abs(a.left - b.left) * 2 < (a.width + b.width)) &&
                    (Math.abs(a.top - b.top) * 2 < (a.height + b.height))) {
                    // overlap, move labels
                    var dx = (Math.max(0, a.right - b.left) +
                      Math.min(0, a.left - b.right)) * 0.01,
                      dy = (Math.max(0, a.bottom - b.top) +
                        Math.min(0, a.top - b.bottom)) * 0.02,
                      tt = d3.select(this).attr("transform"),
                      to = d3.select(that).attr("transform");
                    move += Math.abs(dx) + Math.abs(dy);

                    let translateT = tt.substring(tt.indexOf("(")+1, tt.indexOf(")")).split(",")
                    let translateO = to.substring(to.indexOf("(")+1, to.indexOf(")")).split(",")

                    translateO = [ parseFloat(translateO[0]) + dx, parseFloat(translateO[1]) + dy ];
                    translateT = [ translateT[0] - dx, translateT[1] - dy ];
                    d3.select(this).attr("transform", "translate(" + translateO[0] + ',' + translateO[1] + ")");
                    d3.select(that).attr("transform", "translate(" + translateT[0] + ',' + translateT[1] + ")");
                    a = this.getBoundingClientRect();
                  }
                }
              });
          });
      }
    }
  }

  createQuarterCircleGraph(dataTest)