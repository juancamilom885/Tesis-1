// src/components/InfoCard.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom'; // If using router

interface InfoCardProps {
    title: string;
    description: string;
    linkHref: string;
    linkText?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, linkHref, linkText = "Read more"}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200 flex flex-col">
        <h4 className="text-lg font-semibold text-protocol-gray-dark mb-2">{title}</h4>
        <p className="text-sm text-protocol-gray mb-4 flex-grow">{description}</p>
        {/* Replace <a> with <Link to={linkHref}> */}
        <a href={linkHref} className="inline-flex items-center text-sm font-medium text-protocol-green hover:text-protocol-green/80 mt-auto">
            {linkText}
            <ArrowRight className="ml-1 h-4 w-4" />
        </a>
    </div>
  );
};

export default InfoCard;