# 🎵 Método Activa

**Transformando la Ansiedad en Vitalidad a través de la Neuroestética y la Musicoterapia.**

[![Firebase Hosting](https://img.shields.io/badge/Hosting-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://metodoactiva.es)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Status](https://img.shields.io/badge/Status-Production-success?style=flat-square)]()
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)]()

**Método Activa** es una plataforma digital diseñada para promocionar y dar soporte al libro y metodología creada por **Aurora Del Río**. Este proyecto combina una landing page de alta conversión, un chatbot de IA empático para soporte emocional y ventas, y un panel de administración para gestión de leads.

---

## 🚀 Características Principales

### 1. 🎨 Experiencia de Usuario (UX) Inmersiva
- **Diseño Neuroestético:** Interfaz visual basada en principios de neuroestética para reducir la carga cognitiva y generar calma.
- **Animaciones Suaves:** Uso de `framer-motion` y transiciones CSS para una navegación fluida.
- **Responsive Design:** Totalmente adaptado a móviles, tablets y escritorio.

### 2. 🤖 Chatbot IA "Aurora" (Gemini Pro)
- **Asistente Virtual Empático:** Entrenado para responder dudas sobre ansiedad y estrés con un tono cálido y profesional.
- **Enfoque en Ventas:** Lógica de conversación diseñada para guiar gentilmente al usuario hacia la compra del libro en Amazon.
- **Integración Client-Side:** Conexión directa y segura con Google Gemini API para máxima velocidad y disponibilidad (Frontend-only architecture).
- **Indicadores de Estado:** Feedback visual de "escribiendo..." y notificaciones sonoras suaves.

### 3. 📊 Dashboard de Administración
- **Gestión de Leads:** Visualización y exportación (CSV) de usuarios interesados.
- **Monitorización de Chats:** Historial completo de conversaciones con la IA para análisis de calidad.
- **Acceso Seguro:** Sistema de autenticación simple integrado.

### 4. ⚡ Rendimiento y SEO
- **Lazy Loading:** Carga diferida de imágenes y componentes pesados.
- **SEO Optimizado:** Meta etiquetas configuradas para indexación óptima.
- **Firebase Hosting:** Despliegue global en CDN para tiempos de carga mínimos.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React + Vite
- **Estilos:** Tailwind CSS
- **Lenguaje:** JavaScript (ES6+)
- **IA:** Google Generative AI SDK (Gemini Pro)
- **Backend / DB:** Firebase Firestore (NoSQL)
- **Hosting:** Firebase Hosting
- **Iconos:** Lucide React

---

## 📂 Estructura del Proyecto

```bash
METODO-ACTIVA/
├── public/              # Assets estáticos (imágenes, logos)
├── src/
│   ├── components/      # Componentes React reutilizables
│   │   ├── chat/        # Lógica e interfaz del Chatbot con Gemini
│   │   ├── ui/          # Componentes de interfaz (Botones, Modales, Cards)
│   │   └── ...
│   ├── constants/       # Textos e imágenes centralizados
│   ├── App.jsx          # Componente principal y layout
│   └── main.jsx         # Punto de entrada
├── firebase.json        # Configuración de despliegue Firebase
└── vite.config.js       # Configuración de Vite
```

---

## 🔧 Configuración e Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ECONEURA-EMPRESA/METODO-ACTIVA.git
   cd METODO-ACTIVA
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   (El proyecto utiliza configuración directa para el MVP, asegurando funcionalidad inmediata).

4. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

5. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## ☁️ Despliegue

El proyecto está configurado para despliegue automático en **Firebase Hosting**.

```bash
npm run build
firebase deploy --only hosting
```

---

## 📞 Contacto y Soporte

- **Web Oficial:** [www.metodoactiva.es](https://metodoactiva.es)
- **Email:** info@metodoactiva.es
- **Autor:** Aurora Del Río

---

© 2025 Método Activa. Todos los derechos reservados.
