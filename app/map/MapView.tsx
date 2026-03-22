'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { getCountryFlag } from '@/app/lib/travel';
import type { ServiceCategory } from '@/app/lib/travel';
import type { Lang } from '@/app/lib/i18n';

interface DestService {
  code: string;
  label: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  services: { category: ServiceCategory; count: number; minPrice: number }[];
  totalServices: number;
}

interface MapViewProps {
  destinations: DestService[];
  selectedDest: string | null;
  onSelect: (code: string | null) => void;
  lang: Lang;
  t: (key: string) => string;
}

const catColors: Record<string, string> = {
  hotel: '#10b981',
  tour: '#3b82f6',
  ticket: '#8b5cf6',
  transfer: '#f59e0b',
  flight: '#0ea5e9',
  car: '#ef4444',
  esim: '#6366f1',
  insurance: '#ec4899',
  transport: '#14b8a6',
};

function createIcon(country: string, isSelected: boolean) {
  const size = isSelected ? 40 : 30;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${isSelected ? '#10b981' : '#fff'};border:3px solid ${isSelected ? '#059669' : '#cbd5e1'};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.18);transition:all .2s;cursor:pointer;"><img src="${getCountryFlag('', 'w20').replace('/w20/.png', `/w20/${country.toLowerCase()}.png`)}" width="${isSelected ? 22 : 16}" height="${isSelected ? 16 : 12}" style="border-radius:2px;" /></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function FlyToSelected({ destinations, selectedDest }: { destinations: DestService[]; selectedDest: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedDest) {
      const dest = destinations.find(d => d.code === selectedDest);
      if (dest) map.flyTo([dest.lat, dest.lng], 6, { duration: 1 });
    }
  }, [selectedDest, destinations, map]);
  return null;
}

export default function MapView({ destinations, selectedDest, onSelect, lang, t }: MapViewProps) {
  return (
    <MapContainer
      center={[42, 30]}
      zoom={3}
      minZoom={2}
      maxZoom={18}
      scrollWheelZoom
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToSelected destinations={destinations} selectedDest={selectedDest} />
      {destinations.map(dest => (
        <Marker
          key={dest.code}
          position={[dest.lat, dest.lng]}
          icon={createIcon(dest.country, selectedDest === dest.code)}
          eventHandlers={{ click: () => onSelect(dest.code) }}
        >
          <Popup maxWidth={280} minWidth={240}>
            <div style={{ fontFamily: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <img src={getCountryFlag(dest.code, 'w40')} alt="" width={24} height={18} style={{ borderRadius: '3px' }} />
                <strong style={{ fontSize: '16px', color: '#1e293b' }}>{t(`city.${dest.code}`)}</strong>
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: '999px' }}>
                  {dest.totalServices} {t('mp.services')}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                {dest.services.map(s => (
                  <span key={s.category} style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    background: catColors[s.category] || '#64748b',
                    color: '#fff',
                    fontWeight: 600,
                  }}>
                    {t(`cat.${s.category}`)} · €{s.minPrice}+
                  </span>
                ))}
              </div>
              <Link
                href={`/explore?to=${dest.code}`}
                style={{ display: 'block', textAlign: 'center', background: '#10b981', color: '#fff', padding: '8px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '13px' }}
              >
                {t('mp.viewAll')} →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
