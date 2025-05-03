// src/components/ContentHeader.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button'; // Use the reusable button

interface ContentHeaderProps {
    title: string;
    description: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ title, description }) => {
  return (
    // Adjusted gradient and padding/margin based on Layout structure
    <div className="mb-8 pb-8 border-b border-gray-200 bg-gradient-to-b from-protocol-green-light/50 via-protocol-green-light/20 to-transparent">
      <h1 className="text-3xl font-bold text-protocol-gray-dark mb-3">{title}</h1>
      <p className="text-lg text-protocol-gray mb-6 max-w-3xl">{description}</p>
      <div className="flex flex-wrap gap-4"> {/* Use gap for spacing */}
         <Button variant="primary" rightIcon={<ArrowRight />}>
            Quickstart
         </Button>
          <Button variant="secondary">
            Explore SDKs
         </Button>
      </div>
    </div>
  );
};

export default ContentHeader;