const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const admins = require("firebase-admin");
const cors = require("cors")({ origin: true });

// Inicializar Admin SDK una sola vez
if (!admins.apps.length) {
    admins.initializeApp();
}
const db = admins.firestore();

// --- FUNCIÓN DE CHAT (GEN 1) ---
// Usamos "functions.https.onRequest" que es la versión clásica y robusta.
exports.chatWithGemini = functions
    .runWith({
        timeoutSeconds: 60,
        memory: "256MB"
    })
    .https.onRequest(async (req, res) => {
        // Envolver todo en CORS middleware
        return cors(req, res, async () => {
            // Soporte explícito para preflight OPTIONS por si acaso
            if (req.method === 'OPTIONS') {
                res.status(204).send('');
                return;
            }

            try {
                // En Gen 1, usamos functions.config() o process.env si está seteado.
                // Intentamos leer de process.env primero (lo más común hoy en día)
                const apiKey = process.env.GEMINI_API_KEY;

                if (!apiKey) {
                    console.error("MISSING API KEY");
                    // Fallback para evitar crashing si no está la env
                    return res.status(500).json({ error: "Server config error: API Key missing" });
                }

                const { message } = req.body;
                if (!message) {
                    return res.status(400).json({ error: "Message is required" });
                }

                const genAI = new GoogleGenerativeAI(apiKey);

                const systemInstruction = `
                    Actúa como Aurora Del Río, musicoterapeuta experta y autora del libro "Método Activa".
                    Tu misión es ayudar a las personas a entender cómo la música y la neuroestética pueden reducir el cortisol y la ansiedad.
                    El libro incluye un plan de 21 días.
                    Tono: Empático, profesional, cálido y científico pero accesible.
                    Responde de forma concisa (máximo 3 frases si es posible).
                `;

                const fullPrompt = `${systemInstruction}\n\nUsuario: ${message}\nAurora:`;

                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                const result = await model.generateContent(fullPrompt);
                const response = await result.response;
                const text = response.text();

                // Guardar log en Firestore (con manejo de errores para que no rompa el chat)
                try {
                    await db.collection("chat_logs").add({
                        query: message,
                        response: text,
                        timestamp: admins.firestore.FieldValue.serverTimestamp(),
                        platform: "web_gen1"
                    });
                } catch (logError) {
                    console.error("Error logging to firestore:", logError);
                }

                return res.status(200).json({ text: text });

            } catch (error) {
                console.error("Error calling Gemini:", error);
                return res.status(500).json({
                    error: "Internal Error",
                    details: error.message
                });
            }
        });
    });

// --- FUNCIÓN DE DASHBOARD (GEN 1) ---
exports.getDashboardData = functions
    .runWith({
        timeoutSeconds: 60,
        memory: "256MB"
    })
    .https.onRequest(async (req, res) => {
        return cors(req, res, async () => {
            if (req.method === 'OPTIONS') {
                res.status(204).send('');
                return;
            }

            const ACCESS_KEY = "AURORA_MASTER_2025";
            const { key } = req.body;

            if (key !== ACCESS_KEY) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            try {
                const leadsSnapshot = await db.collection("leads").orderBy("timestamp", "desc").limit(50).get();
                const chatsSnapshot = await db.collection("chat_logs").orderBy("timestamp", "desc").limit(50).get();

                const leads = leadsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString()
                }));

                const chats = chatsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString()
                }));

                return res.status(200).json({ leads, chats });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                return res.status(500).json({ error: "Internal Error" });
            }
        });
    });
