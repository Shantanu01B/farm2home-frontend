import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <div className="bg-green-700 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Our Farm Story</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Connecting local farmers directly to your table since 2020
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Why Farm2Home?</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Fresh From Farm",
              description: "Harvested at peak ripeness and delivered straight to your doorstep within 24 hours",
              icon: "🌱"
            },
            {
              title: "Direct From Farmers",
              description: "Cutting out middlemen to ensure farmers earn fair prices and you get the best deals",
              icon: "🚜"
            },
            {
              title: "Sustainable Practices",
              description: "Organic and eco-friendly farming methods that respect our planet",
              icon: "🌎"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-green-100 text-center">
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-xl font-semibold text-green-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-green-800 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
          <p className="mb-6 text-green-100">
            Farm2Home began with a simple idea: connect local farmers directly with consumers. 
            What started as a small farmers' collective has grown into a movement supporting 
            over 200 local farms across the region.
          </p>
          <p className="text-green-100">
            We're proud to have delivered over 50,000 fresh produce boxes while maintaining 
            our commitment to fair prices and sustainable agriculture.
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Meet Our Farmers</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Patel", role: "Organic Vegetable Farmer" },
              { name: "Priya Sharma", role: "Fruit Orchard Owner" },
              { name: "Vikram Singh", role: "Dairy Farmer" }
            ].map((person, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="h-40 w-40 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-4xl">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-green-800">{person.name}</h3>
                <p className="text-green-600">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;