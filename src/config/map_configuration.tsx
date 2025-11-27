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
  flood: {
    name: 'Hochwasserkarte',
    description: 'Zeigt Hochwasserrisikobereiche basierend auf aktuellen Umgebungsrichtlinien',
    legend: [
      { label: 'HQ10', color: '#99cc00' },
      { label: 'HQ100', color: '#ffcc00' },
      { label: 'HQ10, HQ20 (Elbe)', color: '#ff9900' },
      { label: 'HQextrem', color: '#ff0000' },
    ],
    layers: [
      {
        id: 'hochwasser-layer',
        name: 'Hochwasserrisiko',
        tiles: [
          'http://159.69.47.241:8600/geoserver/gwc/service/tms/1.0.0/terragreen%3Ahochwasserrisiko@WebMercatorQuad@png/{z}/{x}/{y}.png'
        ],
        opacity: 1,
        tileSize: 256,
        scheme: 'tms'
      }
    ]
  },
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
  natur: {
    name: 'Naturschutzgebiete',
    description: 'Zeigt Naturschutzgebiete basierend auf aktuellen Umgebungsrichtlinien',
    color: '#99cc66',
    layers: [
      {
        id: 'natur-layer',
        name: 'Naturschutzgebiete',
        tiles: [
          'http://159.69.47.241:8600/geoserver/gwc/service/tms/1.0.0/terragreen%3Anaturschutzgebiete@WebMercatorQuad@png/{z}/{x}/{y}.png'
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
    color: '#DAE376',
    layers: [
      {
        id: 'ffh-layer',
        name: 'FFH-Gebiete',
        tiles: [
          'http://159.69.47.241:8600/geoserver/gwc/service/tms/1.0.0/terragreen%3Affh@WebMercatorQuad@png/{z}/{x}/{y}.png'
        ],
        opacity: 1,
        tileSize: 256,
        scheme: 'tms'
      }
    ]
  },
};