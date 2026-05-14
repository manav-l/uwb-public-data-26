//Load data
d3.csv("UOF_race.csv").then(data => {
    console.log("data", data);

    //format data
    data.forEach(d => {
        d.Race = d.Race;
        d["Total Incidents"] = +d["Total Incidents"];
    });

});