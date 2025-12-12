const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const admins = require("firebase-admin");
const cors = require("cors")({ origin: true });

if (!admins.apps.length) {
    admins.initializeApp();
}
const db = admins.firestore();

// -------------------------------------------------------------------------
// PROXY DE CHAT ROBUSTO (Gemini 2.0 Flash Lite)
// Soluciona: CORS, Rate Limiting (429) y Model Availability
// -------------------------------------------------------------------------

exports.chatWithGemini = functions
    .runWith({
        timeoutSeconds: 60,
        memory: "256MB"
    })
    .https.onRequest(async (req, res) => {
        return cors(req, res, async () => {
            // Hardcoded Key = Estabilidad Garantizada (Server Side es seguro)
            const API_KEY = "AIzaSyDaC9AVDoSXfKbIRuZZKkfNnDNFw2E8T5w";

            if (req.method === 'OPTIONS') return res.status(204).send('');

            const { message } = req.body;
            if (!message) return res.status(400).json({ error: "Message required" });

            try {
                // MODELO CORRECTO (Validado por script local)
                const genAI = new GoogleGenerativeAI(API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });

                const systemPrompt = `
                Eres Aurora Del Río, experta en Musicoterapia y autora del "Método Activa".
                Estás hablando con alguien que cuida a un paciente con demencia.
                TU OBJETIVO: Vender el libro "Método Activa" mediante empatía y autoridad técnica.
                1. Escucha su dolor.
                2. Explica la ciencia (música = menos cortisol).
                3. Recomienda el libro como guía.
                Sé breve y cálida.
                `;

                // ESTRATEGIA DE REINTENTO (Server Side)
                // Si Google da 429, esperamos y reintentamos aquí, transparente para el usuario.
                let text = "";
                let retries = 3;

                for (let i = 0; i < retries; i++) {
                    try {
                        const result = await model.generateContent(`${systemPrompt}\n\nUsuario: ${message}\nAurora:`);
                        const response = await result.response;
                        text = response.text();
                        break; // Éxito
                    } catch (genError) {
                        // Si es error 429 (Quota) o 503 (Overloaded)
                        if ((genError.message && genError.message.includes("429")) || (genError.status === 429) || (genError.status === 503)) {
                            console.warn(`Intento ${i + 1}/${retries} fallido (Saturación). Esperando...`);
                            await new Promise(r => setTimeout(r, 2000 * (i + 1))); // 2s, 4s, 6s...
                        } else {
                            throw genError; // Otros errores explotan
                        }
                    }
                }

                if (!text) throw new Error("Google API Saturated after retries.");

                // Log exitoso
                await db.collection("chat_logs").add({
                    query: message,
                    response: text,
                    timestamp: admins.firestore.FieldValue.serverTimestamp(),
                    platform: "server_proxy_flash_lite"
                });

                return res.status(200).json({ text: text });

            } catch (error) {
                console.error("CRITICAL ERROR IN FUNCTION:", error);
                // Fallback de emergencia del servidor (Último recurso)
                return res.status(200).json({
                    text: "⚠️ Mi servidor está experimentando una carga inmensa. Por favor, intenta de nuevo en 30 segundos. (Error 500)"
                });
            }
        });
    });

// -------------------------------------------------------------------------
// DASHBOARD (Legacy)
// -------------------------------------------------------------------------
exports.getDashboardData = functions
    .runWith({ timeoutSeconds: 60, memory: "256MB" })
    .https.onRequest(async (req, res) => {
        return cors(req, res, async () => {
            const ACCESS_KEY = "AURORA_MASTER_2025";
            if (req.body.key !== ACCESS_KEY) return res.status(401).json({ error: "Unauthorized" });
            try {
                const leads = (await db.collection("leads").orderBy("timestamp", "desc").limit(50).get()).docs.map(d => ({ ...d.data(), id: d.id }));
                const chats = (await db.collection("chat_logs").orderBy("timestamp", "desc").limit(50).get()).docs.map(d => ({ ...d.data(), id: d.id }));
                res.json({ leads, chats });
            } catch (e) { res.status(500).json({ error: e.message }); }
        });
    });
