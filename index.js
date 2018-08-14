d3.json("/data/server1.json", function(dataJ) {
        var data_csv = dataJ['server1'][0]['value'];
        console.log(dataJ);
        console.log(data_csv);
        //console.log(dataJ);
        var width = 800;
        var height = 400;
        
        var data = [30];
        var server_data = [(dataJ['server1'][0]['value']),(dataJ['server2'][0]['value']), (dataJ['server3'][0]['value']),
        (dataJ['server4'][0]['value']), (dataJ['server5'][0]['value'])];

        console.log(server_data);
        var servers = [5,5,5,5,5]; //5 servers
        
        var colors = ['#78c679','#ff0000', '#ff0000']; // turn on color
        // turn off color
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
        
        var g = svg.selectAll("g")
                    .data(servers)
                    .enter()
                    .append("g")
                    .attr("transform", function(d, i) {
                        return "translate(0,0)";
                    })
                    g.append("circle")
                    .attr("cx", function(d, i) {
                          return (d * 10) + 50 + (100 * i);
                    })
                    .attr("cy", function(d, i) {
                          return 250;
                    })
                    .attr("r", function(d) {
                          return d * 4;
                    })
                    .attr("fill", function(d, i){
                       console.log(i);
                       console.log(server_data[i]);
                        return colors[server_data[i]];
                    })
        g.append("text")
            .attr("x", function(d, i) {
              return (10*5*d);
            })
        
            .attr("y", 105)
            .attr("stroke", "black")
            .attr("font-size", "12px")
            .attr("font-family", "sans-serif")
            .text(function(d) {
               return d;
       });
   });
