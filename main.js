const electron = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain } = require("electron");
const db = require("./ayrıntılar/database").db;

const {app, BrowserWindow, ıpcMain} = electron;

let mainWindow, otherWindow;

app.on("ready", () => {

mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    title: "DÖKÜMAN.mc",
    icon: __dirname + './ayrıntılar/ikon/icon.ico',
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
});

mainWindow.loadURL(
    url.format({
        pathname: path.join(__dirname, "main.html"),
        protocol: "file:",
        slashes: true
    })
);

mainWindow.setResizable(false);

ipcMain.on("anahtar_exit", () => {
    mainWindow.close();
    mainWindow = null;
});

ipcMain.on("anahtar_exit-2", () => {
    otherWindow.close();
    otherWindow = null;
});

ipcMain.on("anahtar-eklemepenceresi", () => {
    otherWindow = new BrowserWindow({
        width: 400,
        height: 150,
        title: "YENİ.mc",
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // process.setMaxListeners(0);

    otherWindow.setResizable(false);

    otherWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "ayrıntılar/YENİ PENCERE/other.html"),
            protocol: "file:",
            slashes: true
        })
    );

        otherWindow.on("close", () => {
        otherWindow = null;
        })

   mainWindow.on("close", () => {
        app.quit();
   })
});

ipcMain.on("anahtar_kaydet", (hata, veri) => {
    if(veri){
        db.query("INSERT INTO notlar SET text = ?", veri, (h, s, a) => {
            if(s.insertId > 0){
                
                mainWindow.webContents.send("anahtar_liste", {
                    id: s.insertId,
                    text: veri
                });
            }
        });

        

        otherWindow.close();
        otherWindow = null;
    }
});

mainWindow.webContents.once("dom-ready", () => {
    db.query("SELECT * FROM notlar", (hata, sonuçlar, alanlar) => {
       mainWindow.webContents.send("anahtar_listeleme", sonuçlar);
    });
});

ipcMain.on("anahtar_kaldır", (hata, id) => {
    db.query("DELETE FROM notlar WHERE id = ?", id, (h, s, a) => {
    });
});


});














