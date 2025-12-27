import { useState } from 'react';
import { auth } from '../firebase';
import { signInAnonymously } from 'firebase/auth';

/**
 * Hook de Inteligencia Artificial - V3 CLOUD RUN (Enterprise)
 * Conecta al Backend Python a través del Proxy de Firebase Hosting.
 */
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://metodo-activa-brain-v2-358634200570.us-central1.run.app/api/v1/chat";

export const useAuroraAI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (message, userContext = "general") => {
        setIsLoading(true);
        setError(null);

        let token = null;

        try {
            // 1. Autenticación Silenciosa (Intentar pero no bloquear)
            let user = auth.currentUser;
            if (!user) {
                try {
                    const userCredential = await signInAnonymously(auth);
                    user = userCredential.user;
                } catch (authError) {
                    console.warn("⚠️ Fallback: Auth failed, proceeding as Guest.", authError);
                }
            }

            // 2. Obtener Token (Si hay usuario)
            if (user) {
                token = await user.getIdToken();
            }

            // 3. Llamada al Cerebro (Cloud Run)
            // Se envía el token si existe, si no, el backend lo maneja como "Guest".
            const headers = { 'Content-Type': 'application/json' };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    message: message,
                    user_context: userContext
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Error connecting to Brain");
            }

            const data = await response.json();

            return {
                response: data.response,
                suggested_session: data.suggested_session
            };

        } catch (err) {
            console.error("Error AI Service:", err);
            setError(err.message);

            return {
                response: "Lo siento, hubo un problema de conexión. ¿Podrías repetirlo?",
                suggested_session: "Error de Conexión"
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
