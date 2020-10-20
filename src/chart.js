var ctx = document.getElementById('myChart').getContext('2d');
// myChart.defaults.line.spanGaps = true;
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '',
            data: [23, 27, 30, 25, 18, 23],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            
            
            borderWidth: 1
        }]
    },
    options: {
       
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    beginAtZero: true,
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    color: "rgba(0, 0, 0, 0)",
                },
            }],
        },
        tooltips: {
            mode: 'index',
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            titleFontSize: 22,
            bodyFontColor: '#000',
        }
    }
});

