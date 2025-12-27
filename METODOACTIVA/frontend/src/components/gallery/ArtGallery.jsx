import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const galleryItems = [
    { thumbnail: '/gallery1.webp', fullRes: '/gallery1.png', title: 'Armonía Interior', artist: 'Aurora Del Río' },
    { thumbnail: '/gallery2.webp', fullRes: '/gallery2.png', title: 'Despertar Neuroestético', artist: 'Aurora Del Río' },
    { thumbnail: '/gallery3.webp', fullRes: '/gallery3.png', title: 'Ritmo Vital', artist: 'Aurora Del Río' },
    { thumbnail: '/gallery4.webp', fullRes: '/gallery4.png', title: 'Conexión Profunda', artist: 'Aurora Del Río' },
    { thumbnail: '/gallery5.webp', fullRes: '/gallery5.png', title: 'Belleza Sanadora', artist: 'Aurora Del Río' },
    { thumbnail: '/gallery6.webp', fullRes: '/gallery6.png', title: 'Equilibrio Vital', artist: 'Aurora Del Río' },
];

const ArtGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section
            id="galeria"
            aria-label="Galería de Arte ACTIVA"
            className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden"
        >
            {/* Ambient lighting matching brand colors */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#EC008C]/5 rounded-full blur-[200px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00AEEF]/5 rounded-full blur-[200px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#F7941D]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <span className="text-[#EC008C] text-sm font-bold uppercase tracking-[0.3em] block mb-4">Inspiración Visual</span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900">
                        Galería de Arte <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC008C] via-[#F7941D] to-[#00AEEF]">ACTIVA</span>
                    </h2>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {galleryItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(item)}
                            className={`group cursor-pointer transform transition-all duration-700 hover:scale-[1.03] hover:z-10 ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                                }`}
                        >
                            {/* Ultra Premium Baroque Frame */}
                            <div className="relative">
                                {/* Outer shadow glow */}
                                <div className="absolute -inset-3 bg-gradient-to-br from-[#EC008C]/20 via-transparent to-[#00AEEF]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Main frame with gradient */}
                                <div className="relative p-[6px] bg-gradient-to-br from-[#2c1810] via-[#4a2c20] to-[#1a0f0a] rounded-lg shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-shadow duration-500">

                                    {/* Inner gold accent border */}
                                    <div className="p-[3px] bg-gradient-to-br from-[#d4a574] via-[#c49a6c] to-[#8b6f4e] rounded-[6px]">

                                        {/* Second dark wood layer */}
                                        <div className="p-[4px] bg-gradient-to-br from-[#3d2317] to-[#2a1810] rounded-[4px]">

                                            {/* Inner gold trim */}
                                            <div className="p-[2px] bg-gradient-to-br from-[#c9a961] via-[#dfc07f] to-[#a08040] rounded-[3px]">

                                                {/* Mat/Passepartout */}
                                                <div className="p-4 bg-gradient-to-br from-[#f8f6f0] to-[#ebe8e0] rounded-sm shadow-inner">

                                                    {/* Image container */}
                                                    <div className="relative overflow-hidden rounded-sm shadow-lg">
                                                        <img
                                                            src={item.thumbnail}
                                                            alt={`Obra de arte: ${item.title} por ${item.artist}`}
                                                            loading="lazy"
                                                            decoding="async"
                                                            onLoad={(e) => {
                                                                e.target.style.opacity = '1';
                                                            }}
                                                            className="w-full aspect-square object-cover transition-all duration-1000 group-hover:scale-110 opacity-0"
                                                        />

                                                        {/* Hover overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                                                            <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                                <ZoomIn size={16} /> Ver obra
                                                            </span>
                                                        </div>

                                                        {/* Glass reflection */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none opacity-60"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Frame corner ornaments */}
                                <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-[#c9a961]/60 rounded-tl-sm"></div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-[#c9a961]/60 rounded-tr-sm"></div>
                                <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-[#c9a961]/60 rounded-bl-sm"></div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-[#c9a961]/60 rounded-br-sm"></div>
                            </div>

                            {/* Artwork Label */}
                            <div className="mt-6 text-center">
                                <h3 className="text-gray-800 font-display text-lg font-bold">{item.title}</h3>
                                <p className="text-[#EC008C] text-sm italic">{item.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        aria-label="Cerrar galería"
                        className="absolute top-6 right-6 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full transition-colors z-50"
                    >
                        <X size={32} />
                    </button>

                    <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        {/* Large Ultra Premium Frame */}
                        <div className="relative">
                            {/* Outer glow */}
                            <div className="absolute -inset-8 bg-gradient-to-br from-[#EC008C]/30 via-[#F7941D]/20 to-[#00AEEF]/30 rounded-3xl blur-3xl opacity-60"></div>

                            {/* Frame layers */}
                            <div className="relative p-3 bg-gradient-to-br from-[#2c1810] via-[#4a2c20] to-[#1a0f0a] rounded-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                                <div className="p-2 bg-gradient-to-br from-[#d4a574] via-[#c49a6c] to-[#8b6f4e] rounded-lg">
                                    <div className="p-2 bg-gradient-to-br from-[#3d2317] to-[#2a1810] rounded-md">
                                        <div className="p-1 bg-gradient-to-br from-[#c9a961] via-[#dfc07f] to-[#a08040] rounded">
                                            <div className="p-6 md:p-10 bg-gradient-to-br from-[#f8f6f0] to-[#ebe8e0] rounded-sm shadow-inner">
                                                <img
                                                    src={selectedImage.fullRes}
                                                    alt={selectedImage.title}
                                                    className="w-full rounded shadow-2xl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Label */}
                        <div className="mt-10 text-center">
                            <h3 className="text-white font-display text-3xl font-black mb-2">{selectedImage.title}</h3>
                            <p className="text-[#EC008C] text-lg italic">{selectedImage.artist}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ArtGallery;
