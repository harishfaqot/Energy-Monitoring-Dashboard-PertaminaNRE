const firebaseConfig = {
  apiKey: "AIzaSyDdQrkGN6prSgUhXkIcuzV91jkBY7ncf6Q",
  authDomain: "pertaminanre-c2d3e.firebaseapp.com",
  databaseURL: "https://pertaminanre-c2d3e-default-rtdb.firebaseio.com",
  projectId: "pertaminanre-c2d3e",
  storageBucket: "pertaminanre-c2d3e.appspot.com",
  messagingSenderId: "27244440449",
  appId: "1:27244440449:web:420d7e77ca96f3290c1680"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

showToday();

function getData(Xmin, Xmax){
  // const data = db.ref("station1/data");
  var ref = db.ref('station1/data');

  ref.orderByKey().startAt(String(parseInt(Xmin/1000))).endAt(String(parseInt(Xmax/1000))).on('value', handleSuccess, handleError);

  function handleError(error){
    console.log(error);
  };
  
  
  function handleSuccess(snapshot) {
    const key = snapshot.key;
    const data = snapshot.val();
    // console.log(key);
    console.log(data);
    const mapData = (property) => Object.keys(data).map((timestamp) => ({ x: parseInt(timestamp) * 1000, y: data[timestamp][property]}));

    const VAB = mapData("VAB");
    const VBC = mapData("VBC");
    const VCA = mapData("VCA");

    const CA = mapData("CA");
    const CB = mapData("CB");
    const CC = mapData("CC");

    const WT = mapData("WT");
    const VART = mapData("VART");
    const VAT = mapData("VAT");

    voltageData = [{name: "Voltage A-B", data: VAB}, {name: "Voltage B-C", data: VBC}, {name: "Voltage C-A", data: VCA}];
    currentData = [{name: "Current A", data: CA}, {name: "Current B", data: CB}, {name: "Current C", data: CC}];
    powerData = [{name: "Active Power", data: WT}, {name: "Reactive Power", data: VART}, {name: "Apparent Power", data: VAT}];

    publishChart("#Voltage", voltageData, Xmin, Xmax);
    publishChart("#Current", currentData, Xmin, Xmax);
    publishChart("#Power", powerData, Xmin, Xmax);
  }
  
}

function showToday(){
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const min = currentDate.getTime();
  currentDate.setHours(23, 59, 59, 999);
  const max = currentDate.getTime();

  console.log(min, max);
  getData(min, max)
}

function showMonth(){
  const currentDate = new Date();

  currentDate.setDate(1);
  currentDate.setHours(0, 0, 0, 0);
  const min = currentDate.getTime();

  currentDate.setMonth(currentDate.getMonth() + 1, 0);
  currentDate.setHours(23, 59, 59, 999);
  const max = currentDate.getTime();

  console.log(min, max);
  getData(min, max);
}

function showYear(){
  const currentDate = new Date();

  currentDate.setMonth(0, 1);
  currentDate.setHours(0, 0, 0, 0);
  const min = currentDate.getTime();
  
  currentDate.setFullYear(currentDate.getFullYear() + 1, 0, 0);
  currentDate.setHours(23, 59, 59, 999);
  const max = currentDate.getTime();
  
  console.log(min, max);
  getData(min, max);
}

function publishChart(idName, data, Xmin, Xmax){
  console.log(data[0].data[0].y)
  var options = {
    series: data,
    chart: {
      height: 350,
      type: 'area',
      toolbar: {show: false},
    },
    colors: ["#4154f1", "#2eca6a", "#ff771d"],
    // markers: {
    //   size: 4,
    // },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.6,
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
    yaxis: {min: (data[0].data[0].y)-10, max: (data[0].data[0].y)+10 },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      },
      min: Xmin,
      max: Xmax
    },
    tooltip: {
      x: {
        format: 'yyyy-MM-dd HH:mm'
      },
    }
  }
  var chart = new ApexCharts(document.querySelector(idName), options);
  chart.render();
}

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
