//Declare const variables
    const margin = 40;
    const width = 800;
    const height = 500;

//Load data
d3.csv("UOF_race.csv").then(data => {

    //format data
    data.forEach(d => {
        d.Race = d.Race;
        d["Total Incidents"] = +d["Total Incidents"];
    });

    //X scale 
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.Race))
            .range([margin, width - margin])
            .padding(0.1);

    //Y scale
        const yScale = d3.scaleLinear()
            .domain([0, 8000])
            .range([height - margin, margin]);

    
    //Create axes
        const bottomAxis = d3.axisBottom()
            .scale(xScale);
        
        const leftAxis = d3.axisLeft()
            .scale(yScale);

    //SVG
        const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height + 100);

    //Draw bars
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => xScale(d.Race))
            .attr("y", d => yScale(d["Total Incidents"]))
            .attr("width", xScale.bandwidth())
            .attr("height", d => (height - margin) - yScale(d["Total Incidents"]))
            .attr("fill", "blue");
    
    //Call axes
    svg.append("g")
            .attr("transform", "translate(0," + (height - margin) + ")") 
            .call(bottomAxis)
            .selectAll("text")
            .attr("transform", "rotate(-30)")
            .style("text-anchor", "end");

        svg.append("g")
            .attr("transform", "translate(" + margin + ",0)")
            .call(leftAxis)

});