'use client';

import QLucideIcon, { QLucideIconType } from '@/components/ui/LucideIcon';
import type { AnalysisResponse } from '@/app/api/analyze/route';

interface AnalysisResultProps {
  data: AnalysisResponse;
}

export const AnalysisResult = ({ data }: AnalysisResultProps) => {
  const { flurstueck, naturschutz, ffh, hochwasser } = data;

  // Check if Flurstück data exists
  const hasFlurstueck = flurstueck && Object.keys(flurstueck).length > 0;

  // Check if Naturschutz data exists and is meaningful
  const hasNaturschutz =
    naturschutz &&
    Object.keys(naturschutz).length > 0 &&
    naturschutz.gebietsname &&
    naturschutz.gebietsname.trim().length > 0;

  // Check if FFH data exists and is meaningful
  const hasFFH =
    ffh &&
    Object.keys(ffh).length > 0 &&
    ffh.gebietsname &&
    ffh.gebietsname.trim().length > 0;

  // Check if Hochwasser data exists and is meaningful
  const hasHochwasser =
    hochwasser &&
    Object.keys(hochwasser).length > 0 &&
    hochwasser.name &&
    hochwasser.name.trim().length > 0;

  // Helper to safely format numbers
  const formatHa = (value: unknown): string => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return 'k.A.';
    }
    const num = Number(value);
    return num.toLocaleString('de-DE', { maximumFractionDigits: 2 });
  };

  // Helper to safely get string value
  const safeString = (value: unknown, fallback = 'k.A.'): string => {
    if (value === null || value === undefined || value === '') {
      return fallback;
    }
    return String(value);
  };

  if (!hasFlurstueck) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <QLucideIcon icon="AlertCircle" size={32} strokeWidth={2} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Keine Daten gefunden
        </h3>
        <p className="text-sm text-gray-600">
          Für diese Koordinaten konnten keine Flurstück-Informationen gefunden werden.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Flurstück Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-600 shadow-sm">
              <QLucideIcon icon="MapPin" size={20} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Flurstück-Informationen</h3>
              <p className="text-xs text-gray-600">
                {safeString(flurstueck.flstnrzae, '-')}
                {flurstueck.flstnrnen ? `/${flurstueck.flstnrnen}` : ''} · {safeString(flurstueck.gemarkung)}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Hauptinformationen */}
          <div className="grid grid-cols-2 gap-3">
            <DataField
              label="Flurstücknummer"
              value={`${safeString(flurstueck.flstnrzae, '-')}${flurstueck.flstnrnen ? `/${flurstueck.flstnrnen}` : ''}`}
              icon="Hash"
            />
            <DataField
              label="Fläche"
              value={flurstueck.flaeche ? `${formatHa(flurstueck.flaeche / 10000)} ha (${flurstueck.flaeche.toLocaleString('de-DE')} m²)` : 'k.A.'}
              icon="Maximize2"
            />
          </div>

          {/* Geografische Informationen */}
          <div className="pt-3 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Geografische Lage</h4>
            <div className="grid grid-cols-2 gap-3">
              <DataField label="Gemarkung" value={safeString(flurstueck.gemarkung)} icon="Map" />
              <DataField label="Flur" value={safeString(flurstueck.flur)} icon="Layers" />
              <DataField label="Gemeinde" value={safeString(flurstueck.gemeinde)} icon="Building2" />
              <DataField label="Kreis" value={safeString(flurstueck.kreis)} icon="MapPin" />
              <DataField label="Land" value={safeString(flurstueck.land)} icon="Globe" />
              {flurstueck.regbezirk && (
                <DataField label="Regierungsbezirk" value={safeString(flurstueck.regbezirk)} icon="Building" />
              )}
            </div>
          </div>

          {/* Schlüssel & Identifikation */}
          <div className="pt-3 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Amtliche Schlüssel</h4>
            <div className="grid grid-cols-2 gap-3">
              <DataField label="Flurstückkennzeichen" value={safeString(flurstueck.flstkennz)} icon="Key" small />
              <DataField label="ID Flurstück" value={safeString(flurstueck.idflurst)} icon="Fingerprint" small />
              <DataField label="Gemarkungsschlüssel" value={safeString(flurstueck.gemaschl)} icon="Hash" small />
              <DataField label="Flurschlüssel" value={safeString(flurstueck.flurschl)} icon="Hash" small />
              <DataField label="Gemeindeschlüssel" value={safeString(flurstueck.gmdschl)} icon="Hash" small />
              <DataField label="Kreisschlüssel" value={safeString(flurstueck.kreisschl)} icon="Hash" small />
              <DataField label="Landschlüssel" value={safeString(flurstueck.landschl)} icon="Hash" small />
              <DataField label="Regierungsbezirk-Schlüssel" value={safeString(flurstueck.regbezschl)} icon="Hash" small />
              <DataField label="OID" value={safeString(flurstueck.oid_)} icon="Binary" small />
              <DataField label="FID" value={safeString(flurstueck.fid?.toString())} icon="Binary" small />
            </div>
          </div>

          {/* Zusätzliche Informationen */}
          <div className="pt-3 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Weitere Informationen</h4>
            <div className="grid grid-cols-2 gap-3">
              <DataField label="Aktualität" value={safeString(flurstueck.aktualit)} icon="Calendar" small />
              <DataField label="Abweichendes Recht" value={flurstueck.abwrecht === 'true' ? 'Ja' : 'Nein'} icon="Scale" small />
              {flurstueck.lagebeztxt && (
                <DataField label="Lagebezeichnung" value={safeString(flurstueck.lagebeztxt)} icon="MapPin" className="col-span-2" />
              )}
              {flurstueck.tntext && (
                <DataField label="Nutzungsart" value={safeString(flurstueck.tntext)} icon="TreeDeciduous" className="col-span-2" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Naturschutz Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`px-5 py-4 border-b ${hasNaturschutz ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-sm ${hasNaturschutz ? 'bg-green-600' : 'bg-gray-400'}`}>
              <QLucideIcon icon="TreePine" size={20} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Naturschutz-Informationen</h3>
              <p className="text-xs text-gray-600">
                {hasNaturschutz ? safeString(naturschutz.gebietsname) : 'Kein Schutzgebiet'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {hasNaturschutz ? (
            <div className="space-y-4">
              {/* Schutzgebiet Übersicht */}
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 mb-2">
                    {safeString(naturschutz.gebietsname)}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {naturschutz.schutzgebietstyp_kurz && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-600 text-white">
                        {naturschutz.schutzgebietstyp_kurz}
                      </span>
                    )}
                    {naturschutz.schutzgebietstyp && (
                      <span className="text-xs text-gray-600 font-medium">{naturschutz.schutzgebietstyp}</span>
                    )}
                    {naturschutz.schutzstatus && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                        {naturschutz.schutzstatus}
                      </span>
                    )}
                  </div>
                </div>
                {naturschutz.flaeche_ha_gesamt && (
                  <div className="text-right bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatHa(naturschutz.flaeche_ha_gesamt)} ha
                    </div>
                    <div className="text-xs text-gray-600">Gesamtfläche</div>
                  </div>
                )}
              </div>

              {/* Basisdaten */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Basisdaten</h4>
                <div className="grid grid-cols-2 gap-3">
                  {naturschutz.gebietsnummer && (
                    <DataField label="Gebietsnummer" value={naturschutz.gebietsnummer} icon="Hash" />
                  )}
                  {naturschutz.gebietsnummer_intern && (
                    <DataField label="Interne Nummer" value={naturschutz.gebietsnummer_intern} icon="Hash" />
                  )}
                  {naturschutz.inkrafttreten && (
                    <DataField label="In Kraft getreten" value={naturschutz.inkrafttreten} icon="Calendar" />
                  )}
                  {naturschutz.fid && (
                    <DataField label="FID" value={naturschutz.fid} icon="Binary" small />
                  )}
                </div>
              </div>

              {/* Überlappung */}
              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Überlappung mit Flurstück</h4>
                <div className="grid grid-cols-2 gap-3">
                  {naturschutz.ueberlappung_prozent && (
                    <DataField
                      label="Überlappung"
                      value={`${formatHa(parseFloat(naturschutz.ueberlappung_prozent))} %`}
                      icon="Layers"
                    />
                  )}
                  {naturschutz.ueberlappung_qm && (
                    <DataField
                      label="Überlappungsfläche"
                      value={`${formatHa(parseFloat(naturschutz.ueberlappung_qm) / 10000)} ha (${parseFloat(naturschutz.ueberlappung_qm).toLocaleString('de-DE', { maximumFractionDigits: 0 })} m²)`}
                      icon="Maximize2"
                    />
                  )}
                </div>
              </div>

              {/* Rechtliche Grundlagen */}
              {(naturschutz.schutzanordnung || naturschutz.bekanntmachung) && (
                <div className="pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Rechtliche Grundlagen</h4>
                  <div className="space-y-3">
                    {naturschutz.schutzanordnung && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start gap-2 mb-1">
                          <QLucideIcon icon="FileText" size={14} strokeWidth={2} className="text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-medium text-gray-700">Schutzanordnung:</span>
                        </div>
                        <p className="text-xs text-gray-900 leading-relaxed ml-6">{naturschutz.schutzanordnung}</p>
                      </div>
                    )}
                    {naturschutz.bekanntmachung && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start gap-2 mb-1">
                          <QLucideIcon icon="BookOpen" size={14} strokeWidth={2} className="text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-medium text-gray-700">Bekanntmachung:</span>
                        </div>
                        <p className="text-xs text-gray-900 leading-relaxed ml-6">{naturschutz.bekanntmachung}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3 py-4">
              <QLucideIcon icon="Info" size={20} strokeWidth={2} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Kein Naturschutzgebiet
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dieses Flurstück liegt nicht in einem Naturschutzgebiet oder es sind keine Naturschutz-Informationen verfügbar.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FFH Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`px-5 py-4 border-b ${hasFFH ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-sm ${hasFFH ? 'bg-purple-600' : 'bg-gray-400'}`}>
              <QLucideIcon icon="Leaf" size={20} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">FFH-Gebiet</h3>
              <p className="text-xs text-gray-600">
                {hasFFH ? safeString(ffh.gebietsname) : 'Kein FFH-Gebiet'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {hasFFH ? (
            <div className="space-y-4">
              {/* FFH Übersicht */}
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-900 mb-2">
                    {safeString(ffh.gebietsname)}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {ffh.schutzgebietstyp_kurz && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-600 text-white">
                        {ffh.schutzgebietstyp_kurz}
                      </span>
                    )}
                    {ffh.schutzgebietstyp && (
                      <span className="text-xs text-gray-600 font-medium">{ffh.schutzgebietstyp}</span>
                    )}
                  </div>
                </div>
                {ffh.flaeche_ha && (
                  <div className="text-right bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatHa(ffh.flaeche_ha)} ha
                    </div>
                    <div className="text-xs text-gray-600">Gesamtfläche</div>
                  </div>
                )}
              </div>

              {/* Basisdaten */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Basisdaten</h4>
                <div className="grid grid-cols-2 gap-3">
                  {ffh.gebietsnummer && (
                    <DataField label="Gebietsnummer" value={ffh.gebietsnummer} icon="Hash" />
                  )}
                  {ffh.gebietsnummer_intern && (
                    <DataField label="Interne Nummer" value={ffh.gebietsnummer_intern.toString()} icon="Hash" />
                  )}
                  {ffh.ogc_fid && (
                    <DataField label="OGC FID" value={ffh.ogc_fid.toString()} icon="Binary" small />
                  )}
                  {ffh.fid && (
                    <DataField label="FID" value={ffh.fid.toString()} icon="Binary" small />
                  )}
                </div>
              </div>

              {/* Überlappung */}
              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Überlappung mit Flurstück</h4>
                <div className="grid grid-cols-2 gap-3">
                  {ffh.ueberlappung_prozent && (
                    <DataField
                      label="Überlappung"
                      value={`${formatHa(parseFloat(ffh.ueberlappung_prozent))} %`}
                      icon="Layers"
                    />
                  )}
                  {ffh.ueberlappung_qm && (
                    <DataField
                      label="Überlappungsfläche"
                      value={`${formatHa(parseFloat(ffh.ueberlappung_qm) / 10000)} ha (${parseFloat(ffh.ueberlappung_qm).toLocaleString('de-DE', { maximumFractionDigits: 0 })} m²)`}
                      icon="Maximize2"
                    />
                  )}
                </div>
              </div>

              {/* Standarddatenbogen Link */}
              {ffh.link_standarddatenbogen && (
                <div className="pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Weitere Informationen</h4>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start gap-2 mb-1">
                      <QLucideIcon icon="ExternalLink" size={14} strokeWidth={2} className="text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-700">Standarddatenbogen:</span>
                    </div>
                    <a
                      href={ffh.link_standarddatenbogen}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 hover:text-purple-700 underline ml-6 break-all"
                    >
                      {ffh.link_standarddatenbogen}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3 py-4">
              <QLucideIcon icon="Info" size={20} strokeWidth={2} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Kein FFH-Gebiet
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dieses Flurstück liegt nicht in einem Fauna-Flora-Habitat-Gebiet oder es sind keine FFH-Informationen verfügbar.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hochwasser Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`px-5 py-4 border-b ${hasHochwasser ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-sm ${hasHochwasser ? 'bg-blue-600' : 'bg-gray-400'}`}>
              <QLucideIcon icon="Waves" size={20} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Hochwasserrisikogebiet</h3>
              <p className="text-xs text-gray-600">
                {hasHochwasser ? safeString(hochwasser.name) : 'Kein Hochwasserrisiko'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {hasHochwasser ? (
            <div className="space-y-4">
              {/* Hochwasser Übersicht */}
              <div className="pb-3 border-b border-gray-100">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 flex-shrink-0">
                    <QLucideIcon icon="AlertTriangle" size={16} strokeWidth={2} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
                      {safeString(hochwasser.name)}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {hochwasser.ereignis && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-600 text-white">
                          {hochwasser.ereignis}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {hochwasser.hinweis && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <QLucideIcon icon="Info" size={14} strokeWidth={2} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-amber-900 leading-relaxed">{hochwasser.hinweis}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Basisdaten */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Basisdaten</h4>
                <div className="grid grid-cols-2 gap-3">
                  {hochwasser.ereignis && (
                    <DataField label="Ereignis" value={hochwasser.ereignis} icon="Zap" />
                  )}
                  {hochwasser.layer && (
                    <DataField label="Layer" value={hochwasser.layer} icon="Layers" small />
                  )}
                  {hochwasser.shape_area && (
                    <DataField
                      label="Gebietsfläche"
                      value={`${formatHa(hochwasser.shape_area / 10000)} ha`}
                      icon="Maximize2"
                    />
                  )}
                  {hochwasser.shape_len && (
                    <DataField
                      label="Umfang"
                      value={`${formatHa(hochwasser.shape_len / 1000)} km`}
                      icon="Ruler"
                    />
                  )}
                  {hochwasser.ogc_fid && (
                    <DataField label="OGC FID" value={hochwasser.ogc_fid.toString()} icon="Binary" small />
                  )}
                  {hochwasser.fid && (
                    <DataField label="FID" value={hochwasser.fid.toString()} icon="Binary" small />
                  )}
                </div>
              </div>

              {/* Überlappung */}
              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Überlappung mit Flurstück</h4>
                <div className="grid grid-cols-2 gap-3">
                  {hochwasser.ueberlappung_prozent && (
                    <DataField
                      label="Überlappung"
                      value={`${formatHa(parseFloat(hochwasser.ueberlappung_prozent))} %`}
                      icon="Layers"
                    />
                  )}
                  {hochwasser.ueberlappung_qm && (
                    <DataField
                      label="Betroffene Fläche"
                      value={`${formatHa(parseFloat(hochwasser.ueberlappung_qm) / 10000)} ha (${parseFloat(hochwasser.ueberlappung_qm).toLocaleString('de-DE', { maximumFractionDigits: 0 })} m²)`}
                      icon="Maximize2"
                    />
                  )}
                </div>
              </div>

              {/* Datenquelle */}
              {hochwasser.path && (
                <div className="pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Datenquelle</h4>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start gap-2 mb-1">
                      <QLucideIcon icon="Database" size={14} strokeWidth={2} className="text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-700">Pfad:</span>
                    </div>
                    <p className="text-xs text-gray-900 font-mono ml-6 break-all">{hochwasser.path}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3 py-4">
              <QLucideIcon icon="Info" size={20} strokeWidth={2} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Kein Hochwasserrisikogebiet
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dieses Flurstück liegt nicht in einem Hochwasserrisikogebiet oder es sind keine Hochwasser-Informationen verfügbar.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zusammenfassung */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 flex-shrink-0">
            <QLucideIcon icon="FileText" size={16} strokeWidth={2} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Zusammenfassung</h4>
            <p className="text-xs text-blue-800 leading-relaxed">
              Das Flurstück {safeString(flurstueck.flstnrzae, '-')}
              {flurstueck.flstnrnen && `/${flurstueck.flstnrnen}`}
              {flurstueck.gemarkung && ` in der Gemarkung ${flurstueck.gemarkung}`}
              {flurstueck.gemeinde && `, Gemeinde ${flurstueck.gemeinde}`}
              {flurstueck.flaeche && ` mit einer Fläche von ${formatHa(flurstueck.flaeche / 10000)} ha`}
              {hasNaturschutz && (
                <>
                  {' '}liegt zu {formatHa(parseFloat(naturschutz.ueberlappung_prozent || '0'))} % im {naturschutz.schutzgebietstyp || 'Schutzgebiet'} &quot;{naturschutz.gebietsname}&quot;{naturschutz.schutzgebietstyp_kurz && ` (${naturschutz.schutzgebietstyp_kurz})`}
                </>
              )}
              {hasFFH && (
                <>
                  {hasNaturschutz ? ' und' : ' liegt'} zu {formatHa(parseFloat(ffh.ueberlappung_prozent || '0'))} % im FFH-Gebiet &quot;{ffh.gebietsname}&quot;
                </>
              )}
              {hasHochwasser && (
                <>
                  {'. '}Zudem ist {formatHa(parseFloat(hochwasser.ueberlappung_prozent || '0'))} % der Fläche von Hochwasser ({hochwasser.ereignis}) betroffen
                </>
              )}
              {!hasNaturschutz && !hasFFH && !hasHochwasser && ' liegt in keinem Schutz- oder Risikogebiet'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component für Datenfelder
interface DataFieldProps {
  label: string;
  value: string | number;
  icon?: QLucideIconType;
  small?: boolean;
  className?: string;
}

const DataField = ({ label, value, icon, small, className }: DataFieldProps) => (
  <div className={`${className || ''}`}>
    <div className="flex items-center gap-1.5 mb-1">
      {icon && <QLucideIcon icon={icon} size={small ? 12 : 14} strokeWidth={2} className="text-gray-400" />}
      <span className={`${small ? 'text-xs' : 'text-xs'} text-gray-600 font-medium`}>{label}</span>
    </div>
    <p className={`${small ? 'text-xs' : 'text-sm'} text-gray-900 font-normal leading-snug`}>
      {value}
    </p>
  </div>
);
