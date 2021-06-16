const ipcRenderer = require("electron").ipcRenderer;
const contextBridge = require("electron").contextBridge;
const saveBtn = document.getElementById('savePost');
const clearBtn = document.getElementById('clearPost');

let upload;

saveBtn.addEventListener('click', (e) => {
    // console.log(upload);
    let data = {};

    data.title = document.getElementById('title').value;
    data.excerpt = document.getElementById('excerpt').value;
    data.body = document.getElementById('body').value;

    // console.log(data);

    //setup post and send event to main
    const date = new Date().toISOString().substr(0, 10);
    const title = data.title.replace(/\s+/g, '-');

    let file = {};
    file.name = `${date}-${title}`;
    file.image = upload.path;
    file.imageName = data.title
    file.body = `---
layout: "post"
title: "${data.title}"
excerpt: "${data.excerpt}"
image: "${title}.${upload.name.split('.').pop()}"
---

${data.body}`;

    ipcRenderer.send('generateDownload', file);
})

//completed download
ipcRenderer.on('download complete', (event) => {
    location.reload();
    console.log('post saved!');
})
//failed download
ipcRenderer.on('download failed', (event) => {
    console.log('download failed, you must select a proper _posts directory!');
})
//clear post
clearPost.addEventListener('click', (e) => {
    location.reload();
})

//handle image click-to-upload
const imageInput = document.querySelector('.file-input');

imageInput.addEventListener('change', (e) => {
    upload = e.path[0].files[0];
    document.querySelector('.file-name').innerHTML = upload.name;

})


//handle image drag/drop upload
// const bucket = document.getElementById('imageBucket');

// bucket.addEventListener('drop', (event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     for (const f of event.dataTransfer.files) {
//         // Using the path attribute to get absolute file path
//         console.log('File Path of dragged files: ', f.path)
//     }
// });

// bucket.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
// });

// bucket.addEventListener('dragenter', (event) => {
//     console.log('File is in the Drop Space');
// });

// bucket.addEventListener('dragleave', (event) => {
//     console.log('File has left the Drop Space');
// });