'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Landeigentuemer } from '@/types/landeigentuemer';
import { Input } from '@/components/ui/Input';
import QLucideIcon from '@/components/ui/LucideIcon';

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
    <div className="space-y-5">
      {/* Suchleiste */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <QLucideIcon icon="Search" size={18} strokeWidth={2} />
          </div>
          <Input
            type="text"
            placeholder="Suche nach Name, E-Mail oder Ort..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Liste */}
      {filteredLandeigentuemer.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <QLucideIcon icon="Users" size={24} strokeWidth={1.5} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">
            {searchQuery
              ? 'Keine Landeigentümer gefunden.'
              : 'Noch keine Landeigentümer vorhanden.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLandeigentuemer.map((le) => (
            <div
              key={le.id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    {le.vorname} {le.nachname}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {le.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <QLucideIcon icon="Mail" size={14} strokeWidth={2} />
                        <span className="truncate">{le.email}</span>
                      </div>
                    )}
                    {le.telefon && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <QLucideIcon icon="Phone" size={14} strokeWidth={2} />
                        <span>{le.telefon}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Adresse */}
                {(le.adresse || le.ort) && (
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <QLucideIcon icon="MapPin" size={14} strokeWidth={2} className="mt-0.5" />
                    <div className="flex-1 min-w-0">
                      {le.adresse && <p className="truncate">{le.adresse}</p>}
                      {le.ort && (
                        <p>
                          {le.plz} {le.ort}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Link href={`/user/landeigentuemer/${le.id}`} className="flex-1">
                    <button className="w-full px-3 py-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors inline-flex items-center justify-center gap-1.5">
                      <QLucideIcon icon="Eye" size={14} strokeWidth={2} />
                      Details
                    </button>
                  </Link>
                  <button
                    onClick={() => onEdit(le.id)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <QLucideIcon icon="Pencil" size={14} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => onDelete(le.id)}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <QLucideIcon icon="Trash2" size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
