export interface MapLayerConfig {
  id: string;
  tiles: string[];
  opacity?: number;
  tileSize?: number;
  scheme?: 'xyz' | 'tms';
  name?: string;
}

export interface LegendItem {
  label: string;
  color: string;
}

export interface SpecializedMapConfig {
  layers: MapLayerConfig[];
  name: string;
  description?: string;
  color?: string;
  legend?: LegendItem[];
}

export const MAP_CONFIGURATIONS: Record<string, SpecializedMapConfig> = {
  flure: {
    name: 'Flurstücke',
    description: 'Zeigt Flurstücke basierend auf aktuellen Umgebungsrichtlinien',
    color: '#000000',
    layers: [
      {
        id: 'flure-layer',
        name: 'Flurstücke',
        tiles: [
          'https://geo.terragreen-solutions.app/geoserver/gwc/service/tms/1.0.0/terragreen%3Aflurstueck_brandenburg@WebMercatorQuad@png/{z}/{x}/{y}.png'
        ],
        opacity: 1,
        tileSize: 256,
        scheme: 'tms'
      }
    ]
  },
  natur: {
    name: 'Naturschutzgebiete',
    description: 'Zeigt Naturschutzgebiete basierend auf aktuellen Umgebungsrichtlinien',
    color: '#99cc66',
    layers: [
      {
        id: 'natur-layer',
        name: 'Naturschutzgebiete',
        tiles: [
          'https://geo.terragreen-solutions.app/geoserver/gwc/service/tms/1.0.0/terragreen%3Anaturschutz@WebMercatorQuad@png/{z}/{x}/{y}.png'
        ],
        opacity: 1,
        tileSize: 256,
        scheme: 'tms'
      }
    ]
  },
  
  ffh: {
    name: 'FFH-Gebiete',
    description: 'Zeigt FFH-Gebiete basierend auf aktuellen Umgebungsrichtlinien',
    color: '#20B2AA',
    layers: [
      {
        id: 'ffh-layer',
        name: 'FFH-Gebiete',
        tiles: [
          'https://geo.terragreen-solutions.app/geoserver/gwc/service/tms/1.0.0/terragreen%3Affh_brandenburg@WebMercatorQuad@png/{z}/{x}/{y}.png'
        ],
        opacity: 1,
        tileSize: 256,
        scheme: 'tms'
      }
    ]
  },
  flood: {
    name: 'Hochwasserkarte',
        color: '#4682B4',

    description: 'Zeigt Hochwasserrisikobereiche basierend auf aktuellen Umgebungsrichtlinien',
    /*legend: [
      { label: 'HQ10', color: '#4682B4' },
    ],*/
    layers: [
      {
        id: 'hochwasser-layer',
        name: 'Hochwasserrisiko',
        tiles: [
          'https://geo.terragreen-solutions.app/geoserver/gwc/service/tms/1.0.0/terragreen%3Ahochwasserrisiko_brandenburg@WebMercatorQuad@png/{z}/{x}/{y}.png'
        ],
        opacity: 1,
        tileSize: 256,
        scheme: 'tms'
      }
    ]
  },
  /*
  
  vogelschutzgebiete: {
    name: 'Vogelschutzgebiete',
    description: 'Zeigt Vogelschutzgebiete basierend auf aktuellen Umgebungsrichtlinien',
    color: '#B099D8',
    layers: [
      {
        id: 'vogelschutzgebiete-layer',
        name: 'Vogelschutzgebiete',
        tiles: [
          'http://159.69.47.241:8600/geoserver/gwc/service/tms/1.0.0/terragreen%3Avogelschutzgebiete@WebMercatorQuad@png/{z}/{x}/{y}.png'
        ],
        opacity: 1,
        tileSize: 256,
        scheme: 'tms'
      }
    ]
  },
 */
};