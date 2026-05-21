//plot constraint consts
const svgW = 900;
const svgH = 600;

//triangle consts
const baseY = 350;
const baseHalf = 30;

//load data and variables
d3.csv("UOF_race.csv").then(data => {

    //format data
    data.forEach(d => {
        d.race = d.race;
        d.total_incidents = +d.total_incidents;
    });

    const maxData = d3.max(data, d => d.total_incidents);
    const minData = d3.min(data, d => d.total_incidents);

    // height scale
    const heightScale = d3.scaleLinear()
        .domain([0, maxData])
        .range([0, 300]);

    //y scale
    const yScale = d3.scaleLinear()
        .domain([0, maxData])
        .range([baseY, baseY - 300]);
    
    //color gradient
    const myColor = d3.scaleLinear()
        .domain([0, maxData])
        .range(["blue", "red"]);

    //SVG
    const svg = d3.select("body")
        .append("svg")
        .attr("width", svgW)
        .attr("height", svgH)

    //title
    svg.append("text")
        .attr("x", svgW / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .text("SPD Total Use of Force Incidents by Race/Ethnicity");

    //draw y-axis
    svg.append("g")
        .attr("transform", 'translate(50, 0)')
        .call(d3.axisLeft(yScale));

    //group
    const g = svg.selectAll("g.triangles")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(${(i * 100) + 100}, 0)`);

    //svg shape - triangles
    g.append("path")
        .attr("d", d => {
            const h = heightScale(d.total_incidents);
            return `M0,${baseY - h} L${baseHalf},${baseY} L${-baseHalf},${baseY} Z`;
        })
        .attr("fill", d => myColor(d.total_incidents))
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("class", "triangles");
    
    //x-axis labels (race)
    g.append("text")
        .attr("x", 0)
        .attr("y", baseY)
        .attr("text-anchor", "end")
        .attr("transform", `rotate(-45, 20, ${baseY})`)
        .attr("class", "labels")
        .text(d => d.race);

});