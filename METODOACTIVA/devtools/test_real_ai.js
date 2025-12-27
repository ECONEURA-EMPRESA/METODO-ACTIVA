
import { GoogleGenerativeAI } from "@google/generative-ai";

// Clave PRO proporcionada por el usuario (Validada)
const API_KEY = "YOUR_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

// Usamos el modelo más rápido y disponible detectado en la lista
const MODEL_NAME = "gemini-2.0-flash-lite-preview";

async function runTests() {
    console.log(`🔵 PRUEBA DE FUEGO CON ${MODEL_NAME}...\n`);

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const tests = [
        { name: "1. Matemáticas (Prueba de Verdad)", prompt: "Cuanto es 2 + 2. Responde solo el número." },
        { name: "2. Razonamiento", prompt: "Si Ana es más alta que Bea, y Bea es más alta que Cloe, ¿quién es la más baja?" },
        { name: "3. Personalidad", prompt: "Hola Aurora, ¿cómo estás?" },
        { name: "4. Venta", prompt: "¿Cuánto cuesta el libro?" },
        { name: "5. Creatividad", prompt: "Invita al usuario a leer en 1 frase poética." }
    ];

    for (const test of tests) {
        console.log(`🔸 ${test.name}`);
        console.log(`   Input: "${test.prompt}"`);
        try {
            const result = await model.generateContent(test.prompt);
            const output = result.response.text();
            console.log(`   ✅ Output Real: "${output.trim()}"\n`);
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}\n`);
        }
    }
}

runTests();
