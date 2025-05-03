// src/routes/Home.tsx
import React from 'react';
import ContentHeader from '../components/ContentHeader'; // Adjusted path
import InfoCard from '../components/Infocard';         // Adjusted path

const Home: React.FC = () => {
  return (
    <>
      <ContentHeader
          title="API Documentation"
          description="Use the Protocol API to access contacts, conversations, group messages, and more and seamlessly integrate your product into the workflows of dozens of devoted Protocol users."
      />

       {/* Getting Started Section */}
       <section className="mb-10">
           <h2 className="text-2xl font-semibold text-protocol-gray-dark mb-4">Getting started</h2>
           {/* ... content as before ... */}
           <a href="#" className="inline-flex items-center text-sm font-medium text-protocol-green hover:text-protocol-green/80">
               Get Your API key
               {/* ... icon ... */}
           </a>
       </section>

       {/* Guides Section */}
       <section className="mb-10">
           <h2 className="text-2xl font-semibold text-protocol-gray-dark mb-5">Guides</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard title="Authentication" description="Learn how to authenticate your API requests." linkHref="#"/>
                <InfoCard title="Pagination" description="Understand how to work with paginated responses." linkHref="#"/>
                <InfoCard title="Errors" description="Read about the different types of errors returned." linkHref="#"/>
           </div>
       </section>

        {/* Resources Section */}
       <section className="mb-10">
           <h2 className="text-2xl font-semibold text-protocol-gray-dark mb-5">Resources</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard title="Contacts" description="Manage user contacts." linkHref="#" linkText="View resource"/>
                <InfoCard title="Conversations" description="Access conversation data." linkHref="#" linkText="View resource"/>
           </div>
       </section>
    </>
  );
};

export default Home;