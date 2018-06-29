let dataTest = [
  {
    "CompanyName": "Company Première",
    "Strategy": "0.4",
    "CurrentOffering": "0.6",
    "MarketPresence": 1
  },
  {
    "CompanyName": "Company Uno",
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
    "MarketPresence": "0.9"
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
    "MarketPresence": "0.9"
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
    "Strategy": "0.25",
    "CurrentOffering": "0.03",
    "MarketPresence": "0.9"
  },
  {
    "CompanyName": "Company III",
    "Strategy": "0.21",
    "CurrentOffering": "0.03",
    "MarketPresence": "0.9"
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
    let rawWidth = 600
    let rawHeight = 600
    let graphWidth = rawWidth - 50
    let graphHeight = rawHeight - 50
    let widthFirstArc = graphWidth / 3
    let widthMiddleArcs = graphWidth / 4
    let radiusCircleElement = 10

    let svgGraph = d3.select('body').append('svg')
      .attr('class', 'graph')
      .attr('width', rawWidth)
      .attr('height', rawHeight)


    /* Retrieve data from dataset */

    /* Create quarter of arcs */
    let arcsSpace = svgGraph.append('g')
      .attr('transform', 'translate(29, 29)')
      .attr('class', 'arcsSpace')

    arcsSpace.append('rect')
      .attr('transform', 'translate(20, 20)')
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
          .attr('transform', 'translate(21, 21)')
          .style('fill', () => {
            return pickHex(i / arcsArray.length,
              {red: 204, green: 230, blue: 255},
              {red: 102, green: 181, blue: 255})
          })
      }

      arcsSpace.append('text')
        .attr('x', () => currentRadius)
        .attr('y', 0)
        .attr('dy', '.75em')
        .text(nameArc)
        .attr('transform', 'translate(25, 0)')

      currentRadius += currentWidth
    })

    /* Create scatterplot */
    // setup x
    let xScale = d3.scaleLinear().domain([1,0]).range([radiusCircleElement + 2, graphWidth - 2 * radiusCircleElement - 2])

    // setup y
    let yScale = d3.scaleLinear().domain([1,0]).range([radiusCircleElement + 2, graphHeight - 2 * radiusCircleElement - 2])

    // Map the basic node data to d3-friendly format.
    let nodesElements = data.map((node) => {
      let nodeX = xScale(parseFloat(node[dimX]))
      let nodeY = yScale(parseFloat(node[dimY]))
      let x0 = (nodeX + nodeY)*nodeX/(2 * Math.pow(Math.pow(nodeX, 2) + Math.pow(nodeY, 2), 0.5))
      let y0 = (nodeX + nodeY)*nodeY/(2 * Math.pow(Math.pow(nodeX, 2) + Math.pow(nodeY, 2), 0.5))
      return {
        //radius: 0,
        //color: '#ff7f0e',
        x: x0,
        y: y0,
        nameElement: node[dimNameElement],
        sizeElement: parseFloat(node[dimSizeElement])
      };
    });

    let simulation = d3.forceSimulation(nodesElements)
      .force("x", d3.forceX(function(d) { return d.x }))
      .force("y", d3.forceY(function(d) { return d.y }))
      .force("collide", d3.forceCollide().radius(() => radiusCircleElement + 0.5))
      .force("manyBody", d3.forceManyBody().strength(-10))
      .stop();

    for (var i = 0; i < 200; ++i) simulation.tick()

    let elementSpace = arcsSpace.selectAll('g')
      .data(nodesElements)
      .enter().append('g')
      .attr("class", "elementSpace")
      .attr('transform', 'translate(' + (20 + radiusCircleElement) + ',' + (20 + radiusCircleElement) + ')')

      elementSpace.append('circle')
      .attr("r", radiusCircleElement)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .style("fill", 'grey')

    elementSpace.append('text')
      .text(el => el.nameElement)
      .attr('x', el => el.x + radiusCircleElement)
      .attr('y', el => el.y)
      .attr('dy', '.75em')
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'bottom')

    /* Draw dataset elements to the graph on the arcs */
    /* let elements = arcsSpace.selectAll(".element")
      .data(nodesElements)
      .enter().append("g")
      .attr('class', 'element')
      .attr('transform', 'translate(20, 20)')

      elements.append('circle')
      .attr("class", "circleElement")
      .attr("r", radiusCircleElement)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", 'grey')

    elements.append('text')
      .text(el => el[dimNameElement])
      .attr('x', el => xMap(el) + radiusCircleElement)
      .attr('y', yMap)
      .attr('dy', '.75em')
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'bottom') */

    /* function that returns a color over a radient depending on the weight (between 0 and 1) */
    function pickHex(weight, color1, color2) {
      let w1 = weight;
      let w2 = 1 - w1;
      let rgb = [Math.round(color1.red * w1 + color2.red * w2),
        Math.round(color1.green * w1 + color2.green * w2),
        Math.round(color1.blue * w1 + color2.blue * w2)];
      return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }
  }

  createQuarterCircleGraph(dataTest)