
const useSpatialQuery = (map:any, data:any, capa:any) => {

    map.removeLayer(capa);
    capa.clearLayers();
    capa.addData(data);
    const estilo = { fill: false, color: "#6C0CF0" };
    capa.setStyle((feature) => {
        return estilo;
    });
    map.addLayer(capa);
    capa.addTo(map);
    map.fitBounds(capa.getBounds());
}

export default {
    useSpatialQuery
}