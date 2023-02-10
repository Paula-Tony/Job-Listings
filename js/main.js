let mainElement = document.querySelector("main");

function extractJsonData() {
  let myRequest = new XMLHttpRequest();
  myRequest.open("GET", "js/data.json");
  myRequest.send();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsonData = JSON.parse(this.responseText);
      for (let i = 0; i < jsonData.length; i++) {
        mainElement.innerHTML += `
        <div class="job">
          <div class="left">
            <img class="logo" src="${jsonData[i].logo}" alt="" />
            <div class="info">
              <div class="company">
                ${jsonData[i].company}
                ${jsonData[i].new ? "<span class='new'>NEW!</span>" : ""} 
                ${
                  jsonData[i].featured
                    ? "<span class='featured'>FEATURED</span>"
                    : ""
                } 
              </div>
              <h2 class="position">${jsonData[i].position}</h2>
              <div class="details">
                <span class="postedAt">${jsonData[i].postedAt}</span>
                <span class="contract">${jsonData[i].contract}</span>
                <span class="location">${jsonData[i].location}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <span class="key">${jsonData[i].role}</span>
            <span class="key">${jsonData[i].level}</span> 
            ${createSpans("languages")}
            ${createSpans("tools")}
          </div>
        </div>`;
        function createSpans(key) {
          let spansArray = [];
          for (let j = 0; j < jsonData[i][key].length; j++) {
            spansArray.push(`<span class="key">${jsonData[i][key][j]}</span>`);
          }
          return spansArray.join("");
        }
      }
    }
  };
}

extractJsonData();

document.addEventListener("click", function (e) {
  let keywordsElement = document.querySelector(".keywords");
  let filterElement = document.querySelector(".filter");
  if (e.target.className === "key") {
    filterElement.style.opacity = "1";
    if (keywordsElement.textContent.indexOf(e.target.textContent) === -1) {
      keywordsElement.innerHTML += `
      <div class="keyword">
      <span>${e.target.innerHTML}</span>
      <button class="remove"><i class="fa-solid fa-xmark"></i></button>
      </div>
      `;
      filterResult();
    }
  } else if (e.target.className === "remove") {
    e.target.parentElement.remove();
    check();
    document.querySelectorAll(".job").forEach((job) => {
      job.style.display = "flex";
    });
    filterResult();
  } else if (e.target.className === "clear") {
    keywordsElement.innerHTML = "";
    check();
    document.querySelectorAll(".job").forEach((job) => {
      job.style.display = "flex";
    });
    filterResult();
  }
  function check() {
    keywordsElement.innerHTML.trim() === ""
      ? (filterElement.style.opacity = "0")
      : "";
  }
});

function filterResult() {
  document.querySelectorAll(".keyword span").forEach((span) => {
    let rightElements = document.querySelectorAll(".right");
    rightElements.forEach((right) => {
      right.textContent.indexOf(span.innerHTML) === -1
        ? (right.parentElement.style.display = "none")
        : "";
    });
  });
}
