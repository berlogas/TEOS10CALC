let text2 = document.querySelector(".text2 p");
text2.innerHTML = text2.innerText
  .split("")
  .map((char, i) => `<b style="transform:rotate(${i * 8}deg)">${char}</b>`)
  .join("");
let text1 = document.querySelector(".text1 p");
text1.innerHTML = text1.innerText
  .split("")
  .map((char, i) => `<b style="transform:rotate(${i * 5.8}deg)">${char}</b>`)
  .join("");

let lcount = 1;

$(document).ready(function () {
  document.getElementById("fname").style.display = "block";
  document.getElementById("fname").style.marginTop="70px";
  document.getElementById("circletext1").style.display = "block";
  document.getElementById("downloadbutton").style.display = "block";
  document.getElementById("manualbutton").style.display = "block";
  document.getElementById("graphbutton").style.display = "block";
  

  window.onchange = function (event) {
    if (event.target.id == "xid") {
      // console.log("2", event.target.id, document.getElementById("xid").value)
      document.getElementById("diagramxtitle").value =
        document.getElementById("xid").value;
    }
    if (event.target.id == "yid") {
      // console.log("2", event.target.id, document.getElementById("xid").value)
      document.getElementById("diagramytitle").value =
        document.getElementById("yid").value;
    }

    for (i = 1; i < lcount; i++) {
      if (event.target.id == "x" + i + "id") {
        // console.log(i, lcount);
        document.getElementById("diagramx" + i + "title").value =
          document.getElementById("x" + i + "id").value;
      }
    }

    // console.log("2", event.target.id);
    if (event.target.id == "x" + lcount + "id") {
      document.getElementById("diagramx" + lcount + "title").value =
        document.getElementById("x" + lcount + "id").value;

      // console.log("можно добавлять");
      let dddiv = document.querySelector("#dddiv");
      let d1 = document.querySelector("#d1");

      let div = document.createElement("div");
      lcount++;

      newHTML = replaceAll(
        document.getElementById("d1").innerHTML,
        "x1",
        "x" + lcount
      );
      div.innerHTML = newHTML;
      dddiv.appendChild(div);
      document.getElementById("diagramx" + lcount + "title").value =
      LangLoad("diagramxntitle") + lcount;
    }
  };

  let modald = document.getElementById("myDiagram");
  let modal = document.getElementById("myModal");

  // Get the button that opens the modal
  let btn = document.getElementById("graphbutton");
  let cc = document.getElementById("cc");
  let dd = document.getElementById("dd");
  let ts = document.getElementById("ts");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    addselectgraph(yytitle);
    modal.style.display = "block";
  };

  ts.onclick = function () {
    let title = document.getElementById("tsdiagramtitle").value;
    console.log(title)
    document.getElementById("diagramtitle").innerText = title;
    // let xtitle = document.getElementById("diagramxtitle").value;

    // let title = LangLoad("tsdiagramtitle") //document.getElementById("tsdiagramtitle").value;
    // document.getElementById("tsdiagramtitle").innerText = title;
    // document.getElementById("tsdiagramtitle").value = title;
    let stitle = document.getElementById("diagramstitle").value;
    let sid = document.getElementById("sid").value;
    let ttitle = document.getElementById("diagramttitle").value;
    let tid = document.getElementById("tid").value;
    let ptitle = document.getElementById("diagramptitle").value;
    let pid = document.getElementById("pid").value;

    let sarray = [];
    let tarray = [];
    let parray = [];
    dataarray.forEach(function (entry) {
      // const renamedObj = renameKeys(entry, newKeys);
      if (entry[sid]) sarray.push(entry[sid]);
      if (entry[tid]) tarray.push(entry[tid]);
      if (entry[pid]) parray.push(entry[pid]);
    });

    if (sarray.length > 0 && tarray.length > 0 && parray.length > 0) {
      modald.style.display = "block";

      tsdiagram(
        "myDiv1",
        title,
        sarray,
        tarray,
        parray,
        stitle,
        ttitle,
        ptitle
      );
    } else
      new Toast({
        title: false,
        // text: "Файл не выбран либо его формат не поддерживается!",
        text: LangLoad("htmlwarning3"),
        theme: "warning",
        autohide: true,
        interval: 5000,
      });
  };

  dd.onclick = function () {
    // alert(lcount);
    let title = document.getElementById("dddiagramtitle").value;
    document.getElementById("diagramtitle").innerText = title;
    let dtitle = document.getElementById("diagramdtitle").value;
    let did = document.getElementById("did").value;

    let x1title = document.getElementById("diagramx1title").value;
    let x1id = document.getElementById("x1id").value;
    // let ptitle = document.getElementById("ptitle").value;
    // let pid = document.getElementById("pid").value;

    let darray = [];

    let params = [];
    let dataname = "";
    for (i = 1; i < lcount; i++) {
      dataname = "x" + i + "array";
      titlename = "diagramx" + i + "title";
      idname = "x" + i + "id";

      params.push({
        dataname: [],
        titlename: document.getElementById(titlename).value,
        idname: document.getElementById(idname).value,
      });
    }

    // console.log(params);

    let x1array = [];

    dataarray.forEach(function (entry) {
      if (entry[did]) darray.push(entry[did]);

      for (i = 1; i < lcount; i++) {
        dataname = "x" + i + "array";
        titlename = "diagramx" + i + "title";
        idname = "x" + i + "id";
        x = document.getElementById(idname).value;
        if (entry[x]) {
          params[i - 1].dataname.push(entry[x]);
        }
      }
    });

    if (darray.length > 0) {
      modald.style.display = "block";

      argi = ["myDiv1", title, darray, dtitle]; //, params[0].dataname, params[0].titlename]
      for (i = 1; i < lcount; i++) {
        if (params[i - 1].dataname.length > 0) {
          argi.push(params[i - 1].dataname, params[i - 1].titlename);
        }
      }
      depthdiagram(...argi);
    } else
      new Toast({
        title: false,
        // text: "Файл не выбран либо его формат не поддерживается!",
        text: LangLoad("htmlwarning3"),
        theme: "warning",
        autohide: true,
        interval: 5000,
      });
  };

  cc.onclick = function () {
    let title = document.getElementById("ccdiagramtitle").value;
    document.getElementById("diagramtitle").innerText = title;
    let xtitle = document.getElementById("diagramxtitle").value;
    let xid = document.getElementById("xid").value;
    let ytitle = document.getElementById("diagramytitle").value;
    let yid = document.getElementById("yid").value;

    let xarray = [];
    let yarray = [];
    dataarray.forEach(function (entry) {
      if (entry[xid]) xarray.push(entry[xid]);
      if (entry[yid]) yarray.push(entry[yid]);
    });
    if (xarray.length > 0 && yarray.length > 0) {
      modald.style.display = "block";

      xydiagram("myDiv1", title, xarray, xtitle, yarray, ytitle);
    } else
      new Toast({
        title: false,
        // text: "Файл не выбран либо его формат не поддерживается!",
        text: LangLoad("htmlwarning3"),
        theme: "warning",
        autohide: true,
        interval: 5000,
      });
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function (event) {
    // console.log("1", event.target.id);
    if (event.target.id == "myModal") {
      modal.style.display = "none";
    }
    if (event.target.id == "myDiagram") {
      modald.style.display = "none";
    }
    // modald.style.display = "none";
    // modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    // console.log("2", event.target.id);
    if (event.target.id == "myModal") {
      modal.style.display = "none";
    }
    if (event.target.id == "myDiagram") {
      modald.style.display = "none";
      // modal.style.display = "none";
    }
  };

  // console.log("$(document).ready2");
  myvars.forEach((element1) => {
    id1 = "mo" + element1.input;
    id2 = "in" + element1.input;
    id3 = "v" + element1.input;
    const [
      name,
      paramset,
      funcname,
      places,
      num,
      selectplus,
      blacklist,
      alias,
      convonly,
      description,
    ] = getparams(id1.slice(2));

    $("#" + id3).dblclick(function () {
      const langlabel=LangLoad(myvars.find((el) => el.input === name).input)
      let mylabel = langlabel; //myvars.find((el) => el.input === name).label;
      const langdescription=LangLoad(myvars.find((el) => el.input === name).input+"_description")
      let mydescription = langdescription; //myvars.find((el) => el.input === name).label;
      // console.log(mydescription)
      new Toast({
        // title: mylabel,
        title: mylabel,
        // text: "Файл не выбран либо его формат не поддерживается!",
        text: mydescription,
        theme: "default",
        autohide: true,
        interval: 30000,
      });
      document
        .querySelectorAll(".toast__header")
        .forEach((toast__header, index, arr) => {
          if (index === arr.length - 1) {
            toast__header.innerHTML = `${mylabel}`;
          }
        });
      document
        .querySelectorAll(".toast__body")
        .forEach((toast__body, index, arr) => {
          if (index === arr.length - 1) {
            toast__body.innerHTML = `${mydescription}`;
          }
        });
    });
    $("#" + id1 + ",#" + id2 + ",#" + id3).hover(
      function () {
        // console.log("hover1");
        // document.getElementsByName("v" + element1.input)[0].style =
        //   "color: var(--bgr2); text-shadow: 0 0 1px var(--clr),  0 0 3px var(--clr),   0 0 5px var(--clr),  0 0 7px var(--clr),  0 0 9px var(--clr);";
        document.getElementsByName("v" + element1.input)[0].style =
        "color:var(--clr); text-shadow: 0 0 1px var(--bgr2), 0 0 2px var(--bgr2),  0 0 3px var(--bgr2),   0 0 5px var(--bgr2),  0 0 8px var(--bgr2),  0 0 10px var(--bgr2);";

        paramset.forEach(function (element2) {
          // console.log(element2)
          if (!isAN(element2))
            document.getElementsByName("l" + element2)[0].style =
              "color:var(--clr); text-shadow: 0 0 1px var(--bgr2), 0 0 2px var(--bgr2),  0 0 3px var(--bgr2),   0 0 5px var(--bgr2),  0 0 8px var(--bgr2),  0 0 10px var(--bgr2);";
        });
      },

      function () {
        // console.log("hover2");
        document.getElementsByName("v" + element1.input)[0].style =
          "color: var(--clr2);";

        paramset.forEach(function (element2) {
          if (!isAN(element2))
            document.getElementsByName("l" + element2)[0].style =
              "color: var(--clr2);";
        });
      }
    );
  });

  // console.log("$(document).ready3");
  $("#addPoints").keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  $(".inname").on("change", function () {
    const newarr1 = mydata.map((x) => x.input);
    const newarr2 = myvars.map((x) => x.input);
    const allinname = [...document.getElementsByClassName("inname")]; // из select данных выбираем непустые
    const allinname2 = allinname.filter(
      (f) => f.style.display === "block" && f.id != this.id
    );
    const allinname3 = allinname2.map((f) => f.value);
    const result = [...yytitle, ...newarr1, ...newarr2, ...allinname3];
    let nnn = this.value;
    let i = 1;
    while (result.includes(nnn)) {
      nnn = this.value + "(" + i + ")";
      i++;
    }
    this.value = nnn;
    selstatus[this.id.slice(2)] = this.value;
  });
});

let TEOS10 = new TEOS10_gsw_oceanographic_toolbox();
let GSW_saar = new TEOS10_gsw_saar();
// var p_sal=TEOS10.gsw_sa_from_sp(35.0, 100.0, 260.0, 20.0);

// $(document).ready(function () {});

fname = "";
// Элемент для выбора файлов.
const INPUT = document.querySelector('input[name="myfile"]');
// Элемент для вывода сгенерированной таблицы.
const PREVIEWT1 = document.querySelector("#center1");
const PREVIEWT2 = document.querySelector("#center2");
// Регулярное выражение для проверки расширения файла.
const REGEX = new RegExp("(.*?).(csv|txt)$", "i");
// Регистрируем функцию обработчика события `change`,
// срабатывающего при изменении элемента выбора файла.
INPUT.addEventListener("change", handleFile);
$(".table-container").hide();
$(".graph-container").hide();
$(".form-container").show();
$(".edit-container").hide();
// 
drawingvars();
// console.log(lang.type)
if (lang.type=="en") {filllang(en)} else {filllang(ru)}

// Функция, отрабатывающая при выборе файла.
function handleFile(event) {
  const file = event.target.files[0];

  if (file && REGEX.test(file.name)) {
    document.getElementById("circletext1").style.display = "none";
    document.getElementById("circletext2").style.display = "block";
    document.getElementById("enterbutton").style.display = "block";
    document.getElementById("startfile").style.marginTop = "0px";
    document.getElementById("nav").style.display = "block";
    document.getElementById("decor").style.width = "auto"
    document.getElementById("decor").style.marginRight = "0px"

    fname = file.name;
    const reader = new FileReader();
    reader.onload = (e) => renderTable(e.target.result);
    reader.readAsText(file);
    document.getElementById("fname").innerHTML = fname;
  } else {
    // alert("Файл не выбран либо его формат не поддерживается.");
    new Toast({
      title: false,
      // text: "Файл не выбран либо его формат не поддерживается!",
      text: LangLoad("htmlwarning1"),
      theme: "warning",
      autohide: true,
      interval: 5000,
    });
    event.target.value = "";
  }
}

function drawingvars() {
  myvars.forEach((element) => {
    let vars = document.querySelector("#vars" + element.tab);
    const langlabel=LangLoad(element.input)
    vars.innerHTML +=
      // ${element.input} ${element.label}
      `<div class="grid grid-parameter">
        <span name="v${element.input}" id="v${element.input}" class="label" >${langlabel}</span>
        <label
          class="toggle-switchy"
          id="mo${element.input}"
          for="tg${element.input}"
          data-size="xs"
          data-style="rounded"
          data-text="false"
        >
          <input
            type="checkbox"
            id="tg${element.input}"
            onchange="getComboB(this)"
          />
          
          <span class="toggle">
            <span class="switch"></span>
          </span>
        </label>
        <div>
        <input
          class="inname"
          type="text"
          id="in${element.input}"
          value="${element.input}"
          style="display: none"
          onfocus="this.oldvalue = this.value;"
          onchange="getComboC(this);this.oldvalue = this.value;"
        />
        </div><div>
        <input type="checkbox" class="css-checkbox" id="cb${element.input}" style="display: none" />
          <label for="cb${element.input}"  id="lcb${element.input}" style="display: none" name="checkbox7_lbl" class="css-label lite-x-gray" ></label>
          </div></div>`;
  });
  const datas = document.querySelector("#datas");
  mydata.forEach((element) => {
    let datashtml = ``;
    let ttt = addstatus[element.input];
    const langlabel=LangLoad(element.input)
    // console.log(langlabel)
    if (element.input === "") {
      datas.innerHTML += `<div class="grid grid-initdata"></div>`;
    } else {
      datashtml += `<div class="grid grid-initdata">
      <div>
        <label name="l${element.input}" id="l${element.input}" class="label">
        ${langlabel}
        </label>
      </div>
      <div id="toleft"> 
        <select
          class="dataselect"
          id="${element.input}"
          name="${element.input}"
          onchange="getComboA(this)"
        >
          <option>...</option>
        </select>`;
      if (element.input === "latitude") {
        datashtml += `
        <span>  
        <input
          type="number"
          id="_ilato"
          name="lat"
          value="58.6"
          step="any"
          min="-90"
          max="90"
          onchange="getComboD(this)"
        />
        </span>`;
      }
      if (element.input === "longitude") {
        datashtml += `
        <span>  
        <input type="number"
          id="_ilono"
          name="lon"
          value="20.4"
          step="any"
          min="-180"
          max="180"
          onchange="getComboD(this)"
        />
        </span>`;
      }
      datashtml += `</div>
    </div>`;
    }
    datas.innerHTML += datashtml;
    
  });

  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById("eos80").style.display = "block";
  document.getElementsByClassName("tablinks")[0].className += " active";
}

function drawingtable(dataarray) {
  $(".table-container").show();
  document.getElementById("fname").style.marginTop="0px";
  limit = dataarray.length;
  // document.querySelector("#"+key).innerText=LangLoad(key)
  // text2 = htmltotallines + limit;
  text2 = LangLoad("htmltotallines");
  let h5s = document.querySelector("#htmltotallines");
  h5s.textContent = text2;
  let h5l = document.querySelector("#limit");
  h5l.textContent = limit;
  let table1 = document.createElement("table");
  let table2 = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  table1.classList.add("table");
  table1.classList.add("resp-tab");
  $("table1").attr("id", "resp-tab");
  table2.classList.add("table");
  table2.classList.add("resp-tab");
  $("table2").attr("id", "resp-tab");
  tbody.classList.add("tbody");
  // Заголовок таблицы
  let trow = document.createElement("tr");
  let i = 0;
  Object.entries(dataarray[0]).forEach((entry2) => {
    const [key, cell] = entry2;
    // Создадим элемент ячейки для таблицы.
    let tcell = document.createElement("th");
    tcell.setAttribute("id", "tab" + i);
    // Заполним содержимое ячейки.
    tcell.textContent = key;
    // Добавляем ячейку к родительской строке.
    trow.appendChild(tcell);
  });
  // Добавляем строку к родительскому элементу.
  thead.appendChild(trow);

  Object.entries(dataarray).forEach((entry) => {
    const [index, value] = entry;
    // Создадим элемент строки для таблицы.
    let trow = document.createElement("tr");
    Object.entries(value).forEach((entry2) => {
      const [key2, cell] = entry2;
      // Создадим элемент ячейки для таблицы.
      let tcell = document.createElement("td");
      tcell.setAttribute("id", "tab" + i);
      // Заполним содержимое ячейки.
      tcell.textContent = cell;
      // Добавляем ячейку к родительской строке.
      trow.appendChild(tcell);
    });
    // Добавляем строку к родительскому элементу.
    tbody.appendChild(trow);
  });

  // Добавляем заголовок таблицы к родительскому элементу.
  table1.appendChild(thead);
  // Добавляем тело таблицы к родительскому элементу.
  table2.appendChild(tbody);
  // Очищаем элемент для вывода таблицы.Добавляем саму таблицу к родительскому элементу.
  PREVIEWT1.innerHTML = "";
  PREVIEWT1.appendChild(table1);
  PREVIEWT2.innerHTML = "";
  PREVIEWT2.appendChild(table2);

  yytitle = [];
  yytitle = Object.keys(dataarray[0]);

  $(".edit-container").show();

  return yytitle;
}

function addselectgraph(yytitle) {
  let sels = document.getElementsByClassName("graphselect");
  // очистка всех option
  // for (var i = 0; i < sels.length; i++) {
  //   // if (sels[i].id == sels[i].name) {
  //   let x = document.getElementById(sels[i].id);
  //   for (var j = x.length - 1; j >= 0; j--) {
  //     if (x.options[j].value != "...") {
  //       x.remove(j);
  //     }
  //   }
  // }
  // заполнение всех option
  for (let i = 0; i < sels.length; i++) {
    let x = document.getElementById(sels[i].id);
    const xlenbefore = x.length;
    if (x.length == 1) {
      yytitle.forEach(function (item, i, arr) {
        // all columns
        let option = new Option(item, item);
        x.appendChild(option);
      });
    } else if (yytitle.length > x.length - 1) {
      // added on calculation
      yytitle.forEach(function (item, i, arr) {
        if (i >= xlenbefore - 1) {
          let option = new Option(item, item);
          x.appendChild(option);
        }
      });
    }
  }
}

function addselect(yytitle) {
  let sels = document.getElementsByClassName("dataselect");
  // очистка всех option
  for (let i = 0; i < sels.length; i++) {
    if (sels[i].id == sels[i].name) {
      let ttt = addstatus[sels[i].id];
      document.getElementById(
        sels[i].id
      ).innerHTML = `<option id="_${sels[i].id}">${ttt}</option>`;
    }
  }
  // заполнение всех option
  for (let i = 0; i < sels.length; i++) {
    if (sels[i].id == sels[i].name) {
      let x = document.getElementById(sels[i].id);
      yytitle.forEach(function (item, i, arr) {
        let option = new Option(item, item);
        x.appendChild(option);
      });
    }
  }
}

function plusselect(id) {
  const [name, paramset, funcname, places, num, selectplus, blacklist, alias] =
    getparams(id);
  if (selectplus) {
    item = document.getElementById("in" + id).value;
    const sels = document.getElementsByTagName("select");
    for (let i = 0; i < sels.length; i++) {
      if (sels[i].id == sels[i].name && sels[i].id == alias) {
        let x = document.getElementById(sels[i].id);
        let newOption = new Option(item, item);
        x.appendChild(newOption);
        for (let j = 0; j < x.length; j++) {
          if (x[j].value === item) x[j].selected = true;
        }
        addstatus[alias] = item;
        paint(alias);
      }
    }
  }
}

function minusselect(id, itemold) {
  const [name, paramset, funcname, places, num, selectplus, blacklist, alias] =
    getparams(id);
  if (selectplus) {
    item = document.getElementById("in" + id).value;
    const sels = document.getElementsByTagName("select");
    for (let i = 0; i < sels.length; i++) {
      if (
        sels[i].id == sels[i].name &&
        sels[i].id == alias //id || sels[i].id == id.slice(1))
      ) {
        let x = document.getElementById(sels[i].id);
        x.removeChild(x.querySelector("[value=" + itemold + "]"));
        addstatus[alias] = "..."; //item; //"..."
        paint(alias);
      }
    }
  }
}

function paint(alias) {
  if (!isAN(alias)) {
    if (counters[alias] > 0 && addstatus[alias] == "...") {
      $("#" + alias).css({ "box-shadow": "2px 2px 8px var(--bgr2)" });
      $("#" + alias).css({ border: "1px solid var(--bgr2)" });
    } else {
      $("#" + alias).css({ "box-shadow": "2px 2px 8px #999" });
      $("#" + alias).css({ border: "1px solid rgba(0, 0, 0, 0.3)" });
    }
  }
}

function getComboC(selectObject) {
  let itemold = selectObject.oldvalue;
  minusselect(selectObject.id.slice(2), itemold);
  plusselect(selectObject.id.slice(2));
}

function getComboD(selectObject) {
  let item = selectObject.value;
  let id = selectObject.id;
  let id2 = id;
  if (id === "_ilato") {
    id2 = "_latitude";
  }
  if (id === "_ilono") {
    id2 = "_longitude";
  }
  let x = document.getElementById(id2);

  document.getElementById(id2).innerHTML = `${item}`;
  if (isAN(addstatus[id2.slice(1)])) {
    addstatus[id2.slice(1)] = +item;
  }
}

// Функция отрисовки таблицы.
function renderTable(data) {
  let delimiter = guessDelimiters(cleanDoubleSpaces(data.split("\n")[0]), [
    ",",
    ";",
    "\t",
    " ",
  ]);

  dataarray = csvToArray(data, delimiter[0]);

  addselect(drawingtable(dataarray));
}

function controldep(id, checked, ...args) {
  const [name, paramset, funcname, places, num, selectplus, blacklist] =
    getparams(id);

  if (blacklist !== "") {
    if (checked && document.getElementById("tg" + blacklist).checked) {
      document.getElementById("tg" + id).checked = false;
      return;
    }
  }

  if (checked) {
    document.getElementById("in" + id).style.display = "block";
    document.getElementById("cb" + id).style.display = "block";
    document.getElementById("lcb" + id).style.display = "block";

    args.forEach(function (element) {
      counters[element]++;
      // console.log(counters);
      paint(element);
    });
    selstatus[id] = document.getElementById("in" + id).value;
    plusselect(id);
  } else {
    document.getElementById("in" + id).style.display = "none";
    document.getElementById("cb" + id).style.display = "none";
    document.getElementById("lcb" + id).style.display = "none";
    // Уменьшить счетчик зависимостей
    args.forEach(function (element) {
      counters[element]--;
    });
    // Раскрасить зависимые
    args.forEach(function (element) {
      if (!isAN(element)) {
        paint(element);
      }
    });
    selstatus[id] = null;
    minusselect(id, document.getElementById("in" + id).value);
  }
}

function getparams(id) {
  let alias = zavisim.find((el) => el.name === id).alias;
  let paramset = zavisim.find((el) => el.name === id).params;
  let funcname = zavisim.find((el) => el.name === id).funcname;
  let places = zavisim.find((el) => el.name === id).places;
  let num = zavisim.find((el) => el.name === id).num;
  let selectplus = zavisim.find((el) => el.name === id).selectplus;
  let blacklist = zavisim.find((el) => el.name === id).blacklist;
  let convonly = zavisim.find((el) => el.name === id).convonly;
  let description = zavisim.find((el) => el.name === id).description;
  return [
    id,
    paramset,
    funcname,
    places,
    num,
    selectplus,
    blacklist,
    alias,
    convonly,
    description,
  ];
}

function getComboB(selectObject) {
  let id = selectObject.id;
  const [name, paramset] = getparams(id.slice(2));
  controldep(name, document.getElementById(id).checked, ...paramset);
}

function getComboA(selectObject) {
  let id = selectObject.id;
  let value = selectObject.value;
  addstatus[id] = value;
  // console.log(value);
  if (!isNaN(addstatus[id])) {
    addstatus[id] = +value;
    if (id === "latitude")
      document.getElementById("_ilato").style.display = "inline";
    if (id === "longitude")
      document.getElementById("_ilono").style.display = "inline";
  } else {
    if (id === "latitude")
      document.getElementById("_ilato").style.display = "none";
    if (id === "longitude")
      document.getElementById("_ilono").style.display = "none";
  }
  let element = id;
  paint(element);
}

function controlArgs() {
  let isn = true;
  for (let i = 0; i < arguments.length; i++) {
    if (isNaN(parseFloat(arguments[i]))) {
      isn = false;
    }
  }
  return isn;
}

function renKeyObject(Object, old_key, new_key) {
  if (old_key !== new_key) {
    Object.defineProperty(
      o,
      new_key,
      Object.getOwnPropertyDescriptor(o, old_key)
    );
    delete o[old_key];
  }
}

function nothing() {
  return false;
}

function objectsValsNotNull(obj) {
  for (let key in obj) {
    let val = obj[key];

    if (val instanceof Object) {
      // (!) Массивы и функции тоже пройдут такую проверку
      // надо ли их отсеить?
      let any_no_null = bubu(val);
      if (any_no_null) return true;

      // Если функция вернет сюда false, еще не нужно ничего возвращать.
      // Находимся в цикле, еще могут быть объекты, которые вернут true.
    } else if (val !== null) {
      // Нашел не-null значение, которое не является объектом, можно прервать цикл
      return true;
    }
  }
  return false; // Только когда всё прочесал, вернет false
}

function formCalc() {
  if (!objectsValsNotNull(selstatus)) {
    new Toast({
      title: false,
      // text: "Файл не выбран либо его формат не поддерживается!",
      text: LangLoad("htmlwarning2"),
      theme: "warning",
      autohide: true,
      interval: 5000,
    });
    return;
  }
  for (let selstatuskey in selstatus) {
    if (selstatus[selstatuskey]) {
      // не null в вычисляемых параметрах
      const [
        name,
        paramset,
        funcname,
        places,
        num,
        selectplus,
        blacklist,
        alias,
        convonly,
      ] = getparams(selstatuskey);
      for (let x in paramset) {
        // в параметрах функции
        if (!isAN(paramset[x])) {
          // если не цифровая константа
          // console.log(paramset[x], addstatus[paramset[x]]);
          const temp1 = addstatus[paramset[x]];
          if (temp1 === "...") {
            // ошибка - не выбраны данные
            // console.log("Не выбрано");
            new Toast({
              title: false,
              // text: "Файл не выбран либо его формат не поддерживается!",
              text: LangLoad("htmlwarning3"),
              theme: "warning",
              autohide: true,
              interval: 5000,
            });
            return;
          } else {
            // нашли зависимые параметры
            if (!newdepstatus[selstatuskey]) {
              newdepstatus[selstatuskey] = { parent: [], child: [] };
            }
            if (selstatus[temp1] && !newdepstatus[selstatus[temp1]]) {
              newdepstatus[selstatus[temp1]] = { parent: [], child: [] };
            }
            if (selstatus[temp1]) {
              newdepstatus[selstatuskey]["parent"].push(selstatus[temp1]);
              newdepstatus[selstatus[temp1]]["child"].push(selstatuskey);
            }
          }
          if (
            zavisim.find((el) => el.alias === paramset[x]) &&
            selstatuskey != paramset[x] &&
            zavisim.find((el) => el.alias === paramset[x]).convonly
          ) {
            // console.log(selstatuskey, paramset[x]);
            if (!newdepstatus[selstatuskey]) {
              newdepstatus[selstatuskey] = { parent: [], child: [] };
            }
            if (!newdepstatus[paramset[x]]) {
              newdepstatus[paramset[x]] = { parent: [], child: [] };
            }
            newdepstatus[selstatuskey]["parent"].push(paramset[x]);
            newdepstatus[paramset[x]]["child"].push(selstatuskey);
          }
        }
      }
    }
  }
  let arr3 = [];
  let n = Object.keys(newdepstatus).length;
  while (Object.keys(newdepstatus).length > 0 && n > 0) {
    n--;
    // перебираем newdepstatus
    Object.keys(newdepstatus).forEach(function (key) {
      // если parent нет - key в массив на будущую обработку
      // ключи(temp2) child удаляем из parent зависимых
      // удаляем обработанный key из объекта
      if (newdepstatus[key]["parent"].length === 0) {
        let temp2 = newdepstatus[key]["child"];
        temp2.forEach(function (item, i, arr) {
          // удаляем key из parent
          let myArray = newdepstatus[item]["parent"];
          let myIndex = myArray.indexOf(key);
          if (myIndex !== -1) {
            myArray.splice(myIndex, 1);
          }
        });
        arr3.push(key);
        delete newdepstatus[key];
      }
    }, newdepstatus);
  }
  // console.log("расчет");
  // читаем dataarray
  for (let datakey in dataarray) {
    calcstatus = {};
    // забираем выбранные данные
    for (let statuskey in addstatus) {
      if (
        addstatus[statuskey] != "..." &&
        dataarray[datakey][addstatus[statuskey]]
      ) {
        // console.log(dataarray[datakey][addstatus[statuskey]]);
        calcstatus[statuskey] = dataarray[datakey][addstatus[statuskey]];
      }
      if (addstatus[statuskey] != "..." && isAN(addstatus[statuskey])) {
        // console.log(dataarray[datakey][addstatus[statuskey]]);
        calcstatus[statuskey] = addstatus[statuskey];
      }
    }
    // расчитываем функции
    // calcstatus["density"] = controlArgs(calcstatus["salinity"], calcstatus["temperature"], calcstatus["pressure"] )
    //           ? roundPlus( gsw_rho(+calcstatus["salinity"],+calcstatus["temperature"],+calcstatus["pressure"]),3)
    //           : "";
    arr3.forEach(function (statuskey, i, arr) {
      const [
        name,
        paramset,
        funcname,
        places,
        num,
        selectplus,
        blacklist,
        alias,
      ] = getparams(statuskey);
      csn = paramset.map((x) => {
        if (isAN(x)) return x; // если цифровая константа  -  берем и идем дальше
        let y = x;
        if (!calcstatus[x] && zavisim.find((el) => el.alias === x)) {
          y = zavisim.find((el) => el.alias === x).name;
        }
        // console.log("y=", y);
        return isAN(y)
          ? y
          : y[0] === "_"
          ? +document.getElementById(y).value
          : num
          ? +calcstatus[y]
          : calcstatus[y];
      });
      // console.log(datakey, name, calcstatus, csn, num);
      calcstatus[name] = controlArgs(...csn)
        ? num
          ? roundPlus(eval(funcname + "(" + csn.join(",") + ")"), places)
          : roundPlus(eval(funcname + '("' + csn.join(",") + '")'), places)
        : "";
      // добавить в dataarray
      if (!document.getElementById("cb" + name).checked) {
        dataarray[datakey][statuskey] = calcstatus[statuskey].toString();
      }
    });
  }

  // переименование заголовков
  newKeys = {};
  myvars.forEach((element) => {
    let x = document.getElementById("in" + element.input).value;
    if (x != element.input) newKeys[element.input] = x;
  });

  newdataarray = [];
  dataarray.forEach(function (entry) {
    const renamedObj = renameKeys(entry, newKeys);
    newdataarray.push(renamedObj);
  });

  drawingtable(newdataarray);
  new Toast({
    title: false,
    // text: "Файл не выбран либо его формат не поддерживается!",
    text: LangLoad("htmlwarning5"),
    theme: "success",
    autohide: true,
    interval: 3000,
  });
  return false;
}

function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

function saveFile() {
  fname = document.getElementById("fname").innerHTML;
  outputarray = [];
  if (typeof newdataarray === "undefined") {
    newdataarray = [];
    newdataarray = dataarray.slice(0);
  }
  outputarray.push(Object.keys(newdataarray[0]));
  newdataarray.forEach(function (item, i, arr) {
    outputarray.push(Object.values(item));
  });
  convertToCsv(fname, outputarray);
}

function openPDF() {
  window.open('TEOS10Calc.pdf', '_blank', 'fullscreen=yes'); return false;
  // var a = document.createElement('A');
  // var filePath = 'TEOS10Calc.pdf';
  // a.href = filePath;
  // a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
  // document.body.appendChild(a);
  // a.click();
  // document.body.removeChild(a);
}

function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
