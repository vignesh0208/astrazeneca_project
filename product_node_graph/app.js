var app = angular.module('app', ['ngVis']);
app.controller('myCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.selectedValue = 'Product';
        $scope.filterData = [];
        $scope.org_nodes = [];
        $scope.edges = [];
        $scope.data = {
            "nodes": new vis.DataSet($scope.org_nodes),
            "edges": new vis.DataSet($scope.edges)
        };
        $scope.selectNodeValue = '';
        $scope.selectNodeValueStatus = false;
        $scope.events = {};
        $scope.viewRadioOption = false;
        $scope.selectTherapeuticArray = [];
        $scope.selectedCountry = '';
        $scope.options = {
            autoResize: true,
            height: '450',
            width: '100%',
            nodes: {
                font: {
                    size: 24,
                    color: "#efab00"
                },
                borderWidth: 2,
                borderWidthSelected: 2,
                shape: "circle",
                color: {
                    border: '#d0006f',
                    background: '#E84B9F',
                    highlight: {
                        border: '#d0006f',
                        background: '#d0006f'
                    },
                    hover: {
                        border: '#58b368',
                        background: '#94CF9F'
                    }
                },
            },
            interaction: {
                navigationButtons: true,
                keyboard: true
            },
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18
                },
                maxVelocity: 146,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: {
                    enabled: true,
                    iterations: 2000,
                    updateInterval: 50
                }
            },
            layout: {
                randomSeed: 34
            }
        };

        $scope.list = ["United Kingdom", "Canada", "Brazil", "Australia", "United States", "India"];

        function init() {
            updateValues();
        }
        init();

        // Get data from json
        function updateValues () {
            $http.get('https://raw.githubusercontent.com/vignesh0208/productdatagraph.github.io/main/data.json').then(function (response) {
                $scope.org_nodes = response.data;
                $scope.data.nodes.add(response.data);
                $scope.data.edges.add([]);
                $scope.$apply();
            });
        }

        // On click radio button update value
        $scope.filterValue = function (value) {
            $scope.onChangeSelectedvalue(value);
        }

        // On change update value based on search result
        $scope.onChangeSelectedvalue = function (selected_value) {
            updateValues ();
            var filter_country = _.filter($scope.org_nodes, ['country', $scope.selectedCountry]);
            if(selected_value === "Product" || $scope.selectedValue === 'Product') {
                displayValueChart(filter_country);
            }
            else if (selected_value === "Therapeutic") {
                var filter_therapeutic_area = _.uniqBy(filter_country, function (e) {
                    return e.therapeutic_area;
                });
                displayTherapeuticArea(filter_therapeutic_area);
            }
        }

        // Update graph edges
        function updateEdges(filtered_data) {
            for(var i = 0; i < filtered_data.length; i++) {
                if(i != 0) {
                    var new_data_edges = {
                        "from": filtered_data[0].id,
                        "to": filtered_data[i].id
                    }
                    $scope.edges.push(new_data_edges);
                }
            }
        }

        // Set therapeutic area in graph
        function displayTherapeuticArea(filter_therapeutic_data) {
            if(filter_therapeutic_data.length != 0) {
                $scope.edges = [];
                $scope.org_nodes = [];
                $scope.org_nodes.push({
                    "id": "E-"+filter_therapeutic_data[0].id,
                    "label": filter_therapeutic_data[0].country
                })
                for(var j = 0; j < filter_therapeutic_data.length; j++) {
                    var new_data_nodes = '';
                    new_data_nodes = {
                        "id": filter_therapeutic_data[j].id,
                        "label": filter_therapeutic_data[j].therapeutic_area
                    }
                    $scope.org_nodes.push(new_data_nodes)
                }
                updateEdges($scope.org_nodes);
                $scope.viewRadioOption = true;
                $scope.data.nodes.clear();
                $scope.data.edges.clear();
                $scope.data.nodes.add($scope.org_nodes);
                $scope.data.edges.add($scope.edges);
                $scope.$apply();
            } else if(filter_therapeutic_data.length === 0) {
                $scope.viewRadioOption = false;
                $scope.data.nodes.clear();
                $scope.data.edges.clear();
                updateValues();
            }
        }

        // Set country in graph
        function displayValueChart(filtered_data) {
            if(filtered_data.length != 0) {
                $scope.edges = [];
                $scope.org_nodes = [];
                updateEdges(filtered_data);
                for(var j = 0; j < filtered_data.length; j++) {
                    var new_data_nodes = '';
                    if(j === 0) {
                        new_data_nodes = {
                            "id": filtered_data[j].id,
                            "label": filtered_data[j].country,
                            "country": filtered_data[j].country,
                            "therapeutic_area": filtered_data[j].therapeutic_area
                        }
                    }
                    else {
                        new_data_nodes = {
                            "id": filtered_data[j].id,
                            "label": filtered_data[j].label,
                            "country": filtered_data[j].country,
                            "therapeutic_area": filtered_data[j].therapeutic_area
                        }
                    }
                    $scope.org_nodes.push(new_data_nodes)
                }
                $scope.viewRadioOption = true;
                $scope.data.nodes.clear();
                $scope.data.edges.clear();
                $scope.data.nodes.add($scope.org_nodes);
                $scope.data.edges.add($scope.edges);
                $scope.$apply();
            }
            else if(filtered_data.length === 0) {
                $scope.viewRadioOption = false;
                $scope.data.nodes.clear();
                $scope.data.edges.clear();
                updateValues();
            }
        }
        
        // Get seleted id in graph
        $scope.events.selectNode = function () {
            $scope.displayNodeInfo(arguments[0].nodes[0]);
            $scope.$apply();
        };

        // Set and display data seleted graph id
        $scope.displayNodeInfo = function (id) {
            var filtered_array = _.filter($scope.org_nodes, ['id', id]);
            if($scope.selectedValue === 'Product') {
                $scope.selectNodeValueStatus = true;
                $scope.selectNodeValue = filtered_array[0];
            }
            else if ($scope.selectedValue === "Therapeutic") {
                $scope.selectNodeValueStatus = false;
                var filtered_select_array = _.filter($scope.org_nodes, ['country', $scope.selectedCountry]);
                var filtered_therapeutic_array = _.filter(filtered_select_array, ['therapeutic_area', filtered_array[0].therapeutic_area]);
                $scope.selectTherapeuticArray = filtered_therapeutic_array;
            }
        }

        // Clear all data
        $scope.onClickReset = function () {
            $scope.selectedCountry = '';
            $scope.selectTherapeuticArray = [];
            $scope.selectNodeValue = ''
            $scope.selectNodeValueStatus = false;
            $scope.viewRadioOption = false;
            $scope.data.nodes.clear();
            $scope.data.edges.clear();
            updateValues();
        }
    }
]);