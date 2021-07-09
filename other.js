const electron = require("electron");
        const { ipcRenderer } = electron;

        //DOM
        let çıkışbtn = document.getElementById("BUTONexit");
        let far = document.getElementById("navbar_1");
        let kaydet = document.getElementById("list_kaydet");
        let değer = document.getElementById("list_değer");

        // ipcRenderer.send();
        çıkışbtn.addEventListener("click", () => {
            ipcRenderer.send("anahtar_exit-2");
        });

        kaydet.addEventListener("click", () => {
            ipcRenderer.send("anahtar_kaydet", değer.value)
        });

document.getElementById("i_1").addEventListener("mouseover", () => {
    document.getElementById("span_1").style.display = "inline";
    document.getElementById("p-1").style.marginLeft = "283px";  
});