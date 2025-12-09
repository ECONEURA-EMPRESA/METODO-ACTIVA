import { Music, Brain, Heart, Sparkles, Users, Smile, Sun, HandHeart } from 'lucide-react';

export const CONTENT = {
    navbar: {
        brand: "MÉTODO ACTIVA",
        links: {
            about: "El Propósito",
            resources: "Recursos de Unión",
            support: "Sesiones",
            reviews: "Familias"
        },
        cta: "Conseguir el Libro"
    },
    hero: {
        badge: {
            prefix: "NO DEJES QUE LA",
            highlight1: "SOLEDAD",
            middle: "GANÉ LA",
            highlight2: "PARTIDA"
        },
        title: {
            part1: "EL ARTE",
            gradient1: "CONECTA",
            gradient2: "CORAZONES",
            gradient3: "SOLITARIOS"
        },
        description: "Cuando la vejez trae silencio o la infancia trae barreras, la música tiende un puente. El **Método Activa** es tu guía para **vencer la soledad en tus mayores** y **crear un vínculo inquebrantable con tus niños**. 21 sesiones para decir 'Te quiero' sin palabras.",
        cta_primary: "Ver Libro en Amazon",
        cta_secondary: "Probar una Sesión Juntos",
        rating: "4.9/5",
        reviews_count: "(Hijos y padres que volvieron a conectar)",
        shipping: "Disponible en Tapa Blanda (Para regalar)",
        badges: [
            "Contra la Soledad",
            "Vínculo Familiar",
            "Amor en Acción"
        ],
        book_badge: {
            category: "Best Seller en",
            rank: "Cuidado Familiar"
        }
    },
    benefits: {
        title: "¿A quién vas a recuperar hoy?",
        subtitle: "La musicoterapia no solo cura el cuerpo, cura la distancia entre las personas.",

        cards: [
            // --- BLOQUE MAYORES (SOLEDAD Y PRESENCIA) ---
            {
                category: "heart", // Color cálido
                icon: Sun,
                title: "Mayores: Adiós a la Soledad",
                desc: "El silencio de la vejez duele. Llena su casa de melodías y vida. Comparte una canción y verás cómo su mirada se ilumina, sintiéndose acompañados y valiosos de nuevo."
            },
            {
                category: "mind",
                icon: Brain,
                title: "Mayores: Recuerdos Compartidos",
                desc: "El Alzheimer puede borrar datos, pero no emociones. Usa la música para viajar juntos a sus mejores momentos y tener conversaciones desde el corazón, no desde la memoria."
            },

            // --- BLOQUE NIÑOS (CONEXIÓN Y ENTENDIMIENTO) ---
            {
                category: "body",
                icon: HandHeart, // Icono de mano y corazón
                title: "Niños: Entrar en su Mundo",
                desc: "A veces no quieren hablar, pero siempre quieren jugar. Usa el arte y el ritmo para entrar en su burbuja y construir un puente de confianza donde se sientan seguros."
            },
            {
                category: "heart",
                icon: Smile,
                title: "Niños: Alegría Compartida",
                desc: "Transforma las rutinas difíciles en juegos sonoros. Cambia el conflicto por la risa y fortalece el vínculo afectivo que les protegerá toda la vida."
            }
        ]
    },
    resources: {
        title: "Cread un Momento Mágico Hoy",
        subtitle: "No esperes a tener el libro. Descarga la **Sesión de Conexión Nº1** y dedica 10 minutos a mirar a los ojos y disfrutar con tu ser querido.",
        cta_download: "Descargar Guía de Conexión",
        items: [
            {
                category: "heart",
                icon: Users,
                title: "Guía: Tu Primer Encuentro Musical",
                desc: "Instrucciones sencillas para hacer una actividad que rompa el hielo y genere sonrisas inmediatas."
            },
            {
                category: "body",
                icon: Music,
                title: "Playlist: Abrazos Sonoros",
                desc: "Una selección musical curada científicamente para generar oxitocina (la hormona del amor) y calma ambiental."
            },
            {
                category: "mind",
                icon: Sparkles,
                title: "Diario de Momentos",
                desc: "Un espacio para anotar esas miradas, esas palabras y esos gestos que la música os ha regalado hoy."
            }
        ]
    },
    reviews: {
        title: "Vínculos Restaurados",
        subtitle: "Lo que sucede cuando el arte entra en casa.",
        cta_more: "Leer historias emotivas en Amazon",
        items: [
            {
                title: "Ya no se siente sola",
                text: "Mi madre pasaba los días mirando la ventana. Con las sesiones de música del libro, ahora canta, baila en su silla y me espera con ilusión. Ha vuelto a la vida.",
                author: "Carmen D., Hija",
                date: "Compra verificada"
            },
            {
                title: "Por fin nos entendemos",
                text: "Mi hijo con autismo no me dejaba abrazarle. A través de los juegos rítmicos del Método Activa, ahora buscamos el contacto y nos reímos juntos. Es un milagro.",
                author: "David L., Padre",
                date: "Compra verificada"
            },
            {
                title: "El mejor regalo para mi abuelo",
                text: "No sabía qué regalarle y le di mi tiempo con este libro. Hemos descubierto que le encanta pintar escuchando jazz. Es nuestro momento sagrado.",
                author: "Sofía, Nieta",
                date: "Compra verificada"
            }
        ]
    },
    footer: {
        copyright: "© 2025 Método Activa. El Arte Conecta Personas.",
        links: {
            privacy: "Privacidad",
            terms: "Aviso Legal",
            cookies: "Cookies"
        }
    }
};
