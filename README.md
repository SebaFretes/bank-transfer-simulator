# Zeta Bank Transfer Simulator

Módulo de simulación de transferencias entre cuentas bancarias internas, con historial, dashboard en tiempo real y mercado de criptomonedas vía WebSocket.

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Zustand** — estado global
- **react-i18next** — internacionalización (ES/EN)
- **Recharts** — gráficas
- **Finnhub WebSocket** — precios cripto en tiempo real
- **Vite** — bundler

## ✨ Features

- Simulación de transferencias con validaciones (saldo insuficiente, cuentas distintas, monto válido)
- Foto de usuarios al seleccionar cuentas
- Historial de transferencias del día filtrados por origen, destino y monto
- Dashboard con métricas: total de transacciones, monto transferido y cuenta más activa
- Gráfica de transacciones por cuenta
- Mercado cripto en tiempo real (BTC, ETH, BNB) vía WebSocket
- Modo oscuro / claro
- Internacionalización español / inglés
- Diseño responsive
- Notificaciones toast

## 📦 Instalación

```bash
git clone https://github.com/SebaFretes/bank-transfer-simulator.git
cd bank-transfer-simulator
yarn
```

## ⚙️ Variables de entorno

Creá un archivo `.env` en la raíz con:

```
VITE_FINNHUB_TOKEN=tu_api_key
```

Obtenés tu API key gratis en [finnhub.io](https://finnhub.io)

## 🖥️ Correr el proyecto

```bash
yarn dev
```

Abre en [http://localhost:5173](http://localhost:5173)

## 📁 Estructura

```
src/
├── components/
│   ├── ui/          # Componentes genéricos
│   ├── transfer/    # Panel de transferencias
│   ├── history/     # Historial
│   └── dashboard/   # Dashboard y cripto
├── store/           # Zustand stores
├── hooks/           # Custom hooks
├── i18n/            # Traducciones ES/EN
├── data/            # Mock data de cuentas
├── types/           # TypeScript interfaces
└── pages/           # Páginas principales
```
