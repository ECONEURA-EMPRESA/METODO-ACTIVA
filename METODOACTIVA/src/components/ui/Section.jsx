import React from 'react';

const Section = ({ id, className = '', children }) => (
    <section id={id} className={`py-20 md:py-28 relative ${className}`}>
        {children}
    </section>
);

export default Section;
