var lonLat = [106.682830, 10.757800];
var map = new ol.Map({
    target: 'mapOpenlayer',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat(lonLat),
        zoom: 15
    })
});

// Add marker
var marker = new ol.Feature({
    geometry: new ol.geom.Point(
        ol.proj.fromLonLat(lonLat)
    )
});

marker.setStyle(new ol.style.Style({
    image: new ol.style.Icon(({
        crossOrigin: 'anonymous',
        src: '/images/marker-icon.png'
    }))
}));

var vectorSource = new ol.source.Vector({
    features: [marker]
});

var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource
});

map.addLayer(markerVectorLayer);