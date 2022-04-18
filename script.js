const form = document.querySelector("form"),
    fileInput = form.querySelector(".file-input"),
    ProgressArea = document.querySelector(".progress_area"),
    uploadedArea = document.querySelector("uploaded_area");

form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = ({ target }) => {
    let file = target.files[0];
    if (file) {
        let fileName = file.name;
        if (fileName.length >= 5) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 5) + "...." + splitName[1];
        }
        uploadFile(fileName);
    }
}

function uploadFile(name) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "");
    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
        let fileloaded = Math.floor((loaded / total) * 100);
        let filetotal = Math.floor(total / 1000);
        let progressHTML = `<li class="row">
        <i class="fas fa-file-alt"></i>
        <div class="content">
            <div class="details">
                <span class="name">${name} . uploading</span>
                <span class="percent">${fileloaded}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style= "width: ${fileloaded}%"></div>
            </div>

        </div>
    </li>`;
        ProgressArea.innerHTML = progressHTML;
        // if (loaded == total) {
        //     ProgressArea.innerHTML = "";
        //     let uploadedHTML = `<li class="row">
        //     <div class="content">
        //         <i class="fas fa-file-alt"></i>
        //         <div class="details">
        //             <span class="name">${name} . uploaded</span>
        //             <span class="size">${filetotal}</span>
        //         </div>
        //     </div>
        //     <i class="fas fa-check"></i>
        // </li>`;
        //     uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        // }
    });
    let formData = new FormData(form);
    xhr.send(formData);
}