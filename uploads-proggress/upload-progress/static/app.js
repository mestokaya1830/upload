const form = document.getElementById("form");
const file = document.getElementById("file");
let uploadedArea = document.querySelector(".uploaded-area");

const fileIcons = (param) => {
  if (param.match(/\.jp?g|png|gif|webp/)) {
    return "png";
  } else if (param.match(/\.zip|rar/)) {
    return "zip";
  } else if (param.match(/\.mp4/)) {
    return "mp4";
  } else {
    return "doc";
  }
};

file.addEventListener("change", (e) => {
  if (e.target.files[0]) {
    let fileName = e.target.files[0].name;
    if (fileName.length >= 12) {
      let splitName = fileName.split(".");
      fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
});
const uploadFile = (param) => {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    fileTotal < 1024
      ? (fileSize = fileTotal + "KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + "MB");
    document.getElementById("area").innerHTML = `
        <li class="row">
          <div class="details">
            <i class="fa fa-file-alt"></i>
            <div>${param}</div>
            <div>${fileLoaded} %</div>
          </div>
          <div class="bar">
            <div class="prog" style="width:${fileLoaded}%"></div>
          </div>
        </li>
      `;
    if (loaded == total) {
      document.getElementById("area").innerHTML = "";
      let uploadedHTML = `
            <li class="upload-end">
              <span class="name">
                <img src="icons/${fileIcons(
                  param
                )}.png" style="margin-right:10px;"/>${param}
              </span>
              <span class="size">${fileSize}</span>
              <i class="fas fa-check" style="color:#6990f2"></i>
            </li>
          `;
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  const formData = new FormData(form);
  xhr.send(formData);
};
