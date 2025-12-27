import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { AmazonReviewCard } from '../ui/Cards';
import { CONTENT } from '../../constants/content';

const Reviews = ({ onOpenAmazon }) => {
    return (
        <Section id="reviews" className="bg-white rounded-[3rem] my-8 mx-4 md:mx-8 shadow-xl border border-white/50 relative z-20">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{CONTENT.reviews.title}</h2>
                        <div className="flex items-center gap-2"><div className="flex text-[#FF9900]"><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /></div><span className="text-gray-600 font-medium">{CONTENT.reviews.subtitle}</span></div>
                    </div>
                    <Button variant="ghost" onClick={onOpenAmazon} className="text-[#00AEEF] hover:text-[#008CCF] mt-4 md:mt-0">{CONTENT.reviews.cta_more} <ArrowRight size={16} /></Button>
                </div>
                <div className="grid md:grid-cols-3 gap-6 perspective-[1000px]">
                    {CONTENT.reviews.items.map((review, idx) => (
                        <div key={idx} className={`depth-card bg-mesh-premium p-6 rounded-2xl h-full border border-gray-100 ${idx === 1 ? 'md:translate-y-4' : ''}`}>
                            <AmazonReviewCard title={review.title} author={review.author} date={review.date} text={review.text} />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Reviews;
