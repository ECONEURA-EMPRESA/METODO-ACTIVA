// Analytics & Tracking Configuration
// Centralized tracking IDs and utilities for SEO/Marketing

// Google Analytics 4 Measurement ID (replace with actual)
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Meta Pixel ID (replace with actual)
export const META_PIXEL_ID = 'XXXXXXXXXXXXXXX';

// Conversion Events Configuration
export const TRACKING_EVENTS = {
    // Purchase Intent
    CLICK_AMAZON: 'click_amazon',
    CLICK_BUY_BUTTON: 'click_buy_button',

    // Lead Generation
    LEAD_CAPTURED: 'lead_captured',
    LEAD_MODAL_OPENED: 'lead_modal_opened',
    LEAD_MODAL_CLOSED: 'lead_modal_closed',

    // Engagement
    CHAT_STARTED: 'chat_started',
    CHAT_MESSAGE_SENT: 'chat_message_sent',
    BOOK_READER_OPENED: 'book_reader_opened',
    BOOK_PAGE_TURNED: 'book_page_turned',
    GALLERY_IMAGE_VIEWED: 'gallery_image_viewed',
    VIDEO_PLAYED: 'video_played',

    // Navigation
    SCROLL_DEPTH_25: 'scroll_depth_25',
    SCROLL_DEPTH_50: 'scroll_depth_50',
    SCROLL_DEPTH_75: 'scroll_depth_75',
    SCROLL_DEPTH_100: 'scroll_depth_100',

    // Social
    SOCIAL_CLICK: 'social_click',
    WHATSAPP_CLICK: 'whatsapp_click',
};

// Track event to Google Analytics 4
export const trackGA4Event = (eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
            ...params,
            timestamp: new Date().toISOString(),
        });
    }
};

// Track event to Meta Pixel
export const trackMetaEvent = (eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, params);
    }
};

// Unified tracking function (sends to all platforms)
export const trackEvent = (eventName, params = {}) => {
    // Production-ready: no console.log
    trackGA4Event(eventName, params);
    trackMetaEvent(eventName, params);
};

// E-commerce specific tracking
export const trackAddToCart = (productInfo = {}) => {
    const defaultProduct = {
        currency: 'EUR',
        value: 19.95,
        items: [{
            item_id: 'metodo-activa-libro',
            item_name: 'Método Activa - Musicoterapia',
            item_category: 'Libros',
            price: 19.95,
            quantity: 1,
        }],
    };

    trackGA4Event('add_to_cart', { ...defaultProduct, ...productInfo });
    trackMetaEvent('AddToCart', {
        content_name: 'Método Activa',
        content_type: 'product',
        value: 19.95,
        currency: 'EUR',
    });
};

// Lead tracking
export const trackLead = (leadInfo = {}) => {
    trackGA4Event('generate_lead', leadInfo);
    trackMetaEvent('Lead', leadInfo);
};
