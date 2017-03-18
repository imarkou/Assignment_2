//Width and height
(function(){
			var w = 500;
			var h = 500;
			
			//Create SVG element
           var svg = document.getElementById('mychart');


			//Data
			d3.json("counts2003.json", function(data){
				console.log(data);


				var circles = svg.selectAll("circle")
							   	 .data(data)
			    				 .enter()
			  					.append("circle");

			});
			
})()
				
			// circles.attr("cx", function(d.prostitution) {
			// 			return d;
			// 		})
			// 	   .attr("cy", function(d.vehicleThefts) {
			// 			return d;
			// 		})
			// 	   .attr("r", function(d.totalCrimes) {
			// 			return d;
			// 	   })
			// 	   .attr("fill", "yellow");
