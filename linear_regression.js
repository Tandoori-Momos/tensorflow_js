
const express = require('express');
const tf = require('@tensorflow/tfjs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen('8080', function() {
  console.log('Listening to port 8080');
});

app.get('/', function(req,res) {
  res.render('index.ejs');
});

const plotly = require('plotly')('YashWardhan', '217Y9xCViNH4TBUoVOKn');

var n = 3;
var xs = [];
var ys = [];

function generateData(x,y, numPoints) {
  for(var i = 0; i < numPoints; i++) {
    var term = Math.random()*100;
    x[i] = term;
    y[i] = term;
  }
}

generateData(xs,ys,n);

let theta = [];
 theta[0] = 0
 theta[1] = 1;
 theta[2] = 0;
 theta[3] = 0;



function Predict(x) {
  // y = a*x^2 + b*x + c

  return theta[0] * Math.pow(x,2) + theta[1] * x + theta[0];


}



let num_vals = [];

let predictions = [];

for(var i = 0; i < n; i++) {
  num_vals[i] = Predict(i);
  predictions[i] = Predict(xs[i]);
}



plotData(1, xs, ys, n, num_vals);

function plotData(container, x, y, numPoints, h) {
  let num = [];
  let val = [];

  console.log(num);
  for(var i = 0; i < n; i++) {
    num[i]= i;
    val[i] = h[i];
  }

    var trace1 = {
      x: x,
      y: y,
      mode: "markers",
      marker: {
     color: "rgb(164, 194, 244)",
     size: 12,
     line: {
       color: "white",
       width: 0.5
     }
   },


    type: "scatter"
    };

    var trace2 = {
     x: num,
     y: val,
     mode: "lines",
     type: "scatter"
   };


    var data = [trace1, trace2];

    var layout = {
      title: "Poly Regression",
    }

    var graphOptions = {filename: "basic-line", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
  });


}
console.log(computeCost(predictions, ys, 3));



function computeCost(h, y, numPoints) {

  let sqrErrors = 0;

  for(var i = 0; i < numPoints; i++) {
    sqrErrors += Math.pow((h[i] - y[i]), 2);
    console.log(h[i] + "-" + y[i]);

  }

  return (1/2*numPoints) * sqrErrors;
}
