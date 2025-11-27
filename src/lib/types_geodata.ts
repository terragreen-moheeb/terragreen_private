export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  geodata: {
    Tables: {
      flood_data_high_risk: {
        Row: {
          apsfr_cd: string | null
          col_year: string | null
          det_level: string | null
          fl_recur: string | null
          fl_source: string | null
          id_haz_fea: string | null
          importdate: string | null
          inpoly_fid: number | null
          ins_when: string | null
          land_cd: string | null
          maxsimptol: number | null
          minsimptol: number | null
          objectid: number | null
          ogc_fid: number
          oid_1: number | null
          poly_cd: string | null
          poly_name: string | null
          protec: string | null
          qlike: string | null
          rbd_cd: string | null
          restricted: string | null
          shape__area: number | null
          shape__length: number | null
          shape_leng: number | null
          sigd_cd: string | null
          uom_cd: string | null
          wa_cd: string | null
          wkb_geometry: unknown | null
          year: string | null
        }
        Insert: {
          apsfr_cd?: string | null
          col_year?: string | null
          det_level?: string | null
          fl_recur?: string | null
          fl_source?: string | null
          id_haz_fea?: string | null
          importdate?: string | null
          inpoly_fid?: number | null
          ins_when?: string | null
          land_cd?: string | null
          maxsimptol?: number | null
          minsimptol?: number | null
          objectid?: number | null
          ogc_fid?: number
          oid_1?: number | null
          poly_cd?: string | null
          poly_name?: string | null
          protec?: string | null
          qlike?: string | null
          rbd_cd?: string | null
          restricted?: string | null
          shape__area?: number | null
          shape__length?: number | null
          shape_leng?: number | null
          sigd_cd?: string | null
          uom_cd?: string | null
          wa_cd?: string | null
          wkb_geometry?: unknown | null
          year?: string | null
        }
        Update: {
          apsfr_cd?: string | null
          col_year?: string | null
          det_level?: string | null
          fl_recur?: string | null
          fl_source?: string | null
          id_haz_fea?: string | null
          importdate?: string | null
          inpoly_fid?: number | null
          ins_when?: string | null
          land_cd?: string | null
          maxsimptol?: number | null
          minsimptol?: number | null
          objectid?: number | null
          ogc_fid?: number
          oid_1?: number | null
          poly_cd?: string | null
          poly_name?: string | null
          protec?: string | null
          qlike?: string | null
          rbd_cd?: string | null
          restricted?: string | null
          shape__area?: number | null
          shape__length?: number | null
          shape_leng?: number | null
          sigd_cd?: string | null
          uom_cd?: string | null
          wa_cd?: string | null
          wkb_geometry?: unknown | null
          year?: string | null
        }
        Relationships: []
      }
      flood_data_low_risk: {
        Row: {
          apsfr_cd: string | null
          col_year: string | null
          det_level: string | null
          fl_recur: string | null
          fl_source: string | null
          id_haz_fea: string | null
          importdate: string | null
          inpoly_fid: number | null
          ins_when: string | null
          land_cd: string | null
          maxsimptol: number | null
          minsimptol: number | null
          objectid: number | null
          ogc_fid: number
          oid_1: number | null
          poly_cd: string | null
          poly_name: string | null
          protec: string | null
          qlike: string | null
          rbd_cd: string | null
          restricted: string | null
          shape__area: number | null
          shape__length: number | null
          shape_leng: number | null
          sigd_cd: string | null
          uom_cd: string | null
          wa_cd: string | null
          wkb_geometry: unknown | null
          year: string | null
        }
        Insert: {
          apsfr_cd?: string | null
          col_year?: string | null
          det_level?: string | null
          fl_recur?: string | null
          fl_source?: string | null
          id_haz_fea?: string | null
          importdate?: string | null
          inpoly_fid?: number | null
          ins_when?: string | null
          land_cd?: string | null
          maxsimptol?: number | null
          minsimptol?: number | null
          objectid?: number | null
          ogc_fid?: number
          oid_1?: number | null
          poly_cd?: string | null
          poly_name?: string | null
          protec?: string | null
          qlike?: string | null
          rbd_cd?: string | null
          restricted?: string | null
          shape__area?: number | null
          shape__length?: number | null
          shape_leng?: number | null
          sigd_cd?: string | null
          uom_cd?: string | null
          wa_cd?: string | null
          wkb_geometry?: unknown | null
          year?: string | null
        }
        Update: {
          apsfr_cd?: string | null
          col_year?: string | null
          det_level?: string | null
          fl_recur?: string | null
          fl_source?: string | null
          id_haz_fea?: string | null
          importdate?: string | null
          inpoly_fid?: number | null
          ins_when?: string | null
          land_cd?: string | null
          maxsimptol?: number | null
          minsimptol?: number | null
          objectid?: number | null
          ogc_fid?: number
          oid_1?: number | null
          poly_cd?: string | null
          poly_name?: string | null
          protec?: string | null
          qlike?: string | null
          rbd_cd?: string | null
          restricted?: string | null
          shape__area?: number | null
          shape__length?: number | null
          shape_leng?: number | null
          sigd_cd?: string | null
          uom_cd?: string | null
          wa_cd?: string | null
          wkb_geometry?: unknown | null
          year?: string | null
        }
        Relationships: []
      }
      flood_data_middle_risk: {
        Row: {
          apsfr_cd: string | null
          col_year: string | null
          det_level: string | null
          fl_recur: string | null
          fl_source: string | null
          id_haz_fea: string | null
          importdate: string | null
          inpoly_fid: number | null
          ins_when: string | null
          land_cd: string | null
          maxsimptol: number | null
          minsimptol: number | null
          objectid: number | null
          ogc_fid: number
          oid_1: number | null
          poly_cd: string | null
          poly_name: string | null
          protec: string | null
          qlike: string | null
          rbd_cd: string | null
          restricted: string | null
          shape__area: number | null
          shape__length: number | null
          shape_leng: number | null
          sigd_cd: string | null
          uom_cd: string | null
          wa_cd: string | null
          wkb_geometry: unknown | null
          year: string | null
        }
        Insert: {
          apsfr_cd?: string | null
          col_year?: string | null
          det_level?: string | null
          fl_recur?: string | null
          fl_source?: string | null
          id_haz_fea?: string | null
          importdate?: string | null
          inpoly_fid?: number | null
          ins_when?: string | null
          land_cd?: string | null
          maxsimptol?: number | null
          minsimptol?: number | null
          objectid?: number | null
          ogc_fid?: number
          oid_1?: number | null
          poly_cd?: string | null
          poly_name?: string | null
          protec?: string | null
          qlike?: string | null
          rbd_cd?: string | null
          restricted?: string | null
          shape__area?: number | null
          shape__length?: number | null
          shape_leng?: number | null
          sigd_cd?: string | null
          uom_cd?: string | null
          wa_cd?: string | null
          wkb_geometry?: unknown | null
          year?: string | null
        }
        Update: {
          apsfr_cd?: string | null
          col_year?: string | null
          det_level?: string | null
          fl_recur?: string | null
          fl_source?: string | null
          id_haz_fea?: string | null
          importdate?: string | null
          inpoly_fid?: number | null
          ins_when?: string | null
          land_cd?: string | null
          maxsimptol?: number | null
          minsimptol?: number | null
          objectid?: number | null
          ogc_fid?: number
          oid_1?: number | null
          poly_cd?: string | null
          poly_name?: string | null
          protec?: string | null
          qlike?: string | null
          rbd_cd?: string | null
          restricted?: string | null
          shape__area?: number | null
          shape__length?: number | null
          shape_leng?: number | null
          sigd_cd?: string | null
          uom_cd?: string | null
          wa_cd?: string | null
          wkb_geometry?: unknown | null
          year?: string | null
        }
        Relationships: []
      }
      gemeinden: {
        Row: {
          ags: string | null
          bem: string | null
          bez: string | null
          dlm_id: string | null
          ewz: number | null
          gen: string | null
          geom: unknown | null
          ibz: number | null
          kfl: number | null
          nuts: string | null
          objectid: number
          sn_g: string | null
          sn_k: string | null
          sn_l: string | null
          sn_r: string | null
          wsk: string | null
        }
        Insert: {
          ags?: string | null
          bem?: string | null
          bez?: string | null
          dlm_id?: string | null
          ewz?: number | null
          gen?: string | null
          geom?: unknown | null
          ibz?: number | null
          kfl?: number | null
          nuts?: string | null
          objectid?: number
          sn_g?: string | null
          sn_k?: string | null
          sn_l?: string | null
          sn_r?: string | null
          wsk?: string | null
        }
        Update: {
          ags?: string | null
          bem?: string | null
          bez?: string | null
          dlm_id?: string | null
          ewz?: number | null
          gen?: string | null
          geom?: unknown | null
          ibz?: number | null
          kfl?: number | null
          nuts?: string | null
          objectid?: number
          sn_g?: string | null
          sn_k?: string | null
          sn_l?: string | null
          sn_r?: string | null
          wsk?: string | null
        }
        Relationships: []
      }
      heat_islands_final: {
        Row: {
          category: string | null
          geom: unknown | null
          uhi_intensity: number | null
        }
        Insert: {
          category?: string | null
          geom?: unknown | null
          uhi_intensity?: number | null
        }
        Update: {
          category?: string | null
          geom?: unknown | null
          uhi_intensity?: number | null
        }
        Relationships: []
      }
      kreise: {
        Row: {
          ags: string | null
          aufklaerp22: number | null
          aufklp: number | null
          efael22: number | null
          gen: string | null
          geom: unknown | null
          gewaltkriminalität: number | null
          hz: number | null
          objectid: number
          sw_droh: number | null
          sw_schuss: number | null
          tatverdaechtige: number | null
          tv_auslp: number | null
          tv_mann: number | null
          tv_weibl: number | null
          tv21_u_25: number | null
          tv25_u_30: number | null
          tv30_u_40: number | null
          tv40_u_50: number | null
          tv50_u_60: number | null
          tvu_21: number | null
          tvue_60: number | null
          v_efaelversp: number | null
          veraufklp: number | null
          verp: number | null
        }
        Insert: {
          ags?: string | null
          aufklaerp22?: number | null
          aufklp?: number | null
          efael22?: number | null
          gen?: string | null
          geom?: unknown | null
          gewaltkriminalität?: number | null
          hz?: number | null
          objectid?: number
          sw_droh?: number | null
          sw_schuss?: number | null
          tatverdaechtige?: number | null
          tv_auslp?: number | null
          tv_mann?: number | null
          tv_weibl?: number | null
          tv21_u_25?: number | null
          tv25_u_30?: number | null
          tv30_u_40?: number | null
          tv40_u_50?: number | null
          tv50_u_60?: number | null
          tvu_21?: number | null
          tvue_60?: number | null
          v_efaelversp?: number | null
          veraufklp?: number | null
          verp?: number | null
        }
        Update: {
          ags?: string | null
          aufklaerp22?: number | null
          aufklp?: number | null
          efael22?: number | null
          gen?: string | null
          geom?: unknown | null
          gewaltkriminalität?: number | null
          hz?: number | null
          objectid?: number
          sw_droh?: number | null
          sw_schuss?: number | null
          tatverdaechtige?: number | null
          tv_auslp?: number | null
          tv_mann?: number | null
          tv_weibl?: number | null
          tv21_u_25?: number | null
          tv25_u_30?: number | null
          tv30_u_40?: number | null
          tv40_u_50?: number | null
          tv50_u_60?: number | null
          tvu_21?: number | null
          tvue_60?: number | null
          v_efaelversp?: number | null
          veraufklp?: number | null
          verp?: number | null
        }
        Relationships: []
      }
      mobilfunkdata: {
        Row: {
          bl: string | null
          bundesland: string | null
          geom: unknown | null
          gid: number
          gsm_out: number | null
          id: string | null
          lte: number | null
          nr: number | null
          nr_sa: number | null
        }
        Insert: {
          bl?: string | null
          bundesland?: string | null
          geom?: unknown | null
          gid?: number
          gsm_out?: number | null
          id?: string | null
          lte?: number | null
          nr?: number | null
          nr_sa?: number | null
        }
        Update: {
          bl?: string | null
          bundesland?: string | null
          geom?: unknown | null
          gid?: number
          gsm_out?: number | null
          id?: string | null
          lte?: number | null
          nr?: number | null
          nr_sa?: number | null
        }
        Relationships: []
      }
      noise_airports: {
        Row: {
          category: string | null
          geom: unknown | null
          id: number
          measuretime_beginposition: string | null
          measuretime_endposition: string | null
          source: string | null
        }
        Insert: {
          category?: string | null
          geom?: unknown | null
          id?: number
          measuretime_beginposition?: string | null
          measuretime_endposition?: string | null
          source?: string | null
        }
        Update: {
          category?: string | null
          geom?: unknown | null
          id?: number
          measuretime_beginposition?: string | null
          measuretime_endposition?: string | null
          source?: string | null
        }
        Relationships: []
      }
      noise_big_cities: {
        Row: {
          category: string | null
          geom: unknown | null
          id: number
          measuretime_beginposition: string | null
          measuretime_endposition: string | null
          source: string | null
        }
        Insert: {
          category?: string | null
          geom?: unknown | null
          id?: number
          measuretime_beginposition?: string | null
          measuretime_endposition?: string | null
          source?: string | null
        }
        Update: {
          category?: string | null
          geom?: unknown | null
          id?: number
          measuretime_beginposition?: string | null
          measuretime_endposition?: string | null
          source?: string | null
        }
        Relationships: []
      }
      noise_railways: {
        Row: {
          category: string | null
          geom: unknown | null
          id: number
          measuretime_beginposition: string | null
          measuretime_endposition: string | null
          source: string | null
        }
        Insert: {
          category?: string | null
          geom?: unknown | null
          id?: number
          measuretime_beginposition?: string | null
          measuretime_endposition?: string | null
          source?: string | null
        }
        Update: {
          category?: string | null
          geom?: unknown | null
          id?: number
          measuretime_beginposition?: string | null
          measuretime_endposition?: string | null
          source?: string | null
        }
        Relationships: []
      }
      noise_roads: {
        Row: {
          category: string | null
          geom: unknown | null
          id: number
          measuretime_beginposition: string | null
          measuretime_endposition: string | null
          source: string | null
        }
        Insert: {
          category?: string | null
          geom?: unknown | null
          id?: number
          measuretime_beginposition?: string | null
          measuretime_endposition?: string | null
          source?: string | null
        }
        Update: {
          category?: string | null
          geom?: unknown | null
          id?: number
          measuretime_beginposition?: string | null
          measuretime_endposition?: string | null
          source?: string | null
        }
        Relationships: []
      }
      planet_osm_line: {
        Row: {
          access: string | null
          "addr:housename": string | null
          "addr:housenumber": string | null
          "addr:interpolation": string | null
          admin_level: string | null
          aerialway: string | null
          aeroway: string | null
          amenity: string | null
          area: string | null
          barrier: string | null
          bicycle: string | null
          boundary: string | null
          brand: string | null
          bridge: string | null
          building: string | null
          construction: string | null
          covered: string | null
          culvert: string | null
          cutting: string | null
          denomination: string | null
          disused: string | null
          embankment: string | null
          foot: string | null
          "generator:source": string | null
          harbour: string | null
          highway: string | null
          historic: string | null
          horse: string | null
          intermittent: string | null
          junction: string | null
          landuse: string | null
          layer: string | null
          leisure: string | null
          lock: string | null
          man_made: string | null
          military: string | null
          motorcar: string | null
          name: string | null
          natural: string | null
          office: string | null
          oneway: string | null
          operator: string | null
          osm_id: number | null
          place: string | null
          population: string | null
          power: string | null
          power_source: string | null
          public_transport: string | null
          railway: string | null
          ref: string | null
          religion: string | null
          route: string | null
          service: string | null
          shop: string | null
          sport: string | null
          surface: string | null
          tags: unknown | null
          toll: string | null
          tourism: string | null
          "tower:type": string | null
          tracktype: string | null
          tunnel: string | null
          water: string | null
          waterway: string | null
          way: unknown | null
          way_area: number | null
          wetland: string | null
          width: string | null
          wood: string | null
          z_order: number | null
        }
        Insert: {
          access?: string | null
          "addr:housename"?: string | null
          "addr:housenumber"?: string | null
          "addr:interpolation"?: string | null
          admin_level?: string | null
          aerialway?: string | null
          aeroway?: string | null
          amenity?: string | null
          area?: string | null
          barrier?: string | null
          bicycle?: string | null
          boundary?: string | null
          brand?: string | null
          bridge?: string | null
          building?: string | null
          construction?: string | null
          covered?: string | null
          culvert?: string | null
          cutting?: string | null
          denomination?: string | null
          disused?: string | null
          embankment?: string | null
          foot?: string | null
          "generator:source"?: string | null
          harbour?: string | null
          highway?: string | null
          historic?: string | null
          horse?: string | null
          intermittent?: string | null
          junction?: string | null
          landuse?: string | null
          layer?: string | null
          leisure?: string | null
          lock?: string | null
          man_made?: string | null
          military?: string | null
          motorcar?: string | null
          name?: string | null
          natural?: string | null
          office?: string | null
          oneway?: string | null
          operator?: string | null
          osm_id?: number | null
          place?: string | null
          population?: string | null
          power?: string | null
          power_source?: string | null
          public_transport?: string | null
          railway?: string | null
          ref?: string | null
          religion?: string | null
          route?: string | null
          service?: string | null
          shop?: string | null
          sport?: string | null
          surface?: string | null
          tags?: unknown | null
          toll?: string | null
          tourism?: string | null
          "tower:type"?: string | null
          tracktype?: string | null
          tunnel?: string | null
          water?: string | null
          waterway?: string | null
          way?: unknown | null
          way_area?: number | null
          wetland?: string | null
          width?: string | null
          wood?: string | null
          z_order?: number | null
        }
        Update: {
          access?: string | null
          "addr:housename"?: string | null
          "addr:housenumber"?: string | null
          "addr:interpolation"?: string | null
          admin_level?: string | null
          aerialway?: string | null
          aeroway?: string | null
          amenity?: string | null
          area?: string | null
          barrier?: string | null
          bicycle?: string | null
          boundary?: string | null
          brand?: string | null
          bridge?: string | null
          building?: string | null
          construction?: string | null
          covered?: string | null
          culvert?: string | null
          cutting?: string | null
          denomination?: string | null
          disused?: string | null
          embankment?: string | null
          foot?: string | null
          "generator:source"?: string | null
          harbour?: string | null
          highway?: string | null
          historic?: string | null
          horse?: string | null
          intermittent?: string | null
          junction?: string | null
          landuse?: string | null
          layer?: string | null
          leisure?: string | null
          lock?: string | null
          man_made?: string | null
          military?: string | null
          motorcar?: string | null
          name?: string | null
          natural?: string | null
          office?: string | null
          oneway?: string | null
          operator?: string | null
          osm_id?: number | null
          place?: string | null
          population?: string | null
          power?: string | null
          power_source?: string | null
          public_transport?: string | null
          railway?: string | null
          ref?: string | null
          religion?: string | null
          route?: string | null
          service?: string | null
          shop?: string | null
          sport?: string | null
          surface?: string | null
          tags?: unknown | null
          toll?: string | null
          tourism?: string | null
          "tower:type"?: string | null
          tracktype?: string | null
          tunnel?: string | null
          water?: string | null
          waterway?: string | null
          way?: unknown | null
          way_area?: number | null
          wetland?: string | null
          width?: string | null
          wood?: string | null
          z_order?: number | null
        }
        Relationships: []
      }
      planet_osm_point: {
        Row: {
          access: string | null
          "addr:housename": string | null
          "addr:housenumber": string | null
          "addr:interpolation": string | null
          admin_level: string | null
          aerialway: string | null
          aeroway: string | null
          amenity: string | null
          area: string | null
          barrier: string | null
          bicycle: string | null
          boundary: string | null
          brand: string | null
          bridge: string | null
          building: string | null
          capital: string | null
          construction: string | null
          covered: string | null
          culvert: string | null
          cutting: string | null
          denomination: string | null
          disused: string | null
          ele: string | null
          embankment: string | null
          foot: string | null
          "generator:source": string | null
          harbour: string | null
          highway: string | null
          historic: string | null
          horse: string | null
          intermittent: string | null
          junction: string | null
          landuse: string | null
          layer: string | null
          leisure: string | null
          lock: string | null
          man_made: string | null
          military: string | null
          motorcar: string | null
          name: string | null
          natural: string | null
          office: string | null
          oneway: string | null
          operator: string | null
          osm_id: number | null
          place: string | null
          population: string | null
          power: string | null
          power_source: string | null
          public_transport: string | null
          railway: string | null
          ref: string | null
          religion: string | null
          route: string | null
          service: string | null
          shop: string | null
          sport: string | null
          surface: string | null
          tags: unknown | null
          toll: string | null
          tourism: string | null
          "tower:type": string | null
          tunnel: string | null
          water: string | null
          waterway: string | null
          way: unknown | null
          wetland: string | null
          width: string | null
          wood: string | null
          z_order: number | null
        }
        Insert: {
          access?: string | null
          "addr:housename"?: string | null
          "addr:housenumber"?: string | null
          "addr:interpolation"?: string | null
          admin_level?: string | null
          aerialway?: string | null
          aeroway?: string | null
          amenity?: string | null
          area?: string | null
          barrier?: string | null
          bicycle?: string | null
          boundary?: string | null
          brand?: string | null
          bridge?: string | null
          building?: string | null
          capital?: string | null
          construction?: string | null
          covered?: string | null
          culvert?: string | null
          cutting?: string | null
          denomination?: string | null
          disused?: string | null
          ele?: string | null
          embankment?: string | null
          foot?: string | null
          "generator:source"?: string | null
          harbour?: string | null
          highway?: string | null
          historic?: string | null
          horse?: string | null
          intermittent?: string | null
          junction?: string | null
          landuse?: string | null
          layer?: string | null
          leisure?: string | null
          lock?: string | null
          man_made?: string | null
          military?: string | null
          motorcar?: string | null
          name?: string | null
          natural?: string | null
          office?: string | null
          oneway?: string | null
          operator?: string | null
          osm_id?: number | null
          place?: string | null
          population?: string | null
          power?: string | null
          power_source?: string | null
          public_transport?: string | null
          railway?: string | null
          ref?: string | null
          religion?: string | null
          route?: string | null
          service?: string | null
          shop?: string | null
          sport?: string | null
          surface?: string | null
          tags?: unknown | null
          toll?: string | null
          tourism?: string | null
          "tower:type"?: string | null
          tunnel?: string | null
          water?: string | null
          waterway?: string | null
          way?: unknown | null
          wetland?: string | null
          width?: string | null
          wood?: string | null
          z_order?: number | null
        }
        Update: {
          access?: string | null
          "addr:housename"?: string | null
          "addr:housenumber"?: string | null
          "addr:interpolation"?: string | null
          admin_level?: string | null
          aerialway?: string | null
          aeroway?: string | null
          amenity?: string | null
          area?: string | null
          barrier?: string | null
          bicycle?: string | null
          boundary?: string | null
          brand?: string | null
          bridge?: string | null
          building?: string | null
          capital?: string | null
          construction?: string | null
          covered?: string | null
          culvert?: string | null
          cutting?: string | null
          denomination?: string | null
          disused?: string | null
          ele?: string | null
          embankment?: string | null
          foot?: string | null
          "generator:source"?: string | null
          harbour?: string | null
          highway?: string | null
          historic?: string | null
          horse?: string | null
          intermittent?: string | null
          junction?: string | null
          landuse?: string | null
          layer?: string | null
          leisure?: string | null
          lock?: string | null
          man_made?: string | null
          military?: string | null
          motorcar?: string | null
          name?: string | null
          natural?: string | null
          office?: string | null
          oneway?: string | null
          operator?: string | null
          osm_id?: number | null
          place?: string | null
          population?: string | null
          power?: string | null
          power_source?: string | null
          public_transport?: string | null
          railway?: string | null
          ref?: string | null
          religion?: string | null
          route?: string | null
          service?: string | null
          shop?: string | null
          sport?: string | null
          surface?: string | null
          tags?: unknown | null
          toll?: string | null
          tourism?: string | null
          "tower:type"?: string | null
          tunnel?: string | null
          water?: string | null
          waterway?: string | null
          way?: unknown | null
          wetland?: string | null
          width?: string | null
          wood?: string | null
          z_order?: number | null
        }
        Relationships: []
      }
      planet_osm_polygon: {
        Row: {
          access: string | null
          "addr:housename": string | null
          "addr:housenumber": string | null
          "addr:interpolation": string | null
          admin_level: string | null
          aerialway: string | null
          aeroway: string | null
          amenity: string | null
          area: string | null
          barrier: string | null
          bicycle: string | null
          boundary: string | null
          brand: string | null
          bridge: string | null
          building: string | null
          construction: string | null
          covered: string | null
          culvert: string | null
          cutting: string | null
          denomination: string | null
          disused: string | null
          embankment: string | null
          foot: string | null
          "generator:source": string | null
          harbour: string | null
          highway: string | null
          historic: string | null
          horse: string | null
          intermittent: string | null
          junction: string | null
          landuse: string | null
          layer: string | null
          leisure: string | null
          lock: string | null
          man_made: string | null
          military: string | null
          motorcar: string | null
          name: string | null
          natural: string | null
          office: string | null
          oneway: string | null
          operator: string | null
          osm_id: number | null
          place: string | null
          population: string | null
          power: string | null
          power_source: string | null
          public_transport: string | null
          railway: string | null
          ref: string | null
          religion: string | null
          route: string | null
          service: string | null
          shop: string | null
          sport: string | null
          surface: string | null
          tags: unknown | null
          toll: string | null
          tourism: string | null
          "tower:type": string | null
          tracktype: string | null
          tunnel: string | null
          water: string | null
          waterway: string | null
          way: unknown | null
          way_area: number | null
          wetland: string | null
          width: string | null
          wood: string | null
          z_order: number | null
        }
        Insert: {
          access?: string | null
          "addr:housename"?: string | null
          "addr:housenumber"?: string | null
          "addr:interpolation"?: string | null
          admin_level?: string | null
          aerialway?: string | null
          aeroway?: string | null
          amenity?: string | null
          area?: string | null
          barrier?: string | null
          bicycle?: string | null
          boundary?: string | null
          brand?: string | null
          bridge?: string | null
          building?: string | null
          construction?: string | null
          covered?: string | null
          culvert?: string | null
          cutting?: string | null
          denomination?: string | null
          disused?: string | null
          embankment?: string | null
          foot?: string | null
          "generator:source"?: string | null
          harbour?: string | null
          highway?: string | null
          historic?: string | null
          horse?: string | null
          intermittent?: string | null
          junction?: string | null
          landuse?: string | null
          layer?: string | null
          leisure?: string | null
          lock?: string | null
          man_made?: string | null
          military?: string | null
          motorcar?: string | null
          name?: string | null
          natural?: string | null
          office?: string | null
          oneway?: string | null
          operator?: string | null
          osm_id?: number | null
          place?: string | null
          population?: string | null
          power?: string | null
          power_source?: string | null
          public_transport?: string | null
          railway?: string | null
          ref?: string | null
          religion?: string | null
          route?: string | null
          service?: string | null
          shop?: string | null
          sport?: string | null
          surface?: string | null
          tags?: unknown | null
          toll?: string | null
          tourism?: string | null
          "tower:type"?: string | null
          tracktype?: string | null
          tunnel?: string | null
          water?: string | null
          waterway?: string | null
          way?: unknown | null
          way_area?: number | null
          wetland?: string | null
          width?: string | null
          wood?: string | null
          z_order?: number | null
        }
        Update: {
          access?: string | null
          "addr:housename"?: string | null
          "addr:housenumber"?: string | null
          "addr:interpolation"?: string | null
          admin_level?: string | null
          aerialway?: string | null
          aeroway?: string | null
          amenity?: string | null
          area?: string | null
          barrier?: string | null
          bicycle?: string | null
          boundary?: string | null
          brand?: string | null
          bridge?: string | null
          building?: string | null
          construction?: string | null
          covered?: string | null
          culvert?: string | null
          cutting?: string | null
          denomination?: string | null
          disused?: string | null
          embankment?: string | null
          foot?: string | null
          "generator:source"?: string | null
          harbour?: string | null
          highway?: string | null
          historic?: string | null
          horse?: string | null
          intermittent?: string | null
          junction?: string | null
          landuse?: string | null
          layer?: string | null
          leisure?: string | null
          lock?: string | null
          man_made?: string | null
          military?: string | null
          motorcar?: string | null
          name?: string | null
          natural?: string | null
          office?: string | null
          oneway?: string | null
          operator?: string | null
          osm_id?: number | null
          place?: string | null
          population?: string | null
          power?: string | null
          power_source?: string | null
          public_transport?: string | null
          railway?: string | null
          ref?: string | null
          religion?: string | null
          route?: string | null
          service?: string | null
          shop?: string | null
          sport?: string | null
          surface?: string | null
          tags?: unknown | null
          toll?: string | null
          tourism?: string | null
          "tower:type"?: string | null
          tracktype?: string | null
          tunnel?: string | null
          water?: string | null
          waterway?: string | null
          way?: unknown | null
          way_area?: number | null
          wetland?: string | null
          width?: string | null
          wood?: string | null
          z_order?: number | null
        }
        Relationships: []
      }
      planet_osm_roads: {
        Row: {
          access: string | null
          "addr:housename": string | null
          "addr:housenumber": string | null
          "addr:interpolation": string | null
          admin_level: string | null
          aerialway: string | null
          aeroway: string | null
          amenity: string | null
          area: string | null
          barrier: string | null
          bicycle: string | null
          boundary: string | null
          brand: string | null
          bridge: string | null
          building: string | null
          construction: string | null
          covered: string | null
          culvert: string | null
          cutting: string | null
          denomination: string | null
          disused: string | null
          embankment: string | null
          foot: string | null
          "generator:source": string | null
          harbour: string | null
          highway: string | null
          historic: string | null
          horse: string | null
          intermittent: string | null
          junction: string | null
          landuse: string | null
          layer: string | null
          leisure: string | null
          lock: string | null
          man_made: string | null
          military: string | null
          motorcar: string | null
          name: string | null
          natural: string | null
          office: string | null
          oneway: string | null
          operator: string | null
          osm_id: number | null
          place: string | null
          population: string | null
          power: string | null
          power_source: string | null
          public_transport: string | null
          railway: string | null
          ref: string | null
          religion: string | null
          route: string | null
          service: string | null
          shop: string | null
          sport: string | null
          surface: string | null
          tags: unknown | null
          toll: string | null
          tourism: string | null
          "tower:type": string | null
          tracktype: string | null
          tunnel: string | null
          water: string | null
          waterway: string | null
          way: unknown | null
          way_area: number | null
          wetland: string | null
          width: string | null
          wood: string | null
          z_order: number | null
        }
        Insert: {
          access?: string | null
          "addr:housename"?: string | null
          "addr:housenumber"?: string | null
          "addr:interpolation"?: string | null
          admin_level?: string | null
          aerialway?: string | null
          aeroway?: string | null
          amenity?: string | null
          area?: string | null
          barrier?: string | null
          bicycle?: string | null
          boundary?: string | null
          brand?: string | null
          bridge?: string | null
          building?: string | null
          construction?: string | null
          covered?: string | null
          culvert?: string | null
          cutting?: string | null
          denomination?: string | null
          disused?: string | null
          embankment?: string | null
          foot?: string | null
          "generator:source"?: string | null
          harbour?: string | null
          highway?: string | null
          historic?: string | null
          horse?: string | null
          intermittent?: string | null
          junction?: string | null
          landuse?: string | null
          layer?: string | null
          leisure?: string | null
          lock?: string | null
          man_made?: string | null
          military?: string | null
          motorcar?: string | null
          name?: string | null
          natural?: string | null
          office?: string | null
          oneway?: string | null
          operator?: string | null
          osm_id?: number | null
          place?: string | null
          population?: string | null
          power?: string | null
          power_source?: string | null
          public_transport?: string | null
          railway?: string | null
          ref?: string | null
          religion?: string | null
          route?: string | null
          service?: string | null
          shop?: string | null
          sport?: string | null
          surface?: string | null
          tags?: unknown | null
          toll?: string | null
          tourism?: string | null
          "tower:type"?: string | null
          tracktype?: string | null
          tunnel?: string | null
          water?: string | null
          waterway?: string | null
          way?: unknown | null
          way_area?: number | null
          wetland?: string | null
          width?: string | null
          wood?: string | null
          z_order?: number | null
        }
        Update: {
          access?: string | null
          "addr:housename"?: string | null
          "addr:housenumber"?: string | null
          "addr:interpolation"?: string | null
          admin_level?: string | null
          aerialway?: string | null
          aeroway?: string | null
          amenity?: string | null
          area?: string | null
          barrier?: string | null
          bicycle?: string | null
          boundary?: string | null
          brand?: string | null
          bridge?: string | null
          building?: string | null
          construction?: string | null
          covered?: string | null
          culvert?: string | null
          cutting?: string | null
          denomination?: string | null
          disused?: string | null
          embankment?: string | null
          foot?: string | null
          "generator:source"?: string | null
          harbour?: string | null
          highway?: string | null
          historic?: string | null
          horse?: string | null
          intermittent?: string | null
          junction?: string | null
          landuse?: string | null
          layer?: string | null
          leisure?: string | null
          lock?: string | null
          man_made?: string | null
          military?: string | null
          motorcar?: string | null
          name?: string | null
          natural?: string | null
          office?: string | null
          oneway?: string | null
          operator?: string | null
          osm_id?: number | null
          place?: string | null
          population?: string | null
          power?: string | null
          power_source?: string | null
          public_transport?: string | null
          railway?: string | null
          ref?: string | null
          religion?: string | null
          route?: string | null
          service?: string | null
          shop?: string | null
          sport?: string | null
          surface?: string | null
          tags?: unknown | null
          toll?: string | null
          tourism?: string | null
          "tower:type"?: string | null
          tracktype?: string | null
          tunnel?: string | null
          water?: string | null
          waterway?: string | null
          way?: unknown | null
          way_area?: number | null
          wetland?: string | null
          width?: string | null
          wood?: string | null
          z_order?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_area_coverage: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          green_coverage_percent: number
          water_coverage_percent: number
          sealed_coverage_percent: number
          total_area_sqm: number
          green_area_sqm: number
          water_area_sqm: number
          sealed_area_sqm: number
          details: Json
        }[]
      }
      calculate_area_coverage_fixed: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          green_coverage_percent: number
          water_coverage_percent: number
          sealed_coverage_percent: number
          total_area_sqm: number
          green_area_sqm: number
          water_area_sqm: number
          sealed_area_sqm: number
          details: Json
        }[]
      }
      calculate_area_coverage_supabase_safe: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          green_coverage_percent: number
          water_coverage_percent: number
          sealed_coverage_percent: number
          total_area_sqm: number
          green_area_sqm: number
          water_area_sqm: number
          sealed_area_sqm: number
          details: Json
        }[]
      }
      calculate_green_area_percentage: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          total_area_sqm: number
          green_area_sqm: number
          green_percentage: number
        }[]
      }
      calculate_green_recreation: {
        Args:
          | { input_lat: number; input_lon: number; radius_meters?: number }
          | { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          location_point: string
          green_recreation_index: number
          park_score: number
          forest_score: number
          water_score: number
          tree_density_score: number
          details: Json
        }[]
      }
      calculate_green_recreation_index_improved: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          green_recreation_index: number
          park_score: number
          forest_score: number
          water_score: number
          tree_density_score: number
          details: Json
        }[]
      }
      calculate_green_recreation_index_simple: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          green_recreation_index: number
          park_score: number
          forest_score: number
          water_score: number
          tree_density_score: number
          details: Json
        }[]
      }
      calculate_green_recreation_index_supabase: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          green_recreation_index: number
          park_score: number
          forest_score: number
          water_score: number
          tree_density_score: number
          details: Json
        }[]
      }
      calculate_green_recreation_index_v5: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          green_recreation_index: number
          park_score: number
          forest_score: number
          water_score: number
          tree_density_score: number
          details: Json
        }[]
      }
      calculate_water_area_percentage: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          total_area_sqm: number
          water_area_sqm: number
          water_percentage: number
        }[]
      }
      check_heat_island: {
        Args: { lon: number; lat: number }
        Returns: {
          heat_level: string
          uhi_intensity: number
        }[]
      }
      check_noise_exposure: {
        Args: { point_lat: number; point_lon: number }
        Returns: {
          day_noise_category: string
          day_distance_meters: number
          day_source: string
          day_table_source: string
          night_noise_category: string
          night_distance_meters: number
          night_source: string
          night_table_source: string
        }[]
      }
      find_charging_stations_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          amenity: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_education_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          amenity: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_food_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          amenity: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_health_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          amenity: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_parks_recreation_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          feature_type: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_pois_by_amenity: {
        Args: {
          input_lat: number
          input_lon: number
          amenity_list: string[]
          category_name: string
          radius_meters?: number
          max_results?: number
        }
        Returns: {
          osm_id: number
          name: string
          amenity: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_public_safety_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          amenity: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_public_transport_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          amenity: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_shopping_services_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          amenity: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      find_shops_nearby: {
        Args: { input_lat: number; input_lon: number; radius_meters?: number }
        Returns: {
          osm_id: number
          name: string
          shop: string
          category: string
          distance_meters: number
          latitude: number
          longitude: number
        }[]
      }
      flood_check: {
        Args: { lon: number; lat: number }
        Returns: {
          flood_risk: string
          area_name: string
          frequency: string
          protection: string
          flood_source: string
          data_year: string
        }[]
      }
      get_complete_crime_stats: {
        Args: { lat: number; lon: number }
        Returns: {
          gemeinde_name: string
          gemeinde_einwohner: number
          gemeinde_ags: string
          kreis_name: string
          kreis_ags: string
          gewaltkriminalitaet: number
          haeufigkeitszahl: number
          veraenderung_faelle_prozent: number
          schusswaffen_drohung: number
          schusswaffen_schuss: number
          aufklaerungsquote_aktuell: number
          erfasste_faelle_2022: number
          veraenderung_prozent: number
          aufklaerungsquote_2022: number
          veraenderung_aufklaerungsquote: number
          tatverdaechtige_maennlich: number
          tatverdaechtige_weiblich: number
          auslaenderanteil_prozent: number
          tatverdaechtige_gesamt: number
          tv_unter_21: number
          tv_21_bis_25: number
          tv_25_bis_30: number
          tv_30_bis_40: number
          tv_40_bis_50: number
          tv_50_bis_60: number
          tv_ueber_60: number
          crime_level: string
        }[]
      }
      get_gemeinde_info: {
        Args: { lat: number; lon: number }
        Returns: {
          gemeinde_name: string
          gemeinde_typ: string
          ags_vollstaendig: string
          land_schluessel: string
          regierungsbezirk_schluessel: string
          kreis_schluessel: string
          gemeinde_schluessel: string
          nuts_code: string
          wirksamkeit_datum: string
          einwohnerzahl: number
          flaeche_km2: number
          bevoelkerungsdichte: number
          dlm_identifikator: string
          bemerkung: string
          verwaltungstyp: string
        }[]
      }
      get_mobilfunk_coverage: {
        Args: { lon: number; lat: number }
        Returns: {
          bundesland: string
          bl_code: string
          gsm_coverage: number
          lte_coverage: number
          nr_coverage: number
          nr_sa_coverage: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  geodata: {
    Enums: {},
  },
} as const

