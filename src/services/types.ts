interface Comunas {
id_comuna?: number;
area_comuna?: number;
perimetro_comuna?: number;
}

interface Barrios {
id_barrio?: number;
id_comuna?: number;
nombre?: string;
area_barrio?: number;
perimetro_barrio?: number;
}

export type {Comunas, Barrios}