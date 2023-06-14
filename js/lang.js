var lang = {
  /**
		function load the language file passed by function
	**/
  init: function (type) {
    this.type = type;
  },

  /**
		This function is used to get string in your language
		passed by relative keyword
	**/
  getString: function (string, words) {
    // console.log(string, words, this.type)
    if (typeof window[this.type] != "undefined") {
      // console.log(this.type,window[this.type])
      let langString = window[this.type][string];
      // console.log(en[string],rus,rus[string],window[this.type],[string],langString)
      if (typeof words != "undefined" && words.length > 0) {
        langString = this.putDyanamicValue(langString, words);
      }
      // console.log(langString)
      return langString;
    } else {
      alert("'" + this.type + "' language is not found");
    }
  },

  /**
		This puts the dynamic values in string passed by function, eg dynamic value DVD  
		"Your Item {dvalue1} is not found"  is converted into  "Your Item DVD is not found"
	**/
  putDyanamicValue: function (langString, words) {
    for (var i = 0; i < words.length; i++) {
      let spatt = new RegExp("{dvalue" + (i + 1) + "}");
      langString = langString.replace(spatt, words[i]);
    }
    return langString;
  },
};

loadDemo("en");
function loadDemo(ltype) {
  lang.init(ltype);
  if (ltype == "ru") {
    document.querySelector("#dropbtn").style.background =
      'url("images/Russia-Flag-icon.png") no-repeat left center';
    document.querySelector("#dropbtn").innerHTML = `Русский`;
    document.querySelector("#ru").style.display = "none";
    filllang(ru);
  }
  if (ltype == "en") {
    document.querySelector("#dropbtn").style.background =
      'url("images/flag-usa-icon.png") no-repeat left center';
    document.querySelector("#dropbtn").innerHTML = `English`;
    document.querySelector("#en").style.display = "none";
    filllang(en);
  }
}

function filllang(enru) {
  // let msgs=""
  // let key1=""
  for (let key in enru) {
    if (
      document.querySelector("#" + key) &&
      !document.getElementById(key).classList.contains("dataselect")
    ) {
      document.querySelector("#" + key).innerText = LangLoad(key);
    }
    if (document.querySelector("#l" + key))
      document.querySelector("#l" + key).innerHTML = LangLoad(key);
    if (document.querySelector("#v" + key))
      document.querySelector("#v" + key).innerHTML = LangLoad(key);
    if (
      key.includes("diagram") &&
      key.includes("title") &&
      !key.includes("diagramxn")
    )
    // (async () => {
      {
      sss = LangLoad(key);
      // key1 = key.slice(0,8);
      console.log(key, sss);
      // if (key=="diagram0title") {document.querySelector("#"+key).innerHTML = sss;}
      // var element=document.getElementById("#"+key+"p");
      if($("#"+key+"p").length) {document.querySelector("#"+key+"p").innerHTML = sss;} else {document.querySelector("#"+key).value = sss;}
      }
      // setTimeout(document.querySelector("#diagrams").innerHTML = sss, 3000);
      // const res = await fetch(`https://api.github.com/users/username`);
      // const json = await res.json();
      // console.log(json.public_repos);
      // console.log("Привет!");
    // })();


    // alert(LangLoad(key));
      // {alert(key)
      //   msgs = ;
    // {
      // sss=LangLoad(key);
      // console.log(key, sss)
      // document.querySelector("#diagrams").innerHTML =LangLoad(key);
      // document.querySelector("#" + key).value =sss;
    // }
      // document.querySelector("#p0").innerHTML = msgs;}
    // let ppp4 = document.querySelector('ppp4');
    // ppp4.textContent = 'Здесь был Кекс. Мяу!';
    // document.getElementById("ppp4").innerHTML =LangLoad(key);
    if (key == "diagramxntitle")
      document.querySelector("#diagramx1title").value =
        LangLoad("diagramxntitle") + "1";
  }
}

function LangLoad(gr) {
  let msg = lang.getString(gr);
  return msg;
}

$(document).ready(function () {
  $("#dropbtn").hover(
    function () {
      // console.log("hover1",document.querySelector("#dropbtn").innerText,ru);
      if (document.querySelector("#dropbtn").innerText == "English")
        document.querySelector("#ru").style.display = "block";
      if (document.querySelector("#dropbtn").innerText == "Русский")
        document.querySelector("#en").style.display = "block";
    },

    function () {}
  );
});
