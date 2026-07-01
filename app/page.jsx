'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  Copy,
  Edit3,
  Gauge,
  Hotel,
  Luggage,
  MapPin,
  MessageCircle,
  Plane,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';

const STORAGE_KEYS = {
  vehicles: 'ulmaxVehiclesV2',
  zones: 'ulmaxZonesV2',
  settings: 'ulmaxSettingsV2',
  adminSession: 'ulmaxAdminSessionV2',
};

const ADMIN_CREDENTIALS = {
  email: 'admin@ulmax.local',
  password: 'Ulmax2026!',
};

const defaultSettings = {
  company: 'ULMAX Rent Car',
  phone: '18293397266',
  callPhone: '18493486233',
  city: 'Punta Cana',
  tagline: 'Vehiculos confiables en Punta Cana con entrega en aeropuerto, hoteles, villas y soporte directo.',
};

const defaultZones = [
  'Punta Cana International Airport (PUJ)',
  'Bavaro',
  'Cap Cana',
  'Uvero Alto',
  'Macao',
  'Veron',
  'Santo Domingo Airport (SDQ)',
  'Hoteles Punta Cana',
  'Airbnb / Villas',
];

const defaultVehicles = [
  {
    id: 1,
    name: 'Kia Rio',
    category: 'Economy',
    passengers: 5,
    bags: 2,
    doors: 4,
    transmission: 'Automatico',
    fuel: 'Gasolina',
    price: 'Consultar',
    zone: 'Punta Cana / Bavaro',
    status: 'Disponible',
    image: '',
    highlight: 'Economico',
  },
  {
    id: 2,
    name: 'Kia Forte',
    category: 'Sedan',
    passengers: 5,
    bags: 3,
    doors: 4,
    transmission: 'Automatico',
    fuel: 'Gasolina',
    price: 'Consultar',
    zone: 'Aeropuerto / Hoteles',
    status: 'Disponible',
    image: '',
    highlight: 'Mas reservado',
  },
  {
    id: 3,
    name: 'Hyundai Tucson',
    category: 'SUV',
    passengers: 5,
    bags: 4,
    doors: 4,
    transmission: 'Automatico',
    fuel: 'Gasolina',
    price: 'Consultar',
    zone: 'Punta Cana / Cap Cana',
    status: 'Disponible',
    image: '',
    highlight: 'Comodo',
  },
  {
    id: 4,
    name: 'Ford Explorer',
    category: 'Family',
    passengers: 7,
    bags: 5,
    doors: 4,
    transmission: 'Automatico',
    fuel: 'Gasolina',
    price: 'Consultar',
    zone: 'Punta Cana / Santo Domingo',
    status: 'Disponible',
    image: '',
    highlight: 'Familiar',
  },
  {
    id: 5,
    name: 'Hyundai H1',
    category: 'Van',
    passengers: 12,
    bags: 10,
    doors: 4,
    transmission: 'Automatico',
    fuel: 'Diesel',
    price: 'Consultar',
    zone: 'Aeropuertos / Grupos',
    status: 'Disponible',
    image: '',
    highlight: 'Grupos',
  },
  {
    id: 6,
    name: 'Ford Mustang',
    category: 'Sport',
    passengers: 4,
    bags: 2,
    doors: 2,
    transmission: 'Automatico',
    fuel: 'Gasolina',
    price: 'Consultar',
    zone: 'Punta Cana',
    status: 'Disponible',
    image: '',
    highlight: 'Premium',
  },
];

const emptyVehicle = {
  name: '',
  category: 'Economy',
  passengers: 5,
  bags: 2,
  doors: 4,
  transmission: 'Automatico',
  fuel: 'Gasolina',
  price: 'Consultar',
  zone: 'Punta Cana',
  status: 'Disponible',
  image: '',
  highlight: '',
};

const emptyReservation = {
  vehicle: '',
  name: '',
  phone: '',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  days: '',
  flight: '',
  notes: '',
};

function safeJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function makeWhatsAppUrl(phone, text) {
  const normalized = String(phone || '').replace(/\D/g, '') || defaultSettings.phone;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}

function cleanPhone(phone, fallback = defaultSettings.phone) {
  return String(phone || fallback).replace(/\D/g, '');
}

export default function Page() {
  const [vehicles, setVehicles] = useState(defaultVehicles);
  const [zones, setZones] = useState(defaultZones);
  const [settings, setSettings] = useState(defaultSettings);
  const [filter, setFilter] = useState('Todos');
  const [reservation, setReservation] = useState(emptyReservation);
  const [vehicleDraft, setVehicleDraft] = useState(emptyVehicle);
  const [editingId, setEditingId] = useState(null);
  const [zoneDraft, setZoneDraft] = useState('');
  const [notice, setNotice] = useState('');
  const [adminAuth, setAdminAuth] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    setVehicles(safeJson(localStorage.getItem(STORAGE_KEYS.vehicles), defaultVehicles));
    setZones(safeJson(localStorage.getItem(STORAGE_KEYS.zones), defaultZones));
    setSettings(safeJson(localStorage.getItem(STORAGE_KEYS.settings), defaultSettings));
    const isAdminPath = window.location.pathname.startsWith('/admin');
    setShowAdminPanel(isAdminPath);
    setAdminAuth(isAdminPath || localStorage.getItem(STORAGE_KEYS.adminSession) === 'true');

    const selected = new URLSearchParams(window.location.search).get('vehiculo');
    if (selected) {
      setReservation((current) => ({ ...current, vehicle: selected }));
      if (window.location.hash === '#reservar') {
        setTimeout(() => {
          document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.vehicles, JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.zones, JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  }, [settings]);

  const categories = useMemo(() => ['Todos', ...new Set(vehicles.map((item) => item.category))], [vehicles]);
  const visibleVehicles = useMemo(
    () => vehicles.filter((item) => filter === 'Todos' || item.category === filter),
    [vehicles, filter],
  );
  const selectedVehicle = vehicles.find((item) => item.name === reservation.vehicle);

  const stats = [
    { label: 'Vehiculos', value: vehicles.length },
    { label: 'Categorias', value: categories.length - 1 },
    { label: 'Zonas', value: zones.length },
    { label: 'Reservas', value: 'WhatsApp' },
  ];

  function selectVehicle(vehicle) {
    setReservation((current) => ({ ...current, vehicle: vehicle.name }));
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('vehiculo', vehicle.name);
    nextUrl.hash = 'reservar';
    window.history.pushState(null, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function loginAdmin() {
    const email = loginForm.email.trim().toLowerCase();
    if (email !== ADMIN_CREDENTIALS.email || loginForm.password !== ADMIN_CREDENTIALS.password) {
      setLoginError('Cuenta admin incorrecta.');
      return;
    }
    localStorage.setItem(STORAGE_KEYS.adminSession, 'true');
    setAdminAuth(true);
    setLoginError('');
    setLoginForm({ email: '', password: '' });
  }

  function logoutAdmin() {
    localStorage.removeItem(STORAGE_KEYS.adminSession);
    setAdminAuth(false);
    window.location.href = '/';
  }

  function sendReservation() {
    const lines = [
      `Hola ${settings.company}, quiero reservar un vehiculo en Punta Cana.`,
      '',
      `Vehiculo: ${reservation.vehicle || 'No seleccionado'}`,
      `Nombre: ${reservation.name || 'Pendiente'}`,
      `WhatsApp: ${reservation.phone || 'Pendiente'}`,
      `Recogida: ${reservation.pickup || 'Pendiente'}`,
      `Entrega: ${reservation.dropoff || 'Pendiente'}`,
      `Fecha: ${reservation.date || 'Pendiente'}`,
      `Hora: ${reservation.time || 'Pendiente'}`,
      `Dias: ${reservation.days || 'Pendiente'}`,
      `Vuelo: ${reservation.flight || 'No indicado'}`,
      `Notas: ${reservation.notes || 'Sin notas'}`,
    ];
    window.open(makeWhatsAppUrl(settings.phone, lines.join('\n')), '_blank');
  }

  function saveVehicle() {
    if (!vehicleDraft.name.trim()) {
      setNotice('Agrega el nombre del vehiculo.');
      return;
    }

    const payload = {
      ...vehicleDraft,
      id: editingId || Date.now(),
      passengers: Number(vehicleDraft.passengers) || 1,
      bags: Number(vehicleDraft.bags) || 0,
      doors: Number(vehicleDraft.doors) || 2,
    };

    setVehicles((current) =>
      editingId ? current.map((item) => (item.id === editingId ? payload : item)) : [payload, ...current],
    );
    setVehicleDraft(emptyVehicle);
    setEditingId(null);
    setNotice(editingId ? 'Vehiculo actualizado.' : 'Vehiculo agregado.');
  }

  function uploadVehicleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setVehicleDraft((current) => ({ ...current, image: String(reader.result || '') }));
      setNotice('Foto cargada en el formulario.');
    };
    reader.readAsDataURL(file);
  }

  function editVehicle(vehicle) {
    setVehicleDraft(vehicle);
    setEditingId(vehicle.id);
    document.getElementById('panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function deleteVehicle(id) {
    setVehicles((current) => current.filter((item) => item.id !== id));
  }

  function addZone() {
    const value = zoneDraft.trim();
    if (!value || zones.includes(value)) return;
    setZones((current) => [...current, value]);
    setZoneDraft('');
  }

  function resetDemoData() {
    setVehicles(defaultVehicles);
    setZones(defaultZones);
    setSettings(defaultSettings);
    setVehicleDraft(emptyVehicle);
    setReservation(emptyReservation);
    setEditingId(null);
    setNotice('Datos restaurados.');
  }

  function copyInventory() {
    navigator.clipboard?.writeText(JSON.stringify({ vehicles, zones, settings }, null, 2));
    setNotice('Inventario copiado.');
  }

  return (
    <main>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#inicio" aria-label="ULMAX Rent Car">
            ULMAX<span>Rent Car</span>
          </a>
          <nav className="desktop-nav" aria-label="Principal">
            <a href="#vehiculos">Vehiculos</a>
            <a href="#reservar">Reservar</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a className="header-cta" href={`tel:+${cleanPhone(settings.callPhone, '18493486233')}`}>
            Llamar ahora
          </a>
        </div>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-bg" />
        <div className="wrap hero-content">
          <div className="hero-copy">
            <span className="eyebrow">
              <MapPin size={16} />
              Punta Cana, Bavaro, aeropuertos y hoteles
            </span>
            <h1>Renta un vehiculo sin complicarte.</h1>
            <p>
              Recibe tu carro en el aeropuerto, hotel, villa o Airbnb. Reserva por WhatsApp, confirma con una persona
              real y maneja Punta Cana con tranquilidad desde el primer dia.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#vehiculos">Ver vehiculos</a>
              <a className="secondary-btn" href={makeWhatsAppUrl(settings.phone, 'Hola ULMAX Rent Car, quiero rentar un vehiculo en Punta Cana. Fecha, zona y tipo de carro:')}>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="booking-card" aria-label="Reserva rapida">
            <div className="card-heading">
              <span>Reserva rapida</span>
              <b>Sin pagar ahora</b>
            </div>
            <label>Vehiculo</label>
            <select
              value={reservation.vehicle}
              onChange={(event) => setReservation({ ...reservation, vehicle: event.target.value })}
            >
              <option value="">Seleccionar vehiculo</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.name}>{vehicle.name}</option>
              ))}
            </select>
            <div className="two-cols">
              <div>
                <label>Recogida</label>
                <select
                  value={reservation.pickup}
                  onChange={(event) => setReservation({ ...reservation, pickup: event.target.value })}
                >
                  <option value="">Zona</option>
                  {zones.map((zone) => <option key={zone}>{zone}</option>)}
                </select>
              </div>
              <div>
                <label>Fecha</label>
                <input
                  type="date"
                  value={reservation.date}
                  onChange={(event) => setReservation({ ...reservation, date: event.target.value })}
                />
              </div>
            </div>
            <button className="primary-btn full" onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}>
              Continuar reserva
            </button>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="wrap trust-grid">
          {[
            ['Entrega flexible', 'Aeropuerto, hotel, villa o Airbnb', Plane],
            ['Seguro incluido', 'Vehiculos revisados antes de entregar', ShieldCheck],
            ['Confirmacion directa', 'Un asesor valida tu reserva por WhatsApp', MessageCircle],
            ['Soporte local', 'Asistencia antes y durante tu renta', Clock3],
          ].map(([title, text, Icon]) => (
            <article key={title} className="trust-item">
              <Icon size={22} />
              <div>
                <b>{title}</b>
                <span>{text}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="vehiculos" className="section">
        <div className="wrap section-head">
          <div>
            <span className="eyebrow dark">Catalogo</span>
            <h2>Vehiculos disponibles</h2>
            <p>Elige el vehiculo ideal para moverte por Punta Cana, Bavaro, Cap Cana, hoteles y aeropuertos.</p>
          </div>
          <div className="filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="wrap vehicle-grid">
          {visibleVehicles.map((vehicle) => (
            <article key={vehicle.id} className="vehicle-card">
              <div className="vehicle-media">
                {vehicle.image ? (
                  <img src={vehicle.image} alt={vehicle.name} />
                ) : (
                  <Car size={78} strokeWidth={1.4} />
                )}
                <span>{vehicle.highlight || vehicle.category}</span>
              </div>
              <div className="vehicle-body">
                <div className="vehicle-title">
                  <div>
                    <p>{vehicle.category}</p>
                    <h3>{vehicle.name}</h3>
                  </div>
                  <b>{vehicle.price}</b>
                </div>
                <div className="spec-grid">
                  <span><Users size={16} /> {vehicle.passengers} pasajeros</span>
                  <span><Luggage size={16} /> {vehicle.bags} maletas</span>
                  <span><Gauge size={16} /> {vehicle.transmission}</span>
                  <span><MapPin size={16} /> {vehicle.zone}</span>
                </div>
                <button className="reserve-btn" onClick={() => selectVehicle(vehicle)}>
                  Ir al sistema de reserva
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="reservar" className="section muted">
        <div className="wrap reservation-layout">
          <aside className="summary-card">
            <span className="eyebrow dark">Solicitud</span>
            <h2>Reserva por WhatsApp</h2>
            <p>Sin pagos forzados en la web. ULMAX confirma disponibilidad, precio final, entrega y documentos por WhatsApp.</p>
            <div className="selected-vehicle">
              <Car size={28} />
              <div>
                <span>Vehiculo seleccionado</span>
                <b>{selectedVehicle?.name || reservation.vehicle || 'Pendiente'}</b>
              </div>
            </div>
            <ul>
              <li><CheckCircle2 size={18} /> Confirmacion personalizada</li>
              <li><CheckCircle2 size={18} /> Entrega en zona coordinada</li>
              <li><CheckCircle2 size={18} /> Soporte local antes y durante la renta</li>
            </ul>
          </aside>

          <section className="form-card">
            <div className="form-title">
              <h2>Datos de la reserva</h2>
              <span>Campos rapidos</span>
            </div>
            <label>Vehiculo</label>
            <select
              value={reservation.vehicle}
              onChange={(event) => setReservation({ ...reservation, vehicle: event.target.value })}
            >
              <option value="">Seleccionar vehiculo</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.name}>{vehicle.name}</option>
              ))}
            </select>
            <div className="two-cols">
              <div>
                <label>Nombre</label>
                <input value={reservation.name} onChange={(event) => setReservation({ ...reservation, name: event.target.value })} />
              </div>
              <div>
                <label>WhatsApp</label>
                <input value={reservation.phone} onChange={(event) => setReservation({ ...reservation, phone: event.target.value })} />
              </div>
            </div>
            <div className="two-cols">
              <div>
                <label>Recogida</label>
                <select value={reservation.pickup} onChange={(event) => setReservation({ ...reservation, pickup: event.target.value })}>
                  <option value="">Seleccionar zona</option>
                  {zones.map((zone) => <option key={zone}>{zone}</option>)}
                </select>
              </div>
              <div>
                <label>Entrega</label>
                <select value={reservation.dropoff} onChange={(event) => setReservation({ ...reservation, dropoff: event.target.value })}>
                  <option value="">Seleccionar zona</option>
                  {zones.map((zone) => <option key={zone}>{zone}</option>)}
                </select>
              </div>
            </div>
            <div className="three-cols">
              <div>
                <label>Fecha</label>
                <input type="date" value={reservation.date} onChange={(event) => setReservation({ ...reservation, date: event.target.value })} />
              </div>
              <div>
                <label>Hora</label>
                <input type="time" value={reservation.time} onChange={(event) => setReservation({ ...reservation, time: event.target.value })} />
              </div>
              <div>
                <label>Dias</label>
                <input value={reservation.days} onChange={(event) => setReservation({ ...reservation, days: event.target.value })} />
              </div>
            </div>
            <div className="two-cols">
              <div>
                <label>Vuelo opcional</label>
                <input value={reservation.flight} onChange={(event) => setReservation({ ...reservation, flight: event.target.value })} />
              </div>
              <div>
                <label>Notas</label>
                <input value={reservation.notes} onChange={(event) => setReservation({ ...reservation, notes: event.target.value })} />
              </div>
            </div>
            <button className="primary-btn full" onClick={sendReservation}>
              Enviar solicitud por WhatsApp
            </button>
          </section>
        </div>
      </section>

      <section className="section process">
        <div className="wrap">
          <span className="eyebrow dark">Proceso</span>
          <h2>Simple para el cliente y facil para ULMAX.</h2>
          <div className="steps">
            {[
              ['Elige vehiculo', 'El usuario compara capacidad, categoria y zona.'],
              ['Completa solicitud', 'Fecha, hora, recogida, entrega y contacto.'],
              ['ULMAX confirma', 'El equipo valida disponibilidad y precio final.'],
            ].map(([title, text], index) => (
              <article key={title} className="step-card">
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showAdminPanel ? (
      <section id="panel" className="section admin-section">
        {!adminAuth ? (
          <div className="wrap admin-login">
            <div className="login-card">
              <span className="eyebrow dark">Acceso interno</span>
              <h2>Panel privado ULMAX</h2>
              <p>Solo el administrador puede cambiar vehiculos, zonas, contacto y fotos.</p>
              <label>Email admin</label>
              <input
                value={loginForm.email}
                onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                placeholder="admin@ulmax.local"
              />
              <label>Clave</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') loginAdmin();
                }}
              />
              {loginError ? <p className="notice danger-notice">{loginError}</p> : null}
              <button className="primary-btn full" onClick={loginAdmin}>Entrar al panel</button>
            </div>
          </div>
        ) : (
        <div className="wrap admin-layout">
          <aside className="admin-sidebar">
            <span className="eyebrow dark">Panel</span>
            <h2>Administrar inventario</h2>
            <p>Este panel guarda datos en este navegador. Es ideal para operar la web simple del cliente.</p>
            <div className="admin-stats">
              {stats.map((item) => (
                <div key={item.label}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <button className="secondary-admin" onClick={logoutAdmin}>Cerrar panel</button>
            <button className="secondary-admin" onClick={copyInventory}><Copy size={16} /> Copiar inventario</button>
            <button className="secondary-admin danger-text" onClick={resetDemoData}><RefreshCcw size={16} /> Restaurar demo</button>
            {notice ? <p className="notice">{notice}</p> : null}
          </aside>

          <div className="admin-main">
            <section className="admin-card">
              <div className="form-title">
                <h3>{editingId ? 'Editar vehiculo' : 'Nuevo vehiculo'}</h3>
                {editingId ? (
                  <button className="small-link" onClick={() => { setEditingId(null); setVehicleDraft(emptyVehicle); }}>
                    Cancelar
                  </button>
                ) : null}
              </div>
              <div className="two-cols">
                <div>
                  <label>Nombre</label>
                  <input value={vehicleDraft.name} onChange={(event) => setVehicleDraft({ ...vehicleDraft, name: event.target.value })} />
                </div>
                <div>
                  <label>Categoria</label>
                  <input value={vehicleDraft.category} onChange={(event) => setVehicleDraft({ ...vehicleDraft, category: event.target.value })} />
                </div>
              </div>
              <div className="three-cols">
                <div>
                  <label>Pasajeros</label>
                  <input type="number" value={vehicleDraft.passengers} onChange={(event) => setVehicleDraft({ ...vehicleDraft, passengers: event.target.value })} />
                </div>
                <div>
                  <label>Maletas</label>
                  <input type="number" value={vehicleDraft.bags} onChange={(event) => setVehicleDraft({ ...vehicleDraft, bags: event.target.value })} />
                </div>
                <div>
                  <label>Puertas</label>
                  <input type="number" value={vehicleDraft.doors} onChange={(event) => setVehicleDraft({ ...vehicleDraft, doors: event.target.value })} />
                </div>
              </div>
              <div className="two-cols">
                <div>
                  <label>Precio</label>
                  <input value={vehicleDraft.price} onChange={(event) => setVehicleDraft({ ...vehicleDraft, price: event.target.value })} />
                </div>
                <div>
                  <label>Zona</label>
                  <input value={vehicleDraft.zone} onChange={(event) => setVehicleDraft({ ...vehicleDraft, zone: event.target.value })} />
                </div>
              </div>
              <div className="two-cols">
                <div>
                  <label>Imagen URL o foto subida</label>
                  <input value={vehicleDraft.image} onChange={(event) => setVehicleDraft({ ...vehicleDraft, image: event.target.value })} />
                </div>
                <div>
                  <label>Etiqueta</label>
                  <input value={vehicleDraft.highlight} onChange={(event) => setVehicleDraft({ ...vehicleDraft, highlight: event.target.value })} />
                </div>
              </div>
              <div className="upload-row">
                <div>
                  <label>Subir foto del vehiculo</label>
                  <input type="file" accept="image/*" onChange={uploadVehicleImage} />
                </div>
                {vehicleDraft.image ? (
                  <div className="image-preview">
                    <img src={vehicleDraft.image} alt="Vista previa del vehiculo" />
                    <button onClick={() => setVehicleDraft({ ...vehicleDraft, image: '' })}>Quitar foto</button>
                  </div>
                ) : null}
              </div>
              <button className="primary-btn" onClick={saveVehicle}>
                <Plus size={18} /> {editingId ? 'Actualizar vehiculo' : 'Agregar vehiculo'}
              </button>
            </section>

            <section className="admin-card">
              <div className="form-title">
                <h3>Zonas y contacto</h3>
                <span>{zones.length} zonas</span>
              </div>
              <div className="two-cols">
                <div>
                  <label>Nombre comercial</label>
                  <input value={settings.company} onChange={(event) => setSettings({ ...settings, company: event.target.value })} />
                </div>
                <div>
                  <label>WhatsApp principal</label>
                  <input value={settings.phone} onChange={(event) => setSettings({ ...settings, phone: event.target.value })} />
                </div>
              </div>
              <div className="two-cols">
                <div>
                  <label>Telefono de llamadas</label>
                  <input value={settings.callPhone || ''} onChange={(event) => setSettings({ ...settings, callPhone: event.target.value })} />
                </div>
                <div>
                  <label>Texto corto</label>
                  <input value={settings.tagline} onChange={(event) => setSettings({ ...settings, tagline: event.target.value })} />
                </div>
              </div>
              <div className="zone-row">
                <input placeholder="Nueva zona" value={zoneDraft} onChange={(event) => setZoneDraft(event.target.value)} />
                <button className="primary-btn compact" onClick={addZone}>Agregar</button>
              </div>
              <div className="chips">
                {zones.map((zone) => (
                  <span key={zone}>
                    {zone}
                    <button onClick={() => setZones((current) => current.filter((item) => item !== zone))}>x</button>
                  </span>
                ))}
              </div>
            </section>

            <section className="admin-card">
              <div className="form-title">
                <h3>Vehiculos actuales</h3>
                <span>{vehicles.length} registros</span>
              </div>
              <div className="inventory-list">
                {vehicles.map((vehicle) => (
                  <article key={vehicle.id}>
                    <div>
                      <b>{vehicle.name}</b>
                      <span>{vehicle.category} - {vehicle.passengers} pasajeros - {vehicle.zone}</span>
                    </div>
                    <div>
                      <button onClick={() => editVehicle(vehicle)}><Edit3 size={16} /> Editar</button>
                      <button className="danger-btn" onClick={() => deleteVehicle(vehicle.id)}><Trash2 size={16} /> Borrar</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
        )}
      </section>
      ) : null}

      <footer id="contacto" className="footer">
        <div className="wrap footer-inner">
          <div>
            <b>{settings.company}</b>
            <p>{settings.tagline}</p>
          </div>
          <a className="footer-whatsapp" href={makeWhatsAppUrl(settings.phone, 'Hola ULMAX, necesito informacion.')}>
            <MessageCircle size={18} /> WhatsApp 24/7
          </a>
        </div>
      </footer>

      <a className="admin-door" href="/admin" aria-label="Admin">Admin</a>

      <a className="floating-whatsapp" href={makeWhatsAppUrl(settings.phone, 'Hola ULMAX Rent Car, quiero rentar un vehiculo en Punta Cana. Fecha, zona y tipo de carro:')}>
        <MessageCircle size={18} /> WhatsApp
      </a>
    </main>
  );
}
