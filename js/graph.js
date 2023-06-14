function smartScale(min, max, mticks) {
  let minPoint;
  let maxPoint;
  let maxTicks = mticks;
  let tickSpacing;
  let range;
  let niceMin;
  let niceMax;

  /**    * Instantiates a new instance of the NiceScale class.     */
  function niceScale(min, max, mticks) {
    // minPoint = min;
    // maxPoint = max;
    // console.log(min, max, mticks)
    const mycalc = calculate(min, max, mticks);
    // console.log(mycalc)
    return {
      tickSpacing: mycalc.tickSpacing,
      niceMinimum: mycalc.niceMinimum,
      niceMaximum: mycalc.niceMaximum,
    };
  }

  /**
   * Calculate and update values for tick spacing and nice
   * minimum and maximum data points on the axis.
   */
  function calculate(minPoint, maxPoint, maxTicks) {
    // console.log(minPoint, maxPoint, maxTicks)
    const range = niceNum(maxPoint - minPoint, false);
    let tickSpacing = niceNum(range / (maxTicks - 1), true);
    let niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
    let niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
    // console.log(tickSpacing,niceMin, niceMax)
    if (tickSpacing==0){
      tickSpacing=1
      niceMin =minPoint
      niceMax=maxPoint
    }

    return {
      tickSpacing: tickSpacing,
      niceMinimum: niceMin,
      niceMaximum: niceMax,
    };
    // console.log("-",minPoint,maxPoint,niceMin,niceMax);
  }

  /**
   * Returns a "nice" number approximately equal to range Rounds
   * the number if round = true Takes the ceiling if round = false.
   *
   *  localRange the data range
   *  round whether to round the result
   *  a "nice" number to be used for the data range
   */
  function niceNum(localRange, round) {
    // const exponent; /** exponent of localRange */
    // const fraction; /** fractional part of localRange */
    let niceFraction; /** nice, rounded fraction */

    const exponent = Math.floor(Math.log10(localRange));
    const fraction = localRange / Math.pow(10, exponent);

    if (round) {
      if (fraction < 1.5) niceFraction = 1;
      else if (fraction < 3) niceFraction = 2;
      else if (fraction < 7) niceFraction = 5;
      else niceFraction = 10;
    } else {
      if (fraction <= 1) niceFraction = 1;
      else if (fraction <= 2) niceFraction = 2;
      else if (fraction <= 5) niceFraction = 5;
      else niceFraction = 10;
    }

    return niceFraction * Math.pow(10, exponent);
  }
  // console.log(min,max,mticks,niceScale(min, max, mticks))
  return niceScale(min, max, mticks);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

range = function (start, stop, step) {
  // console.log(start, stop, step)

  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  step = step || 1;

  let length = Math.max(Math.ceil((stop - start) / step), 0);
  // console.log(length,start, stop, step)
  let range = Array(length);

  for (let idx = 0; idx <= length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
};

function tsdiagram(
  divclass,
  title,
  Salinity,
  Temperature,
  Pressure,
  xtext,
  ytext,
  ztext
) {
  // console.log(window.innerWidth,window.innerHeight)
  const numspace = 9;
  const xmin = getMinOfArray(Salinity);
  const xmax = getMaxOfArray(Salinity);
  const ymin = getMinOfArray(Temperature);
  const ymax = getMaxOfArray(Temperature);
  const zmin = getMinOfArray(Pressure);
  const zmax = getMaxOfArray(Pressure);
  const {
    tickSpacing: xnspace,
    niceMinimum: xnmin,
    niceMaximum: xnmax,
  } = smartScale(xmin, xmax, numspace);
  const {
    tickSpacing: ynspace,
    niceMinimum: ynmin,
    niceMaximum: ynmax,
  } = smartScale(ymin, ymax, numspace);
  const {
    tickSpacing: znspace,
    niceMinimum: znmin,
    niceMaximum: znmax,
  } = smartScale(zmin, zmax, numspace);

  const M = 32,
    N = 32;

  const xstep = (xnmax - xnmin) / (N - 1);
  const ystep = (ynmax - ynmin) / (M - 1);

  let arr = new Array(M).fill(0).map((el) => new Array(N).fill(0));

  const res = arr.map((row, y) =>
    row.map(
      (item, x) =>
        TEOS10.gsw_rho(xnmin + xstep * x, ynmin + ystep * y, 0) - 1000
    )
  );
  let trace1 = {
    x: Salinity,
    y: Temperature,
    mode: "markers",
    // line: {},
    marker: {
      color: Pressure.map((num) => num * -1),
      showscale: true,
      colorscale: "Jet",
      cmin: -znmax,
      cmax: znmin,
      colorbar: {
        title: { text: ztext, font: { size: 11 } },
        ticktext: range(znmin, znmax, znspace),
        tickvals: range(znmin, znmax, znspace).map((num) => num * -1),
      },
    },
    type: "scatter",
    showlegend: false,
  };

  let data = {
    z: res,
    x: range(xnmin, xnmax, xstep),
    y: range(ynmin, ynmax, ystep),
    type: "contour",
    showscale: false,
    colorscale: [
      ["0.0", "rgb(169,169,169)"],
      ["1.0", "rgb(169,169,169)"],
    ],
    contours: {
      coloring: "lines",
      showlabels: true,
    },
  };

  let layout = {
    title: {
      text: title,
      y: 0.9,
    },
    // standoff: 3,
    hovermode: false,
    height: window.innerHeight * 0.8, // 600,
    width: window.innerHeight * 0.8,
    xaxis: {
      range: [xnmin, xnmax],
      showticklabels: true,
      tickvals: range(xnmin, xnmax, xnspace),
      title: {
        text: xtext,
        font: { size: 12 },
      },
      showline: true,
      mirror: true,
      ticklen: 3,
    },
    yaxis: {
      range: [ynmin, ynmax],
      showticklabels: true,
      tickvals: range(ynmin, ynmax, ynspace),
      title: {
        text: ytext,
        font: { size: 12 },
      },
      showline: true,
      mirror: true,
      ticklen: 3,
    },
  };

  let tsdiagram = [data, trace1];
  let config = { responsive: true };
  Plotly.newPlot(divclass, tsdiagram, layout, config);
}

function hexToRGB(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function depthdiagram(divclass, title, Pressure, ytext, ...args) {
  defaultcolors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
  ];
  let myarguments = {};

  let nlines = (arguments.length - 4) / 2; //3

  const numspace = 9;
  const Pressure2 = Pressure.map((num) => num * -1);
  const ymin = getMinOfArray(Pressure2);
  const ymax = getMaxOfArray(Pressure2);
  let j = 0;
  for (let i = 1; i <= nlines; i++) {
    j = i + 1;
    // console.log(i,args,(i - 1) * 2,args[(i - 1) * 2]);
    myarguments["x" + j + "data"] = args[(i - 1) * 2];
    myarguments["x" + j + "text"] = args[(i - 1) * 2 + 1];
    myarguments["x" + j + "min"] = getMinOfArray(args[(i - 1) * 2]);
    myarguments["x" + j + "max"] = getMaxOfArray(args[(i - 1) * 2]);
    let {
      tickSpacing: nspace,
      niceMinimum: nmin,
      niceMaximum: nmax,
    } = smartScale(
      myarguments["x" + j + "min"],
      myarguments["x" + j + "max"],
      numspace
    );
    myarguments["x" + j + "nspace"] = nspace;
    myarguments["x" + j + "nmin"] = nmin;
    myarguments["x" + j + "nmax"] = nmax;
  }

  const {
    tickSpacing: ynspace,
    niceMinimum: ynmin,
    niceMaximum: ynmax,
  } = smartScale(ymin, ymax, numspace);

  let data = [];

  myarguments["trace1"] = {
    x: [],
    y: Pressure2,
    name: "",
    xaxis: "x",
    // mode: "lines+markers",
    // type: "scatter",
    showlegend: false,
  };
  data.push(myarguments["trace1"]);
  // let j = 0;
  for (let i = 1; i <= nlines; i++) {
    j = i + 1;
    // console.log(i,"x"+i)
    // let z="x"+j
    myarguments["trace" + j] = {
      x: myarguments["x" + j + "data"],
      y: Pressure2,
      name: myarguments["x" + j + "text"],
      xaxis: "x" + j,
      mode: "markers", //lines+
      // line: { color: defaultcolors[i - 1], width: 1 },
      marker: { color: defaultcolors[i - 1], size: 4 },
      type: "scatter",
      showlegend: false,
    };
    data.push(myarguments["trace" + j]);
  }
  let layout = {
    title: {
      text: title,
      y: 0.91,
    },
    hovermode: false,
    // height: 800,
    height: window.innerHeight * 0.9,
    width: window.innerHeight * 0.7,
    yaxis: {
      domain: [0.33],
      range: [ynmin, ynmax],
      showticklabels: true,
      title: {
        text: ytext,
        font: { size: 12 },
      },
      zeroline: false,
      showline: true,
      mirror: true,
      ticklen: 3,
      ticktext: range(ynmin, ynmax, ynspace).map((num) => num * -1),
      tickvals: range(ynmin, ynmax, ynspace),
    },
    xaxis: {
      showticklabels: false,
      zeroline: false,
      showline: true,
      mirror: true,
      gridcolor: hexToRGB(defaultcolors[i - 1], 0.001),
    },
  };
  // let j = 0;
  let myxname = "";
  // myxname = myxname + j;
  let over = "x";
  for (let i = 1; i <= nlines; i++) {
    j = i + 1;
    myxname = "xaxis" + j;
    // myxname = myxname ;
    // over = "x";
    // console.log(myarguments["x" + j + "nmin"],
    // myarguments["x" + j + "nmax"],
    // myarguments["x" + j + "nspace"], myarguments["x" + j + "text"],myxname)

    layout[myxname] = {
      range: [myarguments["x" + j + "nmin"], myarguments["x" + j + "nmax"]],
      showticklabels: true,
      tickvals: range(
        myarguments["x" + j + "nmin"],
        myarguments["x" + j + "nmax"],
        myarguments["x" + j + "nspace"]
      ),
      title: {
        text: myarguments["x" + j + "text"],
        standoff: 3,
        font: { size: 12, color: defaultcolors[i - 1] },
      },
      zeroline: false,
      showline: true,
      linecolor: defaultcolors[i - 1],
      tickcolor: defaultcolors[i - 1],
      gridcolor: hexToRGB(defaultcolors[i - 1], 0.15),
      tickfont: { color: defaultcolors[i - 1] },
      mirror: true,
      ticklen: 3,
      overlaying: over,
      position: 0.33 - (i - 1) * 0.07,
    };
  }

  // console.log(layout,data)
  let config = { responsive: true };
  Plotly.newPlot(divclass, data, layout, config);
}

function xydiagram(divclass, title, X, xtext, Y, ytext) {
  // console.log(X,Y)
  const numspace = 9;
  const ymin = getMinOfArray(Y);
  const ymax = getMaxOfArray(Y);
  const xmin = getMinOfArray(X);
  const xmax = getMaxOfArray(X);
  // console.log(ymin,ymax)
  const {
    tickSpacing: xnspace,
    niceMinimum: xnmin,
    niceMaximum: xnmax,
  } = smartScale(xmin, xmax, numspace);
 
  const {
    tickSpacing: ynspace,
    niceMinimum: ynmin,
    niceMaximum: ynmax,
  } = smartScale(ymin, ymax, numspace);
  
  let trace1 = {
    x: X,
    y: Y,
    name: xtext,
    mode: "markers", ///lines+
    marker: { size: 4 },
    type: "scatter",
    showlegend: false,
  };

  let layout = {
    title: {
      text: title,
      // standoff: 3,
      y: 0.9,
    },
    hovermode: false,
    height: window.innerHeight * 0.8, // 600,
    width: window.innerHeight * 0.8,
    // height: 600,
    xaxis: {
      range: [xnmin, xnmax],
      showticklabels: true,
      title: {
        text: xtext,
        standoff: 3,
        font: { size: 12 },
      },
      showline: true,
      mirror: true,
      ticklen: 3,
      tickvals: range(xnmin, xnmax, xnspace),
      ticktext: range(xnmin, xnmax, xnspace),
    },

    yaxis: {
      range: [ynmin, ynmax],
      showticklabels: true,
      title: {
        text: ytext,
        standoff: 3,
        font: { size: 12 },
      },
      zeroline: false,
      showline: true,
      mirror: true,
      ticklen: 3,
      ticktext: range(ynmin, ynmax, ynspace),
      tickvals: range(ynmin, ynmax, ynspace),
    },
  };
  let config = { responsive: true };
  Plotly.newPlot(divclass, [trace1], layout, config);
}

//   xydiagram('myDiv1',"h1",
//   Temperature,
//     "Temperature <i>t</i> ,°C",
//     Salinity,
//     "Salinity <i>S</i><sub>p</sub>"
//   );

//   tsdiagram('myDiv2', Salinity, Temperature, Pressure,"Salinity <i>S</i><sub>p</sub>","Temperature <i>t</i> ,°C","Pressure <i>p</i>, dbar")

//   depthdiagram('myDiv3',"h3",
//     Pressure,
//     "Pressure <i>p</i>, dbar",
//     Salinity,
//     "Salinity <i>S</i><sub>p</sub>",
//     Temperature,
//     "Temperature <i>t</i> ,°C",
//     Pressure,
//     "Pressure <i>p</i>, dbar"
//   );
