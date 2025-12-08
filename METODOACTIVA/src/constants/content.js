// Este archivo centraliza todos los textos de la página.
// Puedes editar los textos aquí directamente y los cambios se reflejarán en la web.
// NO elimines las comillas "" ni las llaves {}.

import { Music, Brain, Heart, ShieldCheck, Users, Check, Activity, FileText } from 'lucide-react';

export const CONTENT = {
    navbar: {
        brand: "MÉTODO ACTIVA",
        links: {
            about: "Quiénes Somos",
            resources: "Recursos",
            support: "Soporte",
            reviews: "Opiniones"
        },
        cta: "Comprar en Amazon"
    },
    hero: {
        badge: {
            prefix: "CON EL",
            highlight1: "MÉTODO ACTIVA",
            middle: "PUEDES TENER",
            highlight2: "SALUD Y BIENESTAR"
        },
        title: {
            part1: "ACTIVA TU",
            gradient1: "CUERPO",
            gradient2: "MENTE",
            gradient3: "CORAZÓN"
        },
        description: "La **musicoterapia es una herramienta que sana, clínicamente comprobado**. Descubre cómo el Método Activa reduce el estrés, sana la ansiedad y recupera tu vitalidad en solo 21 días.",
        cta_primary: "Comprar en Amazon",
        cta_secondary: "Leer primer capítulo",
        rating: "4.9/5",
        reviews_count: "(+500 valoraciones)",
        shipping: "Envío **RÁPIDO** y **GRATIS** con Prime",
        badges: [
            "Pago Seguro",
            "Devolución Garantizada"
        ],
        book_badge: {
            category: "Categoría",
            rank: "Best Seller"
        }
    },
    benefits: {
        title: "¿Por qué este libro está cambiando vidas?",
        subtitle: "Más que un libro, es una prescripción médica natural. Basado en estudios clínicos de neuroestética.",
        cards: [
            {
                category: "body",
                icon: Activity,
                title: "Reduce el Cortisol",
                desc: "Aprende técnicas de 'arrastre rítmico' para calmar tu sistema nervioso y bajar la hormona del estrés en minutos."
            },
            {
                category: "mind",
                icon: Brain,
                title: "Claridad Mental",
                desc: "Elimina la 'niebla mental' activando nuevas rutas neuronales a través de la estimulación estética y visual."
            },
            {
                category: "heart",
                icon: Heart,
                title: "Sanación Emocional",
                desc: "Desbloquea traumas que las palabras no pueden alcanzar mediante el bypass del sistema límbico."
            },
            {
                category: "body",
                icon: ShieldCheck,
                title: "Refuerza Inmunidad",
                desc: "La reducción del estrés crónico fortalece tu sistema inmunológico de forma natural."
            },
            {
                category: "heart",
                icon: Users,
                title: "Mejora Relaciones",
                desc: "La regulación emocional te permite conectar con los demás desde la calma, no desde la reacción."
            },
            {
                category: "mind",
                icon: Check,
                title: "Plan de 21 Días",
                desc: "Incluye una guía práctica paso a paso para integrar estos hábitos en tu rutina diaria sin esfuerzo."
            }
        ]
    },
    resources: {
        title: "Recursos Gratuitos para Lectores",
        subtitle: "Este libro no solo es teoría. Incluye un kit de herramientas y recursos prácticos validados por estudios clínicos. Regístrate para acceder al área de miembros.",
        cta_download: "Acceder al Kit de Herramientas",
        items: [
            {
                category: "body",
                icon: Music,
                title: "Playlists Terapéuticas",
                desc: "Acceso a listas de música con 'arrastre rítmico' diseñadas para bajar el cortisol en minutos."
            },
            {
                category: "mind",
                icon: Brain,
                title: "Ejercicios Cognitivos",
                desc: "Técnicas de dibujo y visualización para eliminar la 'niebla mental' y activar nuevas rutas neuronales."
            },
            {
                category: "heart",
                icon: Heart,
                title: "Diario Emocional",
                desc: "Plantillas para desbloquear traumas que las palabras no pueden alcanzar mediante el bypass límbico."
            },
            {
                category: "body",
                icon: ShieldCheck,
                title: "Guía Inmunológica",
                desc: "Protocolos para fortalecer tu sistema inmunológico reduciendo el estrés crónico de forma natural."
            },
            {
                category: "heart",
                icon: Users,
                title: "Dinámicas Grupales",
                desc: "Ejercicios para mejorar relaciones conectando desde la calma y la regulación emocional."
            },
            {
                category: "mind",
                icon: FileText,
                title: "Plan de 21 Días",
                desc: "Tu hoja de ruta paso a paso para integrar estos hábitos en tu rutina diaria sin esfuerzo."
            }
        ]
    },
    reviews: {
        title: "Lo que dicen nuestros lectores",
        subtitle: "Personas reales recuperando su bienestar.",
        cta_more: "Ver más opiniones en Amazon",
        items: [
            {
                title: "Un antes y un después en mi ansiedad",
                text: "Había probado todo: meditación, yoga, pastillas... pero nada me funcionaba a largo plazo. Este método es diferente. Entender CÓMO funciona mi cerebro con la música fue la clave. En 21 días siento una paz que no tenía en años.",
                author: "Ana María G.",
                date: "12 de octubre de 2024"
            },
            {
                title: "Científico pero accesible",
                text: "Soy psicólogo y suelo ser escéptico con estos libros de autoayuda, pero este está fundamentado en neurociencia real. Lo estoy recomendando a mis pacientes. Las playlists son oro puro.",
                author: "Dr. Carlos Ruiz",
                date: "5 de noviembre de 2024"
            },
            {
                title: "Regalo perfecto",
                text: "Se lo regalé a mi madre que estaba pasando una depresión leve y le ha cambiado la cara. Los ejercicios son sencillos y el libro es precioso de leer. El diseño te calma solo con verlo.",
                author: "Laura P.",
                date: "20 de septiembre de 2024"
            }
        ]
    },
    footer: {
        copyright: " 2025 Método Activa. Todos los derechos reservados.",
        links: {
            privacy: "Política de Privacidad",
            terms: "Términos de Uso",
            cookies: "Política de Cookies"
        }
    }
};
