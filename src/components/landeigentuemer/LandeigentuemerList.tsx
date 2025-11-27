'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Landeigentuemer } from '@/types/landeigentuemer';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';

interface LandeigentuemerListProps {
  landeigentuemer: Landeigentuemer[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LandeigentuemerList = ({
  landeigentuemer,
  onEdit,
  onDelete,
}: LandeigentuemerListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLandeigentuemer = landeigentuemer.filter((le) => {
    const query = searchQuery.toLowerCase();
    return (
      le.vorname.toLowerCase().includes(query) ||
      le.nachname.toLowerCase().includes(query) ||
      le.email?.toLowerCase().includes(query) ||
      le.ort?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      {/* Suchleiste */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Suche nach Name, E-Mail oder Ort..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Liste */}
      {filteredLandeigentuemer.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-center text-gray-500 py-8">
              {searchQuery
                ? 'Keine Landeigentümer gefunden.'
                : 'Noch keine Landeigentümer vorhanden.'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLandeigentuemer.map((le) => (
            <Card key={le.id} className="hover:shadow-lg transition-shadow">
              <CardBody className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {le.vorname} {le.nachname}
                  </h3>
                  {le.email && (
                    <p className="text-sm text-gray-600">{le.email}</p>
                  )}
                  {le.telefon && (
                    <p className="text-sm text-gray-600">{le.telefon}</p>
                  )}
                </div>

                {(le.adresse || le.ort) && (
                  <div className="text-sm text-gray-600">
                    {le.adresse && <p>{le.adresse}</p>}
                    {le.ort && (
                      <p>
                        {le.plz} {le.ort}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Link href={`/landeigentuemer/${le.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      Details
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(le.id)}
                  >
                    Bearbeiten
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(le.id)}
                  >
                    Löschen
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
