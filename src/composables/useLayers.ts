import leaflet from "leaflet";
   
    const osm = leaflet.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
    }
    );
    const arcsat = leaflet.tileLayer(
    "http://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { subdomains: ["server", "services"], attribution: "&copy; ArcGIS esri" }
    );
            
    const cenimap = leaflet.tileLayer.wms(
    "https://vagon.cenicana.org/geoserver/gwc/service/wms",
    {
        format: "image/png",
        transparent: false,
        layers: "geoportal_gbase_capas",
    }
    );
    
    const rma = leaflet.tileLayer.wms(
    "https://vagon.cenicana.org/geoserver/gmeteoro/wms",
    {
        format: "image/png",
        transparent: true,
        layers: "gmeteoro:gmeteo_rma_po",
        styles: "gmeteo_rma_po_layer",
    }
    );
        
    const municipios = leaflet.tileLayer.wms(
    "https://vagon.cenicana.org/geoserver/gbase/wms",
    {
        format: "image/png",
        transparent: true,
        layers: "gbase:gbase_municipios",
        styles: "gbase_municipios_layer",
    }
    );
                    
    const baseMaps = {
        Satelite: arcsat,
        "Open street Map": osm,
        "Mapa Base Cenicaña": cenimap,
    };
    
    const overlayMaps = {
        "Red Meteorológica automatizáda": rma,
        Municipios: municipios,
    };                        
      
    
export default {
    baseMaps, overlayMaps, arcsat, osm, cenimap
}