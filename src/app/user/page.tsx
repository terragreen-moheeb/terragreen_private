"use client";
import React, { useState } from 'react';
import { useGlobal } from '@/lib/context/GlobalContext';
import { SpecializedMap } from '@/components/maps/SpecializedMapFactory';
import { MAP_CONFIGURATIONS } from '@/config/map_configuration';

type MapType = keyof typeof MAP_CONFIGURATIONS;

export default function DashboardContent() {
    const { user } = useGlobal();
    const [selectedLayers, setSelectedLayers] = useState<MapType[]>(['flood']);

    const toggleLayer = (key: MapType) => {
        setSelectedLayers(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    };

    return (
        <div className="h-screen flex">
            {/* Sidebar mit Layer-Liste */}
            <div className="w-52 p-4 border-r bg-gray-50 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Echtzeitanalyse</h2>
                <ul className="space-y-3">
                    {Object.entries(MAP_CONFIGURATIONS).map(([key, config]) => (
                        <li key={key}>
                            <label className="flex items-center gap-3 rounded hover:bg-gray-100 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedLayers.includes(key as MapType)}
                                    onChange={() => toggleLayer(key as MapType)}
                                    className="w-4 h-4 rounded"
                                />
                                {/* Farbbox nur für Layer mit einzelner Farbe (ohne Legende) */}
                                {config.color && !config.legend && (
                                    <span
                                        className="w-4 h-4 rounded"
                                        style={{ backgroundColor: config.color }}
                                    />
                                )}
                                <span className="text-sm">{config.name}</span>
                            </label>

                            {/* Legende - nur wenn Layer ausgewählt und Legende vorhanden */}
                            {config.legend && selectedLayers.includes(key as MapType) && (
                                <div className="ml-7 mt-2 space-y-1">
                                    {config.legend.map(item => (
                                        <div key={item.label} className="flex items-center gap-2">
                                            <span
                                                className="w-3 h-3 rounded border border-black"
                                                style={{ backgroundColor: item.color, opacity: 0.7 }}
                                            />
                                            <span className="text-xs text-gray-600">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Map */}
            <div className="flex-1">
                <SpecializedMap
                    mapType="flood"
                    activeLayers={selectedLayers}
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}