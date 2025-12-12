import { Music, Brain, Heart, Sparkles, Users, Smile, Sun, Anchor, Infinity, HandHeart } from 'lucide-react';

export const CONTENT = {
    navbar: {
        brand: "MÉTODO ACTIVA",
        links: {
            about: "El Arte de Conectar",
            resources: "Recursos Gratuitos",
            support: "Sesiones",
            reviews: "Historias Reales"
        },
        cta: "Manual en Amazon"
    },
    hero: {
        badge: {
            prefix: "UN VIAJE HACIA",
            highlight1: "TI MISM@",
            middle: "Y HACIA",
            highlight2: "ELLOS"
        },
        title: {
            part1: "ACTIVA TU",
            gradient1: "CUERPO",
            gradient2: "MENTE",
            gradient3: "CORAZÓN",
            suffix: "CON ARTE"
        },
        description: "Cuando las palabras se apagan, la música enciende el vínculo. El **Método Activa** es un manual de 21 sesiones prácticas para dominar **el arte de conectar**: calma tu propio ruido mental, disuelve la soledad de tus **mayores** y entra en el mundo de tus **niños**. La medicina es el vínculo.",
        cta_primary: "Ver Libro en Amazon",
        cta_secondary: "Descargar Sesión Gratis",
        rating: "5.0/5",
        reviews_count: "(Vínculos restaurados)",
        shipping: "Envío Rápido con Prime",
        badges: [
            "Conexión Humana",
            "Autocuidado",
            "Musicoterapia"
        ],
        book_badge: {
            category: "Nº1 en",
            rank: "Cuidado Emocional"
        }
    },
    benefits: {
        title: "",
        subtitle: "El arte es el puente invisible que une lo que la vida separó. Empieza por ti.",

        cards: [
            // --- NIVEL 1: CONEXIÓN INTERNA (AUTOCUIDADO) ---
            {
                category: "heart", // Color cálido (Rosa/Rojo)
                icon: Anchor, // Icono de Ancla
                title: "Conexión Emocional (El Vínculo)",
                desc: "Vence la soledad. Usa frecuencias sonoras para restaurar el lazo afectivo, silenciar la culpa y recuperar la capacidad de cuidar desde el amor, no desde el agotamiento."
            },

            // --- NIVEL 2: CONEXIÓN VITAL (MAYORES) ---
            {
                category: "body", // Color vital (Naranja)
                icon: Sun, // Icono de Sol/Vida
                title: "Conexión Vital (Energía)",
                desc: "Reactiva la vida. La música actúa como un desfibrilador para el ánimo: inyecta energía al anciano apático y regula el ritmo del niño inquieto. Es pura física."
            },

            // --- NIVEL 3: CONEXIÓN EMOCIONAL (NIÑOS) ---
            {
                category: "mind", // Color mental/calma (Azul/Violeta)
                icon: Infinity, // Icono de Infinito (Neurodivergencia/Vínculo eterno)
                title: "Conexión Cognitiva (Memoria/Foco)",
                desc: "Despierta la mente. Usa el estímulo sonoro preciso para recuperar recuerdos en Alzheimer ('Memoria Musical') o centrar la atención dispersa en TDAH ('Foco Rítmico')."
            },

            // --- EL RESULTADO: PRESENCIA ---
            {
                category: "heart",
                icon: HandHeart, // Icono de mano dando amor
                title: "El Resultado: Presencia Real",
                desc: "Dejamos de 'gestionar' pacientes para empezar a 'vivir' con personas. El Método Activa te regala el arte de estar presente, aquí y ahora, a través de la belleza."
            }
        ]
    },
    resources: {
        title: "Empieza a Conectar Hoy Mismo",
        subtitle: "No esperes a que llegue el libro. Descarga la **Sesión Nº1** y siente cómo cambia la energía en casa en solo 10 minutos.",
        cta_download: "Recibir Guía de Conexión",
        items: [
            {
                category: "heart",
                icon: Music,
                title: "Audio: Tu Refugio Sonoro",
                desc: "Una pista de 5 minutos diseñada para bajar tus pulsaciones antes de entrar en la habitación de tu familiar."
            },
            {
                category: "body",
                icon: Users,
                title: "Dinámica: El Hilo Invisible",
                desc: "Un ejercicio sencillo de ritmo compartido para sentir la unión física y emocional sin necesidad de hablar."
            },
            {
                category: "mind",
                icon: Sparkles,
                title: "Guía de Ambiente",
                desc: "Cómo preparar la luz y el sonido de tu hogar para favorecer la calma y la apertura emocional."
            }
        ]
    },
    reviews: {
        title: "Historias de Reencuentro",
        subtitle: "Familias que cruzaron el puente y se volvieron a encontrar.",
        cta_more: "Leer más reseñas en Amazon",
        items: [
            {
                title: "Me devolvió a mi madre",
                text: "El Alzheimer nos había robado las palabras. Con la sesión de 'Canciones de Vida' del libro, mi madre volvió a mirarme a los ojos y cantamos juntas. Ese momento vale oro.",
                author: "Lucía P., Hija",
                date: "Hace 1 semana"
            },
            {
                title: "Entendí a mi hijo",
                text: "Mi hijo con autismo se aislaba. Aprendí a usar el 'Silencio Activo' del método y él se acercó a mí para completar el ritmo. Lloré de felicidad. Gracias por enseñarme a conectar.",
                author: "Marc T., Padre",
                date: "Hace 3 días"
            },
            {
                title: "Paz para la cuidadora",
                text: "Compré el libro para mi abuelo, pero me salvó a mí. Aprendí a respirar y a usar la música para no quemarme. Ahora disfruto cuidando.",
                author: "Elena R., Cuidadora",
                date: "Hace 2 semanas"
            }
        ]
    },
    footer: {
        copyright: "© 2025 Método Activa. El Arte de Conectar Personas.",
        links: {
            privacy: "Política de Privacidad",
            terms: "Aviso Legal",
            cookies: "Cookies"
        }
    }
};
