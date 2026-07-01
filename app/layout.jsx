import './globals.css';
export const metadata = {
  title: 'ULMAX Rent Car | Punta Cana car rental',
  description: 'Car rental in Punta Cana and Bavaro with airport, hotel, villa and Airbnb delivery. Reserva por WhatsApp.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
