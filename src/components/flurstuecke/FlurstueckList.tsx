'use client';

import { Flurstueck } from '@/types/landeigentuemer';
import QLucideIcon from '@/components/ui/LucideIcon';

interface FlurstueckListProps {
  flurstuecke: Flurstueck[];
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const FlurstueckList = ({
  flurstuecke,
  onDelete,
  onEdit,
}: FlurstueckListProps) => {
  if (flurstuecke.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          <QLucideIcon icon="MapPin" size={24} strokeWidth={1.5} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">Noch keine Flurstücke zugeordnet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {flurstuecke.map((flurstueck) => (
        <div
          key={flurstueck.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50">
                  <QLucideIcon icon="MapPin" size={20} strokeWidth={2} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    Flurstück {flurstueck.flstnrzae || 'N/A'}
                    {flurstueck.flstnrnen && `/${flurstueck.flstnrnen}`}
                  </h3>
                  {flurstueck.flaeche && (
                    <p className="text-sm text-gray-500">
                      {flurstueck.flaeche.toLocaleString()} m²
                    </p>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {flurstueck.gemarkung && (
                  <div>
                    <span className="text-gray-500">Gemarkung:</span>
                    <p className="font-medium text-gray-900">{flurstueck.gemarkung}</p>
                  </div>
                )}
                {flurstueck.flur && (
                  <div>
                    <span className="text-gray-500">Flur:</span>
                    <p className="font-medium text-gray-900">{flurstueck.flur}</p>
                  </div>
                )}
                {flurstueck.gemeinde && (
                  <div>
                    <span className="text-gray-500">Gemeinde:</span>
                    <p className="font-medium text-gray-900">{flurstueck.gemeinde}</p>
                  </div>
                )}
                {flurstueck.kreis && (
                  <div>
                    <span className="text-gray-500">Kreis:</span>
                    <p className="font-medium text-gray-900">{flurstueck.kreis}</p>
                  </div>
                )}
                {flurstueck.land && (
                  <div>
                    <span className="text-gray-500">Land:</span>
                    <p className="font-medium text-gray-900">{flurstueck.land}</p>
                  </div>
                )}
                {flurstueck.flstkennz && (
                  <div>
                    <span className="text-gray-500">Kennzeichen:</span>
                    <p className="font-medium text-gray-900 truncate" title={flurstueck.flstkennz}>
                      {flurstueck.flstkennz}
                    </p>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              {(flurstueck.lagebeztxt || flurstueck.tntext || flurstueck.bemerkungen) && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {flurstueck.lagebeztxt && (
                    <div className="text-sm">
                      <span className="text-gray-500">Lage: </span>
                      <span className="text-gray-700">{flurstueck.lagebeztxt}</span>
                    </div>
                  )}
                  {flurstueck.tntext && (
                    <div className="text-sm">
                      <span className="text-gray-500">Nutzung: </span>
                      <span className="text-gray-700">{flurstueck.tntext}</span>
                    </div>
                  )}
                  {flurstueck.bemerkungen && (
                    <div className="text-sm">
                      <span className="text-gray-500">Bemerkungen: </span>
                      <span className="text-gray-700">{flurstueck.bemerkungen}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(flurstueck.id)}
                  className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Bemerkungen bearbeiten"
                >
                  <QLucideIcon icon="Pencil" size={16} strokeWidth={2} />
                </button>
              )}
              <button
                onClick={() => onDelete(flurstueck.id)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Flurstück entfernen"
              >
                <QLucideIcon icon="Trash2" size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
