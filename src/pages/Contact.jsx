import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <div className="bg-green-700 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-xl">
          We'd love to hear from you
        </p>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Farmer Partnership</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-green-800">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 text-xl">📍</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Location</h3>
                  <p className="text-gray-600">
                    123 Farm Road, Agricultural District<br />
                    Bangalore, Karnataka 560001
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 text-xl">📞</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Phone Numbers</h3>
                  <p className="text-gray-600">
                    Customer Support: +91 80 1234 5678<br />
                    Farmer Inquiries: +91 80 9876 5432
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Email Addresses</h3>
                  <p className="text-gray-600">
                    General: info@farm2home.com<br />
                    Support: support@farm2home.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 text-xl">⏰</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Working Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 8:00 AM - 8:00 PM<br />
                    Sunday: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Find Us on Map</h3>
              <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-500">
                [Map Placeholder - Add Google Maps Embed Code Here]
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-green-800 text-white rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I place an order?",
                answer: "You can order directly through our website. Select your products, choose delivery time, and checkout securely."
              },
              {
                question: "What areas do you deliver to?",
                answer: "We currently serve Bangalore and surrounding areas within 50km."
              },
              {
                question: "How can I become a partner farmer?",
                answer: "Please contact our farmer support team or fill out the partnership form."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit/debit cards, UPI, net banking, and cash on delivery."
              }
            ].map((item, index) => (
              <div key={index} className="bg-green-700/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-green-100">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;