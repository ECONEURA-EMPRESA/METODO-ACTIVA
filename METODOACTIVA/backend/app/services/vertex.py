import logging
import google.generativeai as genai
from app.core.config import settings
from app.core.prompts import AURORA_SYSTEM_PROMPT

# Configure Logger
logger = logging.getLogger(__name__)

class VertexService:
    def __init__(self):
        if not settings.GEMINI_API_KEY:
            logger.critical("⚠️ GEMINI_API_KEY Missing! AI features will be disabled.")
        
        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
            logger.info("✅ VertexService Initialized (Model: gemini-2.5-flash)")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Gemini: {e}")
            self.model = None

    async def generate_response(self, user_message: str, user_context: str) -> str:
        """
        🗣️ Genera la respuesta empática usando Gemini Flash.
        """
        if not self.model:
            logger.error("Attempted to generate response without initialized model.")
            return "Lo siento, estoy en mantenimiento. Por favor revisa el libro en Amazon. 📚"

        try:
            # Construct Prompt
            prompt = f"{AURORA_SYSTEM_PROMPT}\n\nContexto Usuario: {user_context}\nPregunta: {user_message}"
            
            # Call API
            response = self.model.generate_content(prompt)
            
            logger.info(f"🤖 AI Response Generated ({len(response.text)} chars)")
            return response.text
            
        except Exception as e:
            logger.exception(f"❌ Gemini API Error: {str(e)}")
            return "Lo siento, mi conexión musical está interferida. ¿Podrías repetirlo? 🎵"

# Global Instance
vertex_service = VertexService()
