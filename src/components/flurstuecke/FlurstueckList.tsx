'use client';

import { Flurstueck } from '@/types/landeigentuemer';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

interface FlurstueckListProps {
  flurstuecke: Flurstueck[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const FlurstueckList = ({
  flurstuecke,
  onEdit,
  onDelete,
}: FlurstueckListProps) => {
  if (flurstuecke.length === 0) {
    return (
      <Card>
        <CardBody>
          <p className="text-center text-gray-500 py-8">
            Noch keine Flurstücke vorhanden.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {flurstuecke.map((flurstueck) => (
        <Card key={flurstueck.id} className="hover:shadow-md transition-shadow">
          <CardBody>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Flurstück Nr. {flurstueck.flurstueck_nummer}
                  </h4>
                  {flurstueck.gemarkung && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      {flurstueck.gemarkung}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {flurstueck.flaeche_qm && (
                    <div>
                      <span className="text-gray-500">Fläche:</span>{' '}
                      <span className="font-medium">
                        {flurstueck.flaeche_qm.toLocaleString('de-DE')} m²
                      </span>
                    </div>
                  )}
                  {flurstueck.nutzungsart && (
                    <div>
                      <span className="text-gray-500">Nutzungsart:</span>{' '}
                      <span className="font-medium">{flurstueck.nutzungsart}</span>
                    </div>
                  )}
                </div>

                {flurstueck.bemerkungen && (
                  <p className="text-sm text-gray-600 mt-2">
                    {flurstueck.bemerkungen}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(flurstueck.id)}
                >
                  Bearbeiten
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(flurstueck.id)}
                >
                  Löschen
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
