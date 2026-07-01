import './globals.css';
export const metadata = {
  title: 'ULMAX Rent Car | Vehiculos en Punta Cana',
  description: 'Renta vehiculos en Punta Cana, Bavaro, aeropuertos, hoteles y villas con confirmacion por WhatsApp.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
