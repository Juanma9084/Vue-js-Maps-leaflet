interface Ingenios {
id_ingenio?: number;
nombre_ingenio?: string;
codigo_ingenio?: string;
activo?: string;
}

interface Haciendas {
id_hacienda?: number;
codigo_ingenio?: string;
ing_hda?: string;
nombre_hda?: string;
}

interface Suertes {
id_suertes?: number;
codigo_ingenio?: string;
ing_hda?: string;
suerte?: string;
}

export type {Ingenios, Haciendas, Suertes}