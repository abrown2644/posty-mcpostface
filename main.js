// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require('fs');

let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//quit
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


ipcMain.on('generateDownload', (event, file) => {
  dialog.showSaveDialog(mainWindow, {
    title: "Save Post",
    defaultPath: `${file.name}.markdown`,
    properties: ['openFile', 'openDirectory'],
    filters: [
      { name: 'markdown', extensions: ['markdown'] }
    ]
  }).then((saveLocation) => {
    //only save the post if a proper site path is selected
    if (saveLocation.filePath.includes("_posts")) {

      //save the post
      fs.writeFileSync(saveLocation.filePath, file.body)

      //got an image? 
      if (file.image) {
        console.log('image attached');

        const imageDestination = saveLocation.filePath.split("_posts")[0] + 'images\\' + file.imageName;
        console.log(imageDestination);

        //save the image
        fs.copyFile(file.image, imageDestination, (error) => {
          if (error) {
            console.log("Image Error:", error);
          }
          else {
            console.log('Image Saved');
          }
        })
      }

      mainWindow.webContents.send('download complete');
    }
    else {
      mainWindow.webContents.send('download failed');
    }
  })
})