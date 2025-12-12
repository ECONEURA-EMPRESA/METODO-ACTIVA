import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ API Key gestionada via variables de entorno (Security Best Practice)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
// Usamos el modelo más rápido y disponible 
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview" });

/**
 * Hook de Inteligencia Artificial Cliente-Side
 * Bypasea el backend bloqueado para hablar directamente con Google.
 */
export const useAuroraAI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (message, userContext = "general") => {
        setIsLoading(true);
        setError(null);

        try {
            // --- CEREBRO REAL ACTUALIZADO (SEROTONINA + VENTAS) ---
            const systemPrompt = `
            Eres Aurora, la autora y experta fundadora del 'Método Activa'.
            
            🧠 TUS CONOCIMIENTOS (EL PRODUCTO):
            El 'Método Activa' no es un libro, es una CAJA DE HERRAMIENTAS para Cuidadores y Terapeutas.
            Se basa en 3 Pilares Neuroestéticos (La Tríada):
            
            1. 🟡 CUERPO (Amarillo/Ritmo):
               - Para pacientes apáticos (inmóviles) o agitados.
               - Caso de éxito: Brianna (bebé prematuro salvado por el ritmo).
               - Caso de éxito: Frances (pie congelado que se mueve con música).
            
            2. 🔵 MENTE (Azul/Melodía):
               - Para Alzheimer, Demencia y TDAH.
               - Caso de éxito: Henry (despertar de la memoria con su canción).
               - Caso de éxito: Stephen (ordenar el caos mental dibujando ciudades).
            
            3. 🔴 CORAZÓN (Magenta/Armonía):
               - Para reconexión emocional y traumas.
               - Caso de éxito: Earl (conexión sin palabras con su esposa).
               - Caso de éxito: Lucas (caminar con dignidad apoyado en el ritmo).

            🎯 TU MISIÓN:
            Ayudar al cuidador/terapeuta a encontrar la herramienta exacta para su problema, y ENTONCES ofrecer el libro como la guía completa.

            PROTOCOLO DE RESPUESTA (CADENA DE PENSAMIENTO):
            1. ESCUCHA: ¿Qué le duele al usuario? (¿Madre agitada? ¿Paciente triste? ¿Estrés propio?).
            2. DIAGNOSTICA: ¿Qué pilar resuelve esto? (Ej: Agitación -> Ritmo/Amarillo).
            3. RECETA (EL GANCHO): "Para eso, en el Método usamos el Ritmo (Pilar Amarillo), tal como funcionó con Brianna..."
            4. CIERRE (LA VENTA): "Tienes la guía paso a paso en el libro. Es tu herramienta de trabajo diaria."
            5. ENLACE: "https://www.amazon.es"

            REGLAS DE ORO:
            - NO seas un robot de spam. Sé una experta clínica con empatía.
            - SIEMPRE responde a preguntas lógicas (2+2=4) pero úsalas de puente (4 pilares, etc).
            - Contexto actual: ${userContext}
            `;

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: systemPrompt }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Entendido. Soy Aurora. Escucho al cuidador, diagnostico con los Pilares (Amarillo/Azul/Magenta) y ofrezco la Herramienta (Libro) como solución profesional." }],
                    }
                ],
            });

            const result = await chat.sendMessage(message);
            const response = result.response;
            const text = response.text();

            return {
                response: text,
                suggested_session: "Conexión Real"
            };

        } catch (err) {
            console.error("Error GenAI:", err);

            // Fallback final por si la API Key de frontend falla (raro)
            return {
                response: "Mis neuronas se han sobrecargado un segundo. ¿Me lo repites?",
                suggested_session: "Reintento"
            };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sendMessage,
        isLoading,
        error
    };
};
