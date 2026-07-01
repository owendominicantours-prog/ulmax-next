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
  language: 'ulmaxLanguageV2',
};

const ADMIN_CREDENTIALS = {
  email: 'admin@ulmax.local',
  password: 'Ulmax2026!',
};

const CURRENT_WHATSAPP = '18493848233';
const CURRENT_CALL_PHONE = '18493486233';
const OLD_WHATSAPP_NUMBERS = new Set(['18293397266', '18293937266']);

const UI_TEXT = {
  es: {
    navVehicles: 'Vehiculos',
    navBook: 'Reservar',
    navContact: 'Contacto',
    callNow: 'Llamar ahora',
    heroEyebrow: 'Punta Cana, Bavaro, aeropuertos y hoteles',
    heroTitle: 'Renta un vehiculo sin complicarte.',
    heroText:
      'Recibe tu carro en el aeropuerto, hotel, villa o Airbnb. Reserva por WhatsApp, confirma con una persona real y maneja Punta Cana con tranquilidad desde el primer dia.',
    viewVehicles: 'Ver vehiculos',
    quickAria: 'Reserva rapida',
    quickTitle: 'Reserva rapida',
    noPay: 'Sin pagar ahora',
    vehicle: 'Vehiculo',
    selectVehicle: 'Seleccionar vehiculo',
    pickup: 'Recogida',
    zone: 'Zona',
    date: 'Fecha',
    continueBooking: 'Continuar reserva',
    trust: [
      ['Entrega flexible', 'Aeropuerto, hotel, villa o Airbnb', Plane],
      ['Seguro incluido', 'Vehiculos revisados antes de entregar', ShieldCheck],
      ['Confirmacion directa', 'Un asesor valida tu reserva por WhatsApp', MessageCircle],
      ['Soporte local', 'Asistencia antes y durante tu renta', Clock3],
    ],
    catalog: 'Catalogo',
    vehiclesAvailable: 'Vehiculos disponibles',
    catalogText: 'Elige el vehiculo ideal para moverte por Punta Cana, Bavaro, Cap Cana, hoteles y aeropuertos.',
    all: 'Todos',
    passengers: 'pasajeros',
    bags: 'maletas',
    reserve: 'Reservar',
    request: 'Solicitud',
    bookWhatsApp: 'Reserva por WhatsApp',
    requestText:
      'Sin pagos forzados en la web. ULMAX confirma disponibilidad, precio final, entrega y documentos por WhatsApp.',
    selectedVehicle: 'Vehiculo seleccionado',
    pending: 'Pendiente',
    summary: [
      'Confirmacion personalizada',
      'Entrega en zona coordinada',
      'Soporte local antes y durante la renta',
    ],
    formTitle: 'Datos de la reserva',
    quickFields: 'Campos rapidos',
    name: 'Nombre',
    delivery: 'Entrega',
    selectZone: 'Seleccionar zona',
    time: 'Hora',
    days: 'Dias',
    flight: 'Vuelo opcional',
    notes: 'Notas',
    sendWhatsApp: 'Enviar solicitud por WhatsApp',
    process: 'Proceso',
    processTitle: 'Simple para el cliente y facil para ULMAX.',
    steps: [
      ['Elige vehiculo', 'El usuario compara capacidad, categoria y zona.'],
      ['Completa solicitud', 'Fecha, hora, recogida, entrega y contacto.'],
      ['ULMAX confirma', 'El equipo valida disponibilidad y precio final.'],
    ],
    footerTagline: 'Vehiculos confiables en Punta Cana con entrega en aeropuerto, hoteles, villas y soporte directo.',
    footerContact: 'Contacto',
    footerServices: 'Servicios',
    footerZones: 'Zonas',
    callLabel: 'Llamadas',
    requestReservation: 'Solicitar reserva',
    service1: 'Rent car en Punta Cana',
    service2: 'Entrega en aeropuerto PUJ',
    service3: 'Hoteles, villas y Airbnb',
    zone1: 'Punta Cana y Bavaro',
    zone2: 'Cap Cana y Uvero Alto',
    zone3: 'Santo Domingo Airport',
    rights: 'Copyright 2026 ULMAX Rent Car. Todos los derechos reservados.',
    credit: 'Desarrollado por Cynador - Advertising, Marketing Online & Design - Diseno y Desarrollo Web',
    whatsappLead: 'Hola ULMAX Rent Car, quiero rentar un vehiculo en Punta Cana. Fecha, zona y tipo de carro:',
    infoLead: 'Hola ULMAX Rent Car, necesito informacion para rentar un vehiculo en Punta Cana.',
    bookingLead: 'Hola ULMAX Rent Car, quiero reservar un vehiculo en Punta Cana.',
    labels: {
      vehicle: 'Vehiculo',
      name: 'Nombre',
      phone: 'WhatsApp',
      pickup: 'Recogida',
      dropoff: 'Entrega',
      date: 'Fecha',
      time: 'Hora',
      days: 'Dias',
      flight: 'Vuelo',
      notes: 'Notas',
      notSelected: 'No seleccionado',
      noNotes: 'Sin notas',
      notProvided: 'No indicado',
    },
  },
  en: {
    navVehicles: 'Vehicles',
    navBook: 'Book',
    navContact: 'Contact',
    callNow: 'Call now',
    heroEyebrow: 'Punta Cana, Bavaro, airports and hotels',
    heroTitle: 'Rent a car in Punta Cana without stress.',
    heroText:
      'Get your car at the airport, hotel, villa or Airbnb. Book by WhatsApp, confirm with a real person and drive around Punta Cana with confidence from day one.',
    viewVehicles: 'View vehicles',
    quickAria: 'Quick booking',
    quickTitle: 'Quick booking',
    noPay: 'No payment now',
    vehicle: 'Vehicle',
    selectVehicle: 'Select vehicle',
    pickup: 'Pick-up',
    zone: 'Zone',
    date: 'Date',
    continueBooking: 'Continue booking',
    trust: [
      ['Flexible delivery', 'Airport, hotel, villa or Airbnb', Plane],
      ['Insurance included', 'Vehicles checked before delivery', ShieldCheck],
      ['Direct confirmation', 'An advisor validates your booking by WhatsApp', MessageCircle],
      ['Local support', 'Assistance before and during your rental', Clock3],
    ],
    catalog: 'Catalog',
    vehiclesAvailable: 'Available vehicles',
    catalogText: 'Choose the right vehicle for Punta Cana, Bavaro, Cap Cana, hotels and airports.',
    all: 'All',
    passengers: 'passengers',
    bags: 'bags',
    reserve: 'Reserve',
    request: 'Request',
    bookWhatsApp: 'Book by WhatsApp',
    requestText:
      'No forced online payments. ULMAX confirms availability, final price, delivery and documents by WhatsApp.',
    selectedVehicle: 'Selected vehicle',
    pending: 'Pending',
    summary: [
      'Personalized confirmation',
      'Delivery in the agreed area',
      'Local support before and during the rental',
    ],
    formTitle: 'Booking details',
    quickFields: 'Fast fields',
    name: 'Name',
    delivery: 'Drop-off',
    selectZone: 'Select zone',
    time: 'Time',
    days: 'Days',
    flight: 'Flight optional',
    notes: 'Notes',
    sendWhatsApp: 'Send request by WhatsApp',
    process: 'Process',
    processTitle: 'Simple for the customer and easy for ULMAX.',
    steps: [
      ['Choose a vehicle', 'Compare capacity, category and recommended area.'],
      ['Complete the request', 'Date, time, pick-up, drop-off and contact details.'],
      ['ULMAX confirms', 'The team validates availability and final price.'],
    ],
    footerTagline: 'Reliable vehicles in Punta Cana with airport, hotel, villa and direct support delivery.',
    footerContact: 'Contact',
    footerServices: 'Services',
    footerZones: 'Areas',
    callLabel: 'Calls',
    requestReservation: 'Request booking',
    service1: 'Rent a car in Punta Cana',
    service2: 'PUJ airport delivery',
    service3: 'Hotels, villas and Airbnb',
    zone1: 'Punta Cana and Bavaro',
    zone2: 'Cap Cana and Uvero Alto',
    zone3: 'Santo Domingo Airport',
    rights: 'Copyright 2026 ULMAX Rent Car. All rights reserved.',
    credit: 'Developed by Cynador - Advertising, Marketing Online & Design - Web Design and Development',
    whatsappLead: 'Hello ULMAX Rent Car, I want to rent a car in Punta Cana. Date, area and car type:',
    infoLead: 'Hello ULMAX Rent Car, I need information to rent a car in Punta Cana.',
    bookingLead: 'Hello ULMAX Rent Car, I want to book a car in Punta Cana.',
    labels: {
      vehicle: 'Vehicle',
      name: 'Name',
      phone: 'WhatsApp',
      pickup: 'Pick-up',
      dropoff: 'Drop-off',
      date: 'Date',
      time: 'Time',
      days: 'Days',
      flight: 'Flight',
      notes: 'Notes',
      notSelected: 'Not selected',
      noNotes: 'No notes',
      notProvided: 'Not provided',
    },
  },
};

const defaultSettings = {
  company: 'ULMAX Rent Car',
  phone: CURRENT_WHATSAPP,
  callPhone: CURRENT_CALL_PHONE,
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

function normalizeSettings(value) {
  const settings = { ...defaultSettings, ...value };
  const phone = cleanPhone(settings.phone);

  return {
    ...settings,
    phone: !phone || OLD_WHATSAPP_NUMBERS.has(phone) ? CURRENT_WHATSAPP : phone,
    callPhone: cleanPhone(settings.callPhone, CURRENT_CALL_PHONE),
  };
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
  const [language, setLanguage] = useState('es');
  const copy = UI_TEXT[language] || UI_TEXT.es;

  useEffect(() => {
    setVehicles(safeJson(localStorage.getItem(STORAGE_KEYS.vehicles), defaultVehicles));
    setZones(safeJson(localStorage.getItem(STORAGE_KEYS.zones), defaultZones));
    setSettings(normalizeSettings(safeJson(localStorage.getItem(STORAGE_KEYS.settings), defaultSettings)));
    const isAdminPath = window.location.pathname.startsWith('/admin');
    setShowAdminPanel(isAdminPath);
    setAdminAuth(isAdminPath || localStorage.getItem(STORAGE_KEYS.adminSession) === 'true');
    setLanguage(localStorage.getItem(STORAGE_KEYS.language) === 'en' ? 'en' : 'es');

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, language);
    document.documentElement.lang = language;
  }, [language]);

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
    const labels = copy.labels;
    const lines = [
      copy.bookingLead.replace('ULMAX Rent Car', settings.company),
      '',
      `${labels.vehicle}: ${reservation.vehicle || labels.notSelected}`,
      `${labels.name}: ${reservation.name || copy.pending}`,
      `${labels.phone}: ${reservation.phone || copy.pending}`,
      `${labels.pickup}: ${reservation.pickup || copy.pending}`,
      `${labels.dropoff}: ${reservation.dropoff || copy.pending}`,
      `${labels.date}: ${reservation.date || copy.pending}`,
      `${labels.time}: ${reservation.time || copy.pending}`,
      `${labels.days}: ${reservation.days || copy.pending}`,
      `${labels.flight}: ${reservation.flight || labels.notProvided}`,
      `${labels.notes}: ${reservation.notes || labels.noNotes}`,
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
            <a href="#vehiculos">{copy.navVehicles}</a>
            <a href="#reservar">{copy.navBook}</a>
            <a href="#contacto">{copy.navContact}</a>
          </nav>
          <div className="language-switch" aria-label="Language">
            <button className={language === 'es' ? 'active' : ''} onClick={() => setLanguage('es')}>ES</button>
            <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <a className="header-cta" href={`tel:+${cleanPhone(settings.callPhone, '18493486233')}`}>
            {copy.callNow}
          </a>
        </div>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-bg" />
        <div className="wrap hero-content">
          <div className="hero-copy">
            <span className="eyebrow">
              <MapPin size={16} />
              {copy.heroEyebrow}
            </span>
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroText}</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#vehiculos">{copy.viewVehicles}</a>
              <a className="secondary-btn" href={makeWhatsAppUrl(settings.phone, copy.whatsappLead)}>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="booking-card" aria-label={copy.quickAria}>
            <div className="card-heading">
              <span>{copy.quickTitle}</span>
              <b>{copy.noPay}</b>
            </div>
            <label>{copy.vehicle}</label>
            <select
              value={reservation.vehicle}
              onChange={(event) => setReservation({ ...reservation, vehicle: event.target.value })}
            >
              <option value="">{copy.selectVehicle}</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.name}>{vehicle.name}</option>
              ))}
            </select>
            <div className="two-cols">
              <div>
                <label>{copy.pickup}</label>
                <select
                  value={reservation.pickup}
                  onChange={(event) => setReservation({ ...reservation, pickup: event.target.value })}
                >
                  <option value="">{copy.zone}</option>
                  {zones.map((zone) => <option key={zone}>{zone}</option>)}
                </select>
              </div>
              <div>
                <label>{copy.date}</label>
                <input
                  type="date"
                  value={reservation.date}
                  onChange={(event) => setReservation({ ...reservation, date: event.target.value })}
                />
              </div>
            </div>
            <button className="primary-btn full" onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}>
              {copy.continueBooking}
            </button>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="wrap trust-grid">
          {copy.trust.map(([title, text, Icon]) => (
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
            <span className="eyebrow dark">{copy.catalog}</span>
            <h2>{copy.vehiclesAvailable}</h2>
            <p>{copy.catalogText}</p>
          </div>
          <div className="filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
              >
                {category === 'Todos' ? copy.all : category}
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
                  <span><Users size={16} /> {vehicle.passengers} {copy.passengers}</span>
                  <span><Luggage size={16} /> {vehicle.bags} {copy.bags}</span>
                  <span><Gauge size={16} /> {vehicle.transmission}</span>
                  <span><MapPin size={16} /> {vehicle.zone}</span>
                </div>
                <button className="reserve-btn" onClick={() => selectVehicle(vehicle)}>
                  {copy.reserve}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="reservar" className="section muted">
        <div className="wrap reservation-layout">
          <aside className="summary-card">
            <span className="eyebrow dark">{copy.request}</span>
            <h2>{copy.bookWhatsApp}</h2>
            <p>{copy.requestText}</p>
            <div className="selected-vehicle">
              <Car size={28} />
              <div>
                <span>{copy.selectedVehicle}</span>
                <b>{selectedVehicle?.name || reservation.vehicle || copy.pending}</b>
              </div>
            </div>
            <ul>
              {copy.summary.map((item) => (
                <li key={item}><CheckCircle2 size={18} /> {item}</li>
              ))}
            </ul>
          </aside>

          <section className="form-card">
            <div className="form-title">
              <h2>{copy.formTitle}</h2>
              <span>{copy.quickFields}</span>
            </div>
            <label>{copy.vehicle}</label>
            <select
              value={reservation.vehicle}
              onChange={(event) => setReservation({ ...reservation, vehicle: event.target.value })}
            >
              <option value="">{copy.selectVehicle}</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.name}>{vehicle.name}</option>
              ))}
            </select>
            <div className="two-cols">
              <div>
                <label>{copy.name}</label>
                <input value={reservation.name} onChange={(event) => setReservation({ ...reservation, name: event.target.value })} />
              </div>
              <div>
                <label>WhatsApp</label>
                <input value={reservation.phone} onChange={(event) => setReservation({ ...reservation, phone: event.target.value })} />
              </div>
            </div>
            <div className="two-cols">
              <div>
                <label>{copy.pickup}</label>
                <select value={reservation.pickup} onChange={(event) => setReservation({ ...reservation, pickup: event.target.value })}>
                  <option value="">{copy.selectZone}</option>
                  {zones.map((zone) => <option key={zone}>{zone}</option>)}
                </select>
              </div>
              <div>
                <label>{copy.delivery}</label>
                <select value={reservation.dropoff} onChange={(event) => setReservation({ ...reservation, dropoff: event.target.value })}>
                  <option value="">{copy.selectZone}</option>
                  {zones.map((zone) => <option key={zone}>{zone}</option>)}
                </select>
              </div>
            </div>
            <div className="three-cols">
              <div>
                <label>{copy.date}</label>
                <input type="date" value={reservation.date} onChange={(event) => setReservation({ ...reservation, date: event.target.value })} />
              </div>
              <div>
                <label>{copy.time}</label>
                <input type="time" value={reservation.time} onChange={(event) => setReservation({ ...reservation, time: event.target.value })} />
              </div>
              <div>
                <label>{copy.days}</label>
                <input value={reservation.days} onChange={(event) => setReservation({ ...reservation, days: event.target.value })} />
              </div>
            </div>
            <div className="two-cols">
              <div>
                <label>{copy.flight}</label>
                <input value={reservation.flight} onChange={(event) => setReservation({ ...reservation, flight: event.target.value })} />
              </div>
              <div>
                <label>{copy.notes}</label>
                <input value={reservation.notes} onChange={(event) => setReservation({ ...reservation, notes: event.target.value })} />
              </div>
            </div>
            <button className="primary-btn full" onClick={sendReservation}>
              {copy.sendWhatsApp}
            </button>
          </section>
        </div>
      </section>

      <section className="section process">
        <div className="wrap">
          <span className="eyebrow dark">{copy.process}</span>
          <h2>{copy.processTitle}</h2>
          <div className="steps">
            {copy.steps.map(([title, text], index) => (
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
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <b>{settings.company}</b>
            <p>{language === 'es' ? settings.tagline : copy.footerTagline}</p>
            <a className="footer-whatsapp" href={makeWhatsAppUrl(settings.phone, copy.infoLead)}>
              <MessageCircle size={18} /> WhatsApp 24/7
            </a>
          </div>

          <div className="footer-col">
            <span>{copy.footerContact}</span>
            <a href={makeWhatsAppUrl(settings.phone, copy.infoLead)}>WhatsApp: +1 (849) 384-8233</a>
            <a href={`tel:+${cleanPhone(settings.callPhone, '18493486233')}`}>{copy.callLabel}: +1 (849) 348-6233</a>
            <a href="#reservar">{copy.requestReservation}</a>
          </div>

          <div className="footer-col">
            <span>{copy.footerServices}</span>
            <a href="#vehiculos">{copy.service1}</a>
            <a href="#vehiculos">{copy.service2}</a>
            <a href="#vehiculos">{copy.service3}</a>
            <a href="/admin">Login</a>
          </div>

          <div className="footer-col">
            <span>{copy.footerZones}</span>
            <a href="#vehiculos">{copy.zone1}</a>
            <a href="#vehiculos">{copy.zone2}</a>
            <a href="#vehiculos">{copy.zone3}</a>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <p>{copy.rights}</p>
          <p>{copy.credit}</p>
        </div>
      </footer>

      <a className="floating-whatsapp" href={makeWhatsAppUrl(settings.phone, copy.whatsappLead)}>
        <MessageCircle size={18} /> WhatsApp
      </a>
    </main>
  );
}
