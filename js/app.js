(function (app) {
  app.classItems = {};
  app.selectedItem = {};

  app.all = function () {
    setCopyright();
  };

  app.showClass = function () {
    loadClassData();
    loadClassPage();
    updateClassPage();
  };

  function setCopyright() {
    const dteNow = new Date();
    const intYear = dteNow.getFullYear();

    const copyright = document.getElementById("copyright");

    copyright.innerHTML = "&copy " + intYear + " Copyright Danielle Jenson";
  }

  async function loadClassData() {
    const rawData = await fetch("JSON/class.json");
    const data = await rawData.json();
    app.classItem = data;
    sessionStorage.setItem("site-data", JSON.stringify(data));
    app.classItems = JSON.parse(cacheData);
    const cacheData = sessionStorage.getItem("site-data");
  }

  function loadClassPage() {
    const params = new URLSearchParams(window.location.search);
    let classCode = params.get("class");
    let classIndex = null;
    if (classCode in app.classItems[0].index) {
      classIndex = app.classItems[0].index[classCode];
    } else {
      classIndex = 1;
    }
    app.selectedItem = app.classItems[classIndex];
  }

  function updateClassPage() {
    let elementKeys = Object.keys(app.selectedItem);
    elementKeys = elementKeys.splice(1, elementKeys.length - 1);
    for (const element of elementKeys) {
      if (element == "req-tools" || element == "req-materials") {
        const section = document.getElementById(element);
        let htmlText = "<ul>";
        for (const item of app.selectedItem[element]) {
          htmlText += "<li>" + item + "</li>";
          console.log(item);
        }
        htmlText += "</ul>";
        section.innerHTML = htmlText;
      } else {
        document.getElementById(element).innerText = app.selectedItem[element];
      }
    }
  }
})((window.app = window.app || {}));
