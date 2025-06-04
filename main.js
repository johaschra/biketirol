/* Bike Trail Tirol Beispiel */

// Innsbruck
let ibk = {
    lat: 47.267222,
    lng: 11.392778
};

// Karte initialisieren
let map = L.map("map").setView([ibk.lat, ibk.lng], 9);

// WMTS Hintergrundlayer der eGrundkarte Tirol
let eGrundkarteTirol = {
    sommer: L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }),
    winter: L.tileLayer(
        "https://wmts.kartetirol.at/gdi_winter/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }),
    ortho: L.tileLayer("https://wmts.kartetirol.at/gdi_ortho/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }
    ),
    nomenklatur: L.tileLayer("https://wmts.kartetirol.at/gdi_nomenklatur/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`,
        pane: "overlayPane",
    })
}

// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur // fügt Beschriftungen/Namen hinzu
    ]).addTo(map),
    "eGrundkarte Tirol Winter": L.layerGroup([
        eGrundkarteTirol.winter,
        eGrundkarteTirol.nomenklatur
    ]),
    "eGrundkarte Tirol Orthofoto": L.layerGroup([
        eGrundkarteTirol.ortho,
        eGrundkarteTirol.nomenklatur,
    ]),
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
}).addTo(map);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);


//Etappennavigation über Pulldown Menü

let pulldown = document.querySelector("#pulldown") // select the first element with the  id pulldown in index html

    for (let etappe of ETAPPEN) {
        let selected = "";
        if (etappe.nr == 29) {
            selected = "selected"; 
        }
        pulldown.innerHTML += `
        <option ${selected} value="${etappe.user}">Etappe ${etappe.nr}: ${etappe.titel}</option>`;
        
    }
    pulldown.onchange = function(evt) {
        //console.log(evt, evt.target.value)
        window.location.href = `https://${evt.target.value}.github.io/biketirol`;
    }

  const controlElevation = L.control.elevation({
    time: false, // keine Zeit track statistik
    elevationDiv: "#profile", // in profile div verschieben
    height: 300, //300 Pixel hoch
    theme: "bike-tirol",
    slope: false,
  }).addTo(map);

  controlElevation.load("data/etappe29.gpx");

var gkTirol = new L.TileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png"); //Tilelayer für Hintergrund der Minimap definieren
// Knopf zum an und ausschalten der Minimap
var miniMap = new L.Control.MiniMap(gkTirol, {
    toggleDisplay: true //kleiner pfeil unten rechts 
}).addTo(map);

map.addControl(new L.Control.Fullscreen());