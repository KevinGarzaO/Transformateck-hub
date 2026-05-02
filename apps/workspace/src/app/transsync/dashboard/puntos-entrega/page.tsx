'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { Download, Plus, Search, Filter, Eye, Edit, MoreHorizontal, MapPin, Phone, User, Clock, Info } from 'lucide-react';
import { MOCK } from '@/utils/data';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { GoogleMap, useJsApiLoader, Autocomplete, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB5aG1ur9_hOUAGmNwo9_TxUtpeFXMsiZM';
const libraries: ("places" | "geometry")[] = ["places", "geometry"];

function StatusPill({ s }: { s: string }) {
  const isInactive = s.toLowerCase() === 'inactivo';
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${isInactive ? 'text-red-600 bg-red-50' : 'text-[#2C8B6E] bg-[#E6F4EE]'}`}>
      {s}
    </span>
  );
}

interface PointFormData {
  id?: string;
  nombre: string;
  direccion: string;
  gps: string;
  contacto: string;
  tel: string;
  client_id: string;
  reception_days: number[];
  reception_from: string;
  reception_to: string;
  service_time_min: number;
  acceso: string;
  status: string;
}

function PointEditor({ initialData, onClose, onSave }: { initialData?: any, onClose: () => void, onSave: (p: any) => void }) {
  const isEdit = !!initialData?.id;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [formData, setFormData] = useState<PointFormData>(initialData || {
    nombre: '', direccion: '', gps: '', contacto: '', tel: '', 
    client_id: '', reception_days: [1,2,3,4,5], reception_from: '08:00', reception_to: '18:00', 
    service_time_min: 30, acceso: '', status: 'active'
  });

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [zoom, setZoom] = useState(15);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: type === 'number' ? parseInt(value) : value });
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const addr = place.formatted_address || place.name || '';
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const coords = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        
        setFormData(prev => ({
          ...prev,
          direccion: addr,
          gps: coords
        }));
        setZoom(18);
      }
    }
  };

  const toggleDay = (day: number) => {
    const days = formData.reception_days.includes(day)
      ? formData.reception_days.filter((d: number) => d !== day)
      : [...formData.reception_days, day].sort();
    setFormData({ ...formData, reception_days: days });
  };

  const daysLabels = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];
  const [lat, lng] = formData.gps ? formData.gps.split(',').map((c:string) => parseFloat(c.trim())) : [19.4326, -99.1332];

  return (
    <div className="val-shell">
      <div className="val-progress-row">
        <div className="val-progress-title">{isEdit ? 'Editar Punto de Entrega' : 'Crear Nuevo Punto'}</div>
        <div className="val-progress-count">Paso 1 de 1</div>
      </div>
      <div className="val-grid">
        <div className="val-form">
          <div className="val-step-card">
            <div className="val-step-title">1. Información del Punto de Entrega</div>
            
            <div className="val-q">
              <div className="val-field">
                <label className="val-field-label">Cliente Asociado*</label>
                <select name="client_id" value={formData.client_id} onChange={handleChange} className="val-select">
                  <option value="">Seleccionar cliente...</option>
                  {MOCK.CLIENTES.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
            </div>

            <div className="val-q mt-6">
              <div className="val-field">
                <label className="val-field-label">Nombre del Punto*</label>
                <input name="nombre" value={formData.nombre} onChange={handleChange} className="val-select" placeholder="Ej. Centro de Distribución Norte" />
              </div>
            </div>

            <div className="val-q mt-6">
              <div className="val-field">
                <label className="val-field-label">Dirección Completa (Google Maps)*</label>
                {isLoaded ? (
                  <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged} options={{ componentRestrictions: { country: 'mx' } }}>
                    <div className="relative group">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" />
                      <input name="direccion" value={formData.direccion} onChange={handleChange} className="val-select pl-10" placeholder="Busca una ubicación en México..." />
                    </div>
                  </Autocomplete>
                ) : (
                  <input className="val-select opacity-50" placeholder="Cargando buscador..." disabled />
                )}
              </div>
            </div>

            <div className="val-q mt-6 flex gap-4">
              <div className="val-field flex-1">
                <label className="val-field-label">Coordenadas GPS*</label>
                <input name="gps" value={formData.gps} onChange={handleChange} className="val-select font-mono text-[11px]" placeholder="Se llenará automáticamente..." />
              </div>
              <div className="val-field flex-1">
                <label className="val-field-label">Tiempo de Servicio (min)*</label>
                <input type="number" name="service_time_min" value={formData.service_time_min} onChange={handleChange} className="val-select" />
              </div>
            </div>

            <div className="val-q mt-6">
              <label className="text-[11px] font-bold text-ink-500 uppercase tracking-wide mb-3 block">Días de Recepción*</label>
              <div className="flex gap-2">
                {[1,2,3,4,5,6,7].map(d => (
                  <button key={d} type="button" onClick={() => toggleDay(d)} className={`w-10 h-10 rounded-xl font-bold text-xs transition-all border ${formData.reception_days.includes(d) ? 'bg-primary border-primary text-white' : 'bg-white border-ink-200 text-ink-400'}`}>
                    {daysLabels[d-1]}
                  </button>
                ))}
              </div>
            </div>

            <div className="val-q mt-6 flex gap-4">
              <div className="val-field flex-1">
                <label className="val-field-label">Desde*</label>
                <input type="time" name="reception_from" value={formData.reception_from} onChange={handleChange} className="val-select" />
              </div>
              <div className="val-field flex-1">
                <label className="val-field-label">Hasta*</label>
                <input type="time" name="reception_to" value={formData.reception_to} onChange={handleChange} className="val-select" />
              </div>
            </div>

            <div className="val-q mt-6 flex gap-4">
              <div className="val-field flex-1">
                <label className="val-field-label">Contacto*</label>
                <input name="contacto" value={formData.contacto} onChange={handleChange} className="val-select" />
              </div>
              <div className="val-field flex-1">
                <label className="val-field-label">Teléfono*</label>
                <input name="tel" value={formData.tel} onChange={handleChange} className="val-select" />
              </div>
            </div>

            <div className="val-q mt-6">
              <div className="val-field">
                <label className="val-field-label">Acceso</label>
                <textarea name="acceso" value={formData.acceso} onChange={handleChange} className="val-select min-h-[80px]" />
              </div>
            </div>

            <div className="val-actions mt-8">
              <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
              <button className="btn btn-solid" onClick={() => onSave(formData)}>Guardar</button>
            </div>
          </div>
        </div>

        <div className="val-doc val-doc-sticky">
           <div className="val-doc-viewer" style={{ minHeight: '500px', background: '#f0f4f7' }}>
             {isLoaded ? (
               <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={!isNaN(lat) && !isNaN(lng) ? { lat, lng } : { lat: 19.4326, lng: -99.1332 }} zoom={zoom} options={{ disableDefaultUI: true, zoomControl: true }}>
                 {!isNaN(lat) && !isNaN(lng) && <Marker position={{ lat, lng }} />}
               </GoogleMap>
             ) : <div className="p-10 text-center">Cargando mapa...</div>}
           </div>
        </div>
      </div>
    </div>
  );
}

function PointDetail({ point, isCreate = false, onClose, onSave }: { point?: any, isCreate?: boolean, onClose: () => void, onSave?: (p: any) => void }) {
  const pData = point || { nombre: 'Nuevo Punto', direccion: '', gps: '', contacto: '', reception_from: '08:00', reception_to: '18:00', reception_days: [1,2,3,4,5], service_time_min: 30 };
  const isEdit = isCreate || (point && onSave !== undefined);
  const client = MOCK.CLIENTES.find(c => c.id === pData.client_id);
  const daysLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: GOOGLE_MAPS_API_KEY, libraries });
  const [lat, lng] = pData.gps ? pData.gps.split(',').map((c:string) => parseFloat(c.trim())) : [NaN, NaN];

  return (
    <div className="detail-shell">
      <div className="detail-map">
        <div className="detail-back" onClick={onClose}><span>‹</span></div>
      </div>
      <div className="detail-header">
        <div className="detail-avatar flex items-center justify-center bg-primary text-white rounded-full"><MapPin size={32} /></div>
        <div className="detail-meta ml-4">
          <h1 className="text-2xl font-black">{pData.nombre}</h1>
          <div className="flex gap-2 mt-2"><StatusPill s={pData.status === 'inactive' ? 'Inactivo' : 'Activo'} /><span className="text-xs font-bold text-ink-400">{client?.nombre || 'Sin cliente'}</span></div>
        </div>
      </div>

      {isEdit ? <PointEditor initialData={point} onClose={onClose} onSave={onSave!} /> : (
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Detalles</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-ink-400">Dirección:</span><span className="font-medium">{pData.direccion}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Ventana:</span><span className="font-bold">{pData.reception_from} - {pData.reception_to}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Servicio:</span><span className="font-bold">{pData.service_time_min} min</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Contacto:</span><span className="font-medium">{pData.contacto} ({pData.tel})</span></div>
            </div>
          </div>
          <div className="card p-0 overflow-hidden h-[300px]">
            {isLoaded ? (
              <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={!isNaN(lat) && !isNaN(lng) ? { lat, lng } : { lat: 19.4326, lng: -99.1332 }} zoom={15} options={{ disableDefaultUI: true }}>
                {!isNaN(lat) && !isNaN(lng) && <Marker position={{ lat, lng }} />}
              </GoogleMap>
            ) : <div className="p-10">Mapa...</div>}
          </div>
        </div>
      )}
    </div>
  );
}

const PuntosEntregaContent = dynamic(() => Promise.resolve(PuntosEntregaContentInternal), {
  ssr: false,
  loading: () => <div className="p-12 text-center text-ink-400 font-bold uppercase text-xs tracking-widest animate-pulse">Cargando Puntos de Entrega...</div>
});

export default function PuntosEntrega() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-ink-500 font-black uppercase text-xs">Iniciando...</div>}>
      <PuntosEntregaContent />
    </Suspense>
  );
}

function PuntosEntregaContentInternal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idParam = searchParams.get('id');
  const actionParam = searchParams.get('action');

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);

  React.useEffect(() => {
    setData([...MOCK.PUNTOS_ENTREGA]);
  }, []);

  const selected = useMemo(() => idParam ? data.find((p: any) => p.id === idParam) : null, [idParam, data]);

  const filtered = useMemo(() => {
    return data.filter((p: any) => !q || p.nombre.toLowerCase().includes(q.toLowerCase()) || p.direccion.toLowerCase().includes(q.toLowerCase()));
  }, [q, data]);

  const perPage = 8;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSave = (p: any) => {
    let newId = p.id;
    if (p.id) {
      setData(data.map(item => item.id === p.id ? p : item));
    } else {
      newId = `P-${Math.floor(100 + Math.random() * 900)}`;
      setData([...data, { ...p, id: newId }]);
    }
    router.push(`?id=${newId}&action=view`);
  };

  const handleClose = () => router.push('/transsync/dashboard/puntos-entrega');

  if (actionParam === 'create') return <PointDetail isCreate={true} onClose={handleClose} onSave={handleSave} />;
  if (selected) {
    if (actionParam === 'edit') return <PointDetail point={selected} onClose={handleClose} onSave={handleSave} />;
    return <PointDetail point={selected} onClose={handleClose} />;
  }

  return (
    <>
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div><h1 className="text-[28px] font-extrabold text-[#0E2A3A] tracking-tight leading-none mb-2">Puntos de Entrega</h1><p className="text-sm text-[#5C7480] font-medium">{data.length} ubicaciones registradas</p></div>
        <div className="flex gap-3"><button className="btn btn-ghost"><Download size={14}/>Exportar</button><button className="btn btn-solid" onClick={() => router.push('?action=create')}><Plus size={14}/>Nuevo punto</button></div>
      </div>
      <div className="card p-0 overflow-hidden">
        <div className="p-5 border-b border-ink-100 flex items-center gap-4 bg-white">
          <div className="flex-1 max-w-sm bg-ink-50 rounded-xl px-4 py-2 flex items-center gap-3 border border-transparent focus-within:border-ink-200 focus-within:bg-white transition-all"><Search size={14} className="text-ink-400"/><input placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm font-medium w-full" value={q} onChange={e => { setQ(e.target.value); setPage(1); }} /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ink-50/50 border-b border-ink-100 text-[11px] font-bold text-ink-400 uppercase tracking-widest"><th className="px-4 py-3">Punto de Entrega</th><th className="px-4 py-3">Cliente</th><th className="px-4 py-3">Ventana</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3 text-right">Acciones</th></tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {slice.map((p: any) => (
                <tr key={p.id} onClick={() => router.push(`?id=${p.id}&action=view`)} className="hover:bg-ink-50/50 cursor-pointer group transition-colors">
                  <td className="px-4 py-4"><div className="font-bold text-[13px]">{p.nombre}</div><div className="text-[11px] text-ink-400 truncate max-w-[250px]">{p.direccion}</div></td>
                  <td className="px-4 py-4 text-[13px]">{MOCK.CLIENTES.find(c => c.id === p.client_id)?.nombre || 'N/A'}</td>
                  <td className="px-4 py-4 text-[13px]">{p.reception_from} - {p.reception_to}</td>
                  <td className="px-4 py-4"><StatusPill s={p.status === 'active' ? 'Activo' : 'Inactivo'}/></td>
                  <td className="px-4 py-4 text-right"><button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); router.push(`?id=${p.id}&action=view`); }}><Eye size={14}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 border-t border-ink-100 flex items-center justify-between bg-ink-50/30">
          <div className="text-xs font-bold text-ink-400 uppercase tracking-widest">Página {page} de {pages}</div>
          <div className="flex gap-2"><button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button><button className="btn btn-ghost btn-sm" disabled={page === pages} onClick={() => setPage(p => p + 1)}>›</button></div>
        </div>
      </div>
    </>
  );
}
