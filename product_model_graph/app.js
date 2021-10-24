// Average response time per month
new Chart(document.getElementById("average_response_time"), {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
        datasets: [{ 
            data: [44,74,45,72,59,61,35,59,94,74],
            borderColor: "#f62468",
            pointBackgroundColor: "#f62468",
            pointRadius: 4,
            fill: false,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {   
            legend: {
                display: false
            }
        },
        interaction: {
            intersect: false,
        },
        tooltips: {
            enabled: false
        },
        scales: {
            x: {
                display: true,
            },
            y: {
                display: false,
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    }
});

// No of request not responded per month
new Chart(document.getElementById("average_not_response_time"), {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
        datasets: [{ 
            data: [56,26,55,28,41,39,65,41,6,26],
            borderColor: "#f62468",
            pointBackgroundColor: "#f62468",
            fill: false,
            pointRadius: 4,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {   
            legend: {
                display: false
            }
        },
        interaction: {
            intersect: false,
        },
        tooltips: {
            enabled: false
        },
        scales: {
            x: {
                display: true,
            },
            y: {
                display: false,
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    }
});

// Average no of request per month
new Chart(document.getElementById("average_no_of_request"), {
    type: "bar",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
      datasets: [{
            data: [24,78,52,67,73,47,84,43,73],
            borderColor: "#a1cdf4",
            backgroundColor: "#a1cdf4",
        }]
    },
    options: {
        responsive: true,
        plugins: {   
            legend: {
                display: false
            }
        }
    }
});

// No of Request per product and product type
new Chart(document.getElementById("product_and_product_type"), {
    type: "bar",
    data: {
        labels: [6, 12, 14, 2, 1, 10, 9, 7, 20, 17, 16],
        datasets: [
            {
                label: "Product",
                backgroundColor: "#a1cdf4",
                data: [45, 13, 13, 19, 12, 22, 53, 71, 25, 12, 11]
            },
            {
                label: "Product Tpye",
                backgroundColor: "#f62468",
                data: [29, 57, 25, 46, 17, 12, 50, 13, 13, 12, 10]
            }
        ]
    },
    options: {
        plugins: {
            legend: { 
                display: true,
                position: "right" 
            }
        }
    }
});

// No of Verbal/written response with respect to country
google.charts.load("current", {
    "packages": ["geochart"],
});
google.charts.setOnLoadCallback(drawCountryMap);

function drawCountryMap() {
    var data = google.visualization.arrayToDataTable([
        ["Country", "Verbal Response", "Written Response"],
        ["United Kingdom", 110, 71],
        ["Canada", 24, 18],
        ["Brazil", 95, 17],
        ["Australia", 90, 130],
        ["United States", 75, 15],
        ["India", 60, 24]
    ]);

    var options = {
        colorAxis: {colors: ["green", "blue"]}
    };

   var chart = new google.visualization.GeoChart(document.getElementById("verbal_written_response"));
   chart.draw(data, options);
};

// Highest request rate based on country
google.charts.load("current", {
    "packages": ["geochart"],
});
google.charts.setOnLoadCallback(drawMarkersMap);

function drawMarkersMap() {
    var data = google.visualization.arrayToDataTable([
        ["Country", "Highest Request Rate"],
        ["United Kingdom", 110]
    ]);

    var options = {
        colorAxis: {colors: ["green"]}
    };

   var chart = new google.visualization.GeoChart(document.getElementById("highest_request_rate"));
   chart.draw(data, options);
};

// Word cloud based on request Details
anychart.onDocumentReady(function() {
    var data = [
        {"x": "United Kingdom", "value": 909},
        {"x": "Canada", "value": 983},
        {"x": "Brazil", "value": 544},
        {"x": "Australia", "value": 527},
        {"x": "United States", "value": 422},
        {"x": "India", "value": 581},
        {"x": "Russian", "value": 567},
        {"x": "German", "value": 629},
        {"x": "Persian", "value": 721}
    ];
    var chart = anychart.tagCloud(data);
    chart.tooltip(false);
    chart.angles([0])
    var customColorScale = anychart.scales.linearColor();
    customColorScale.colors(["#f62468", "#efab00"]);
    chart.colorScale(customColorScale);
    chart.colorRange(true);
    chart.colorRange().length('100%');
    chart.legend(false);
    chart.container("word_cloud");
    chart.draw();
});

// No of Response time taken more than 3 days per month.
new Chart(document.getElementById("no_of_response_time"), {
    type: "line",
    data: {
        labels: ["June", "July", "August", "September"],
        datasets: [{ 
            data: [59,94,74,76],
            borderColor: "#f62468",
            pointBackgroundColor: "#f62468",
            fill: false,
            pointRadius: 4,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {   
            legend: {
                display: false
            }
        },
        interaction: {
            intersect: false,
        },
        tooltips: {
            enabled: false
        },
        scales: {
            x: {
                display: true,
            },
            y: {
                display: false,
            }
        }
    }
});