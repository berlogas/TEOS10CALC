function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

function isAN(value) {
  // console.log("value=",value)
  if (value instanceof Number) value = value.valueOf(); // Если это объект числа, то берём значение, которое и будет числом
  // console.log("value=",value, typeof value, parseFloat(value), typeof parseFloat(value))
  return isFinite(value) && value === parseFloat(value);
}

function readTextFile(file) {
  let allText;
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return allText;
}

function cleanDoubleSpaces(str) {
  return str.replace(/\s{2,}/g, " ").trim();
}

function csvToArray(str, delimiter = ",") {
  let headers = cleanDoubleSpaces(str.slice(0, str.indexOf("\n"))).split(
    delimiter
  );
  let rows = str.slice(str.indexOf("\n") + 1).split("\n");
  let inorder = 0;
  rows = rows.filter(function (el) {
    return (el != null && el != "") || el === 0;
  });
  const arr = rows.map(function (row) {
    const values = cleanDoubleSpaces(row).split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  return arr;
}

function guessDelimiters(text, possibleDelimiters) {
  return possibleDelimiters.filter(weedOut);

  function weedOut(delimiter) {
    let cache = -1;
    return text.split("\n").every(checkLength);

    function checkLength(line) {
      if (!line) {
        return true;
      }
      let length = line.split(delimiter).length;
      if (cache < 0) {
        cache = length;
      }
      return cache === length && length > 1;
    }
  }
}

function convertToCsv(fName, rows) {
  let csv = "";
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    for (let j = 0; j < row.length; j++) {
      let val = row[j] === null ? "" : row[j].toString();
      val = val.replace(/\t/gi, " ");
      if (j > 0) csv += ",";
      csv += val;
    }
    csv += "\n";
  }
  // for UTF-16
  let cCode,
    bArr = [];
  bArr.push(255, 254);
  for (let i = 0; i < csv.length; ++i) {
    cCode = csv.charCodeAt(i);
    bArr.push(cCode & 0xff);
    bArr.push((cCode / 256) >>> 0);
  }

  let blob = new Blob([new Uint8Array(bArr)], {
    type: "text/csv;charset=UTF-16LE;",
  });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, fName);
  } else {
    let link = document.createElement("a");
    if (link.download !== undefined) {
      let url = window.URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }
}

function stepround(value, step) {
  step || (step = 1.0);
  let inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

function roundNumber(num, scale) {
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale) + "e-" + scale);
  } else {
    let arr = ("" + num).split("e");
    let sig = "";
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    let i = +arr[0] + "e" + sig + (+arr[1] + scale);
    let j = Math.round(i);
    let k = +(j + "e-" + scale);
    return k;
  }
}
function newfilename(str) {
  let m = str.search(/_\#([0-9]+)/) + 1;
  let str2 = str.replace(/_\#([0-9]+)/, "");
  let delta = str.length - str2.length;
  let nums = str.slice(m, m + delta);
  let num = +nums.slice(1, nums.length) + 1;
  let nums2 = "_#" + num.toString();
  let str3 = str2 + nums2;
  return str3;
}
function roundPlus(x, n) {
  //x - число, n - количество знаков
  if (isNaN(x) || isNaN(n)) return false;
  let m = Math.pow(10, n);
  return Math.round(x * m) / m;
}

function encodeHTMLEntities(text) {
  let textArea = document.createElement('textarea');
  textArea.innerText = text;
  console.log(textArea.innerHTML)
  return textArea.innerHTML;
}