document.addEventListener("DOMContentLoaded", function() {
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');

    // Fetch and populate states
    axios.get('http://localhost:3000/api/states')
        .then(response => {
            const states = response.data;
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state.code;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        });

    // Fetch and populate districts when a state is selected
    stateSelect.addEventListener('change', function() {
        const stateCode = stateSelect.value;
        axios.get(`http://localhost:3000/api/districts?stateCode=${stateCode}`)
            .then(response => {
                const districts = response.data;
                districtSelect.innerHTML = '';
                districts.forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.code;
                    option.textContent = district.name;
                    districtSelect.appendChild(option);
                });
            });
    });

    // Fetch and visualize data when a district is selected
    districtSelect.addEventListener('change', function() {
        const districtCode = districtSelect.value;
        axios.get(`http://localhost:3000/api/census?districtCode=${districtCode}`)
            .then(response => {
                const data = response.data;
                visualizeData(data);
            });
    });

    function visualizeData(data) {
        const svg = d3.select("#visualization").append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

        // Clear previous visualizations
        svg.selectAll("*").remove();

        // Example visualization: Bar chart for population
        const populationData = data.population;
        const x = d3.scaleBand().domain(populationData.map(d => d.ageGroup)).range([0, svg.node().getBoundingClientRect().width]).padding(0.1);
        const y = d3.scaleLinear().domain([0, d3.max(populationData, d => d.count)]).range([svg.node().getBoundingClientRect().height, 0]);

        svg.append("g").call(d3.axisLeft(y));
        svg.append("g").attr("transform", `translate(0, ${svg.node().getBoundingClientRect().height})`).call(d3.axisBottom(x));

        svg.selectAll(".bar")
            .data(populationData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.ageGroup))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => svg.node().getBoundingClientRect().height - y(d.count))
            .attr("fill", "steelblue");
    }
});
