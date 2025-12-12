# 🔑 Guía Maestra: Activar el Cerebro Gemini

Sigue estos 3 pasos exactos para que tu chatbot deje de simular y empiece a **pensar**.

## Paso 1: Conseguir la Llave (API Key)
1.  Entra en esta web oficial de Google: **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2.  Inicia sesión con tu cuenta de Google (la misma de tu proyecto).
3.  Haz clic en el botón azul grande **"Create API key"**.
4.  Si te pregunta, elige tu proyecto existente (`project-c465bc45...`) o dale a "Create API key in new project".
5.  Se abrirá una ventana con un código largo que empieza por `AIza...`.
6.  **COPIA ese código.**

## Paso 2: Entregármela (Opción Fácil)
Simplemente pega ese código `AIza...` aquí en el chat.
*   Yo me encargo de configurarlo en el servidor seguro de Firebase por ti.

## Paso 3: Configuración Manual (Opción "Hazlo tú mismo")
Si prefieres no pegarla en el chat, ejecuta este comando en tu terminal:

```powershell
firebase functions:config:set google.gemini_api_key="PEGAR_TU_CLAVE_AQUI"
```

Y luego redespliega las funciones:
```powershell
firebase deploy --only functions
```

---
**¿Qué necesitas ahora mismo?**
Solo el **Paso 1**. Ve a la web, consigue la clave y pégala aquí. Yo haré el resto.
