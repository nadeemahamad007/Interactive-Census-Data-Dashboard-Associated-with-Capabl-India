document.addEventListener("DOMContentLoaded", function() {
    const stateSelect = document.getElementById("state-select");
    const districtSelect = document.getElementById("district-select");
    const selectedState = document.getElementById("selected-state");
    const selectedDistrict = document.getElementById("selected-district");
    const totalPopulation = document.getElementById("total-population");
    const literacyRate = document.getElementById("literacy-rate");
    const chartSubtitle = document.getElementById("chart-subtitle");
    const insightsList = document.getElementById("insights-list");
    const chartContainer = document.getElementById("visualization");

    let stateLookup = {};
    let districtLookup = {};

    axios.get("http://localhost:3000/api/states")
        .then((response) => {
            const states = response.data;

            states.forEach((state) => {
                stateLookup[state.code] = state.name;

                const option = document.createElement("option");
                option.value = state.code;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        })
        .catch(() => {
            setInsights(["Unable to load states from the backend API."]);
        });

    stateSelect.addEventListener("change", function() {
        const stateCode = stateSelect.value;
        const stateName = stateLookup[stateCode] || "Not selected";

        selectedState.textContent = stateName;
        selectedDistrict.textContent = "Not selected";
        totalPopulation.textContent = "--";
        literacyRate.textContent = "--";
        chartSubtitle.textContent = "Select a district to view the chart.";
        districtLookup = {};
        resetDistrictSelect();
        clearChart("Choose a district to display census insights.");
        setInsights(["Select a district to see insights."]);

        if (!stateCode) {
            return;
        }

        axios.get(`http://localhost:3000/api/districts?stateCode=${stateCode}`)
            .then((response) => {
                const districts = response.data || [];

                districtSelect.disabled = districts.length === 0;
                districts.forEach((district) => {
                    districtLookup[district.code] = district.name;

                    const option = document.createElement("option");
                    option.value = district.code;
                    option.textContent = district.name;
                    districtSelect.appendChild(option);
                });

                if (districts.length === 0) {
                    setInsights(["No districts are available for the selected state."]);
                }
            })
            .catch(() => {
                setInsights(["Unable to load districts for the selected state."]);
            });
    });

    districtSelect.addEventListener("change", function() {
        const districtCode = districtSelect.value;
        const districtName = districtLookup[districtCode] || "Not selected";

        selectedDistrict.textContent = districtName;

        if (!districtCode) {
            totalPopulation.textContent = "--";
            literacyRate.textContent = "--";
            chartSubtitle.textContent = "Select a district to view the chart.";
            clearChart("Choose a district to display census insights.");
            setInsights(["Select a district to see insights."]);
            return;
        }

        axios.get(`http://localhost:3000/api/census?districtCode=${districtCode}`)
            .then((response) => {
                const data = response.data;

                if (!data || !Array.isArray(data.population)) {
                    totalPopulation.textContent = "--";
                    literacyRate.textContent = "--";
                    chartSubtitle.textContent = `${districtName} data is not available yet.`;
                    clearChart("No census dataset is available for this district.");
                    setInsights([
                        `${districtName} is listed, but detailed census values have not been added yet.`,
                        "You can expand the backend dataset to make this dashboard richer."
                    ]);
                    return;
                }

                updateDashboard(data, districtName);
            })
            .catch(() => {
                clearChart("Unable to load census data right now.");
                setInsights(["The dashboard could not fetch census data from the backend API."]);
            });
    });

    function resetDistrictSelect() {
        districtSelect.innerHTML = '<option value="">Select a district</option>';
        districtSelect.disabled = true;
    }

    function updateDashboard(data, districtName) {
        const populationData = data.population;
        const total = populationData.reduce((sum, item) => sum + item.count, 0);
        const topGroup = populationData.reduce((largest, item) => {
            return !largest || item.count > largest.count ? item : largest;
        }, null);

        totalPopulation.textContent = formatNumber(total);
        literacyRate.textContent = `${data.literacyRate.toFixed(1)}%`;
        chartSubtitle.textContent = `Population distribution for ${districtName}`;

        setInsights([
            `Total tracked population is ${formatNumber(total)} for ${districtName}.`,
            `${topGroup.ageGroup} is the largest age group with ${formatNumber(topGroup.count)} people.`,
            `The reported literacy rate is ${data.literacyRate.toFixed(1)}%.`
        ]);

        visualizeData(populationData);
    }

    function setInsights(items) {
        insightsList.innerHTML = "";

        items.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            insightsList.appendChild(li);
        });
    }

    function clearChart(message) {
        chartContainer.innerHTML = `<div class="empty-state">${message}</div>`;
    }

    function visualizeData(populationData) {
        chartContainer.innerHTML = "";

        const width = chartContainer.clientWidth;
        const height = 320;
        const margin = { top: 20, right: 20, bottom: 50, left: 70 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select("#visualization")
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleBand()
            .domain(populationData.map((d) => d.ageGroup))
            .range([0, innerWidth])
            .padding(0.24);

        const y = d3.scaleLinear()
            .domain([0, d3.max(populationData, (d) => d.count)])
            .nice()
            .range([innerHeight, 0]);

        chart.append("g")
            .attr("class", "grid-lines")
            .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(""));

        chart.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("fill", "#4b5563");

        chart.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat((value) => formatCompact(value)))
            .selectAll("text")
            .attr("fill", "#4b5563");

        chart.selectAll(".bar")
            .data(populationData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.ageGroup))
            .attr("y", (d) => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", (d) => innerHeight - y(d.count))
            .attr("rx", 12)
            .attr("fill", "#0f766e");

        chart.selectAll(".bar-label")
            .data(populationData)
            .enter()
            .append("text")
            .attr("class", "bar-label")
            .attr("x", (d) => x(d.ageGroup) + x.bandwidth() / 2)
            .attr("y", (d) => y(d.count) - 10)
            .attr("text-anchor", "middle")
            .text((d) => formatCompact(d.count));
    }

    function formatNumber(value) {
        return new Intl.NumberFormat("en-IN").format(value);
    }

    function formatCompact(value) {
        return new Intl.NumberFormat("en-IN", {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(value);
    }

    clearChart("Choose a state and district to begin exploring the dashboard.");
});
