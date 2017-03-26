function Assignment_2B() {

    var color_list = ['DarkRed', 'gold', 'PaleVioletRed', 'DarkOrange', 'DarkGreen', 'MidnightBlue'];

    var projection = d3.geo.mercator();
    var current_clicked = 2;
    var border = 2;
    var bordercolor = 'black';
    var margin = {
        top: 50
        , right: 5
        , bottom: 5
        , left: 50
    };
    var width = 1000 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    var lattop = 37.831575;
    var lonleft = -122.514949;
    var lonright = -120.906983;

    var scale = 360 * width / (lonright - lonleft);
    projection.scale(scale);

    projection.translate([0, 0]);
    // check where your top left coordinate is projected
    var trans = projection([lonleft, lattop]);
    // translate your map in the negative direction of that result
    projection.translate([-1 * trans[0], -1 * trans[1]]);
    var path = d3.geo.path()
        .projection(projection);


//            Create SVG element
    svg = d3.select("#assignment2BSVG")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width)
        .style("stroke", bordercolor)
        .style("fill", "PaleTurquoise")
        .style("stroke-width", border);

    svg.append("g").attr("id", "districts");

    // geojson data of SF
    d3.json("data/sfpddistricts.geojson", function (json) {

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr({
                "d": path,
                'fill': "PeachPuff",
                'opacity': 0.6,
                'stroke-width': 1.5,
                'stroke': 'black'
            })
            .on('mouseover', function () {
                // Add a hover effect
                d3.select(this)
                    .transition()
                    .attr('fill', 'Coral')
            })
            .on('mouseout', function () {
                // Remove the hover effect
                d3.select(this).transition()
                    .attr('fill', "PeachPuff")
            })
            .append('title')
            // Add tool tip, containing districts
            .text(function (data) {
                return data.properties.DISTRICT;
            });

        // district label in center of coordinates
        svg.select("#districts").selectAll("text")
            .data(json.features)
            .enter()
            .append("svg:text")
            .attr("x", function (data) {
                return path.centroid(data)[0];
            })
            .attr("y", function (data) {
                return path.centroid(data)[1];
            })
            .attr("text-anchor", "middle")
            .attr('font-size', '15px')
            .attr('font-family', 'sans-serif')
            .attr('fill', 'black');
    });
    var buttons = document.getElementsByClassName("button1");
    var buttonsCount = buttons.length;

    d3.json("data/prost_pointssosto.json", function (data) {

        svg.selectAll("circles")
            .data(data)
            .enter()
            .append("circle")
            .attr("id", "points")
            .attr("cx", function (d) {
                return projection(d)[0];
            })
            .attr("cy", function (d) {
                return projection(d)[1];
            })
            .attr("r", 5)
            .style("fill", function (d) {
                    return color_list[parseInt(d[2])];//K = 6
                }
            );

        centClust(2);

        for (var i = 0; i < buttonsCount; i += 1) {
            buttons[i].onclick = clicked(i + 2);
        }

        function clicked(i) {
            // alert(i);
            d3.select("#K" + i)
                .on("click", function () {
                    current_clicked = i;
                    centClust(current_clicked);

                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[i])];
                        })
                });
        }
    });

    function hoverover() {
        d3.json("data/prost_pointssosto.json", function (data) {

            d3.select("#K3")
                .on("mouseover", function () {
                    centClust(3);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[3])];
                        })
                })
                .on("mouseout", function () {
                    centClust(current_clicked);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[current_clicked])];
                        })
                });

            d3.select("#K2")
                .on("mouseover", function () {
                    centClust(2);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[2])];
                        })
                })
                .on("mouseout", function () {
                    centClust(current_clicked);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[current_clicked])];
                        })
                });

            d3.select("#K4")
                .on("mouseover", function () {
                    centClust(4);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[4])];
                        })
                })
                .on("mouseout", function () {
                    centClust(current_clicked);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[current_clicked])];
                        })
                });

            d3.select("#K5")
                .on("mouseover", function () {
                    centClust(5);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[5])];
                        })
                })
                .on("mouseout", function () {
                    centClust(current_clicked);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[current_clicked])];
                        })
                });

            d3.select("#K6")
                .on("mouseover", function () {
                    centClust(6);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[6])];
                        })
                })
                .on("mouseout", function () {
                    centClust(current_clicked);
                    svg.selectAll("#points")
                        .style("fill", function (d) {
                            return color_list[parseInt(d[current_clicked])];
                        })
                })
        })
    }

    function centClust(current_clicked) {

        d3.json("data/clusterCenterssosto.json", function (data) {
            // if (data[2]==current_clicked)

            svg.selectAll("#centers").remove();
            svg.selectAll("clust")

                .data(data)
                .enter()
                .append("circle")
                .attr("id", "centers")
                .attr("cx", function (d) {
                    return projection(d)[0];
                })
                .attr("cy", function (d) {
                    return projection(d)[1];
                })
                .attr("r", 7)
                .attr("fill", 'none')
                .style('stroke', 'black')
                .style('stroke-width', function (d) {
                    if (d[2] == current_clicked) {
                        return 5;
                    }
                    else {
                        return 0;
                    }
                })
        });
    }
}

Assignment_2B();