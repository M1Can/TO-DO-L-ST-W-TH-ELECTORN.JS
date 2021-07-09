const electron = require("electron");
const { ipcRenderer } = electron;

//DOM
let yeniwindow = document.getElementById("newpencere");
let çıkışbtn = document.getElementById("BUTONexit");

// ipcRenderer
yeniwindow.addEventListener("click", () => {
    ipcRenderer.send("anahtar-eklemepenceresi", true)      
});

çıkışbtn.addEventListener("click", () => {
    ipcRenderer.send("anahtar_exit", true)
});

document.getElementById("i_1").addEventListener("mouseover", () => {
  document.getElementById("span_1").style.display = "inline";
  document.getElementById("p-1").style.marginLeft = "459px";  
});

ipcRenderer.on("anahtar_listeleme", (hata, veriler) => {

    veriler.forEach(listVeri => {
        YENİKAYIT(listVeri);
    });
});

ipcRenderer.on("anahtar_liste", (e, listVeri) => {
    YENİKAYIT(listVeri);
});

function YENİKAYIT(listVeri) {
    const ANAListe = document.querySelector("#ANA");
    const BİRListe = document.createElement("div");
    BİRListe.className = "list";
    
    const GRUPListe = document.createElement("div");
    GRUPListe.className = "input-group";
    
    const İÇERİKListe = document.createElement("p");
    İÇERİKListe.className = "list_içerik";
    İÇERİKListe.innerText = listVeri.text;
    
    const BUTONListe = document.createElement("button");
    BUTONListe.className = "btn btn-outline-warning cc";
    BUTONListe.innerText = "YAPTIM";
    BUTONListe.setAttribute("data-id", listVeri.id);
    
    function SİLME(e) {
        if(confirm("Bu kaydı yaptığınıza mutabık mısınız?")){
            e.target.parentNode.parentNode.remove();
            ipcRenderer.send("anahtar_kaldır", e.target.getAttribute("data-id"));
        }
    }
    BUTONListe.addEventListener("click", SİLME);
    
    document.getElementById("sayma_işlemi").innerText = ANAListe.children.length + 1;
    
    GRUPListe.appendChild(İÇERİKListe);
    GRUPListe.appendChild(BUTONListe);
    
    BİRListe.appendChild(GRUPListe);
    
    ANAListe.appendChild(BİRListe);
    
    }









