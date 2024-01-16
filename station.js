// Data for the table
const tableData = [
    { parameter: 'Time PM', value: '17.00 WIB', status: 'Normal' },
    { parameter: 'VAB', value: '221 V', status: 'Normal' },
    { parameter: 'VBC', value: '222 V', status: 'Normal' },
    { parameter: 'VCA', value: '223 V', status: 'Normal' },
    { parameter: 'VAVG', value: '223 V', status: 'Normal' },
    { parameter: 'CA', value: '20 A', status: 'Normal' },
    { parameter: 'CB', value: '20 A', status: 'Normal' },
    { parameter: 'CC', value: '20 A', status: 'Normal' },
    { parameter: 'CAVG', value: '20 A', status: 'Normal' },
    { parameter: 'WT', value: '200 W', status: 'Normal' },
    { parameter: 'VART', value: '0 VAR', status: 'Normal' },
    { parameter: 'VAT', value: '200 VA', status: 'Normal' },
    { parameter: 'CosPhi', value: '1.0', status: 'Normal' },
    { parameter: 'Freq', value: '50 Hz', status: 'Normal' },
    { parameter: 'EI', value: '100 kWh', status: 'Normal' },
    { parameter: 'EE', value: '99 kWh', status: 'Normal' },
    { parameter: 'REI', value: '1 kWh', status: 'Normal' },
    { parameter: 'REE', value: '0.5 kWh', status: 'Normal' },
  ];
  
// Function to set the content for a specific parameter
function setParameterValue(parameterName) {
  const entry = tableData.find(entry => entry.parameter === parameterName);
  if (entry) {
    document.getElementById(parameterName).textContent = entry.value;
  }
}

// Set values for all parameters in tableData at regular intervals
function updateTableData() {
  tableData.forEach(entry => {
    const element = document.getElementById(entry.parameter);
    if (element) {
      setParameterValue(entry.parameter);
    } else {
      console.warn(`Element with ID ${entry.parameter} not found.`);
    }
  });
}

// Update the table data every 5 seconds (adjust the interval as needed)
updateTableData();
setInterval(updateTableData, 5000);


document.addEventListener("DOMContentLoaded", () => {
  var time = "2024-01-16"
  new ApexCharts(document.querySelector("#reportsChart"), {
    series: [{
      name: 'V A-B',
      data: [31, 40, 28, 51, 42, 82, 56],
    }, {
      name: 'V B-C',
      data: [11, 32, 45, 32, 34, 52, 41]
    }, {
      name: 'V C-A',
      data: [15, 11, 32, 18, 9, 24, 11]
    }],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      },
    },
    markers: {
      size: 4
    },
    colors: ['#4154f1', '#2eca6a', '#ff771d'],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'datetime',
      min : new Date(time + " 00:00").getTime(),
    },
    tooltip: {
      x: {
        // format: 'dd/MM/yy HH:mm'
        format: 'yyyy-MM-dd HH:mm'
      },
    }
  }).render();
});

  
  