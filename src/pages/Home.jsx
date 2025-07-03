import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  React.useEffect(() => {
    if (!document.getElementById('copilot-chatbot')) {
      const script = document.createElement('script');
      script.id = 'copilot-chatbot';
      script.type = 'application/javascript';
      script.async = true;
      script.referrerPolicy = 'origin';
      script.innerHTML = `
        (function(w,d,s,o,f,js,fjs){
          w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};
          (js=d.createElement(s)),(fjs=d.getElementsByTagName(s)[0]);
          js.id=o;js.src=f;js.async=1;js.referrerPolicy = "origin";
          fjs.parentNode.insertBefore(js,fjs);
        })(window,document,"script","copilot","https://script.copilot.live/v1/copilot.min.js?tkn=cat-5qy8catr");
        copilot("init",{});
      `;
      document.body.appendChild(script);
    }
  }, []);

  const heroSlides = [
    {
      title: "Fresh From Farms to Your Doorstep 🌾",
      description: "Buy fresh, organic, and seasonal produce directly from farmers. Support local. Eat healthy.",
      gradientStyle: {
        background: "linear-gradient(90deg, rgba(42, 123, 155, 1) 7%, rgba(87, 199, 133, 1) 39%, rgba(237, 221, 83, 1) 88%)"
      }
    },
    {
      title: "Seasonal Harvest Delights 🍎",
      description: "Discover the freshest seasonal fruits and vegetables handpicked just for you.",
      gradientStyle: {
        background: "radial-gradient(circle,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 55%, rgba(0, 212, 255, 1) 100%)"
      }
    },
    {
      title: "Organic Goodness Straight from Nature 🌱",
      description: "Pure, chemical-free produce that's good for you and the environment.",
      gradientStyle: {
        background: "linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)"
      }
    }
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: "url('/images/hero-background.jpg')",
          marginTop: "4rem",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white ${currentSlide === index ? 'bg-white w-6 shadow-lg' : 'bg-white/60 hover:bg-white/80'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content Box with Animation */}
        <div 
          key={currentSlide}
          className="p-10 md:p-14 rounded-2xl max-w-2xl shadow-2xl text-white animate-fadeIn transition-all duration-700 relative z-10 backdrop-blur-sm bg-white/10 border border-white/20"
          style={heroSlides[currentSlide].gradientStyle}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg tracking-tight animate-fadeIn">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 font-medium animate-fadeIn">
            {heroSlides[currentSlide].description}
          </p>
          <Link to="/vegetables">
            <button className="bg-white text-green-700 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-50 hover:text-green-900 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-200 animate-fadeIn">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          {[{
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
              </svg>
            ),
            title: "Free Shipping",
            desc: "On all orders above ₹499."
          }, {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
              </svg>
            ),
            title: "Easy To Return",
            desc: "Free 7-day return policy."
          }, {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            ),
            title: "Secure Payment",
            desc: "100% safe transactions."
          }, {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
              </svg>
            ),
            title: "24 hour Support",
            desc: "Friendly customer service."
          }].map((f, i) => (
            <div key={f.title} className="group grid grid-cols-3 bg-white py-5 md:py-8 rounded-xl shadow-md border border-green-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fadeIn">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-lg transition-transform group-hover:scale-110 group-hover:animate-bounce">
                  {f.icon}
                </div>
              </div>
              <div className="col-span-2 text-left pl-2">
                <h2 className="font-bold text-gray-800">{f.title}</h2>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12 relative animate-fadeIn">
          <span className="relative inline-block">
            Explore Categories
            
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {[
            { to: "/vegetables", img: "/images/vegetables.jpg", badge: "New", badgeClass: "from-green-500 to-green-600", title: "Vegetables", desc: "Fresh, locally sourced vegetables for a healthy diet." },
            { to: "/fruits", img: "/images/fruits.jpg", badge: "Popular", badgeClass: "from-pink-500 to-yellow-500", title: "Fruits", desc: "Juicy, sweet, and seasonal fruits delivered fresh." },
            { to: "/dairy", img: "/images/dairy.jpg", badge: "Fresh", badgeClass: "from-yellow-500 to-yellow-700", title: "Dairy", desc: "Pure milk, cheese, and more from local farms." },
            { to: "/grains", img: "/images/grains.jpg", badge: "Healthy", badgeClass: "from-yellow-700 to-green-500", title: "Grains", desc: "Wholesome grains and pulses for your daily needs." }
          ].map(c => (
            <Link to={c.to} className="h-full group" key={c.title}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 animate-fadeIn hover:-translate-y-2">
                <div className="h-48 overflow-hidden relative">
                  <span className={`absolute top-3 right-3 bg-gradient-to-r ${c.badgeClass} text-white px-3 py-1 text-xs font-bold rounded-full shadow-md animate-pulse group-hover:scale-110 transition-transform`}>
                    {c.badge}
                  </span>
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={c.img} 
                    alt={c.title} 
                  />
                </div>
                <div className="p-6 text-center flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{c.title}</h3>
                  <p className="text-gray-600 text-sm">{c.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Discount Banners */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 py-6 my-12 mx-auto max-w-[95%] rounded-2xl shadow-xl animate-fadeIn">
        <div className="flex justify-center overflow-x-auto scroll-smooth no-scrollbar">
          <div className="flex flex-nowrap gap-8 px-4">
            {["ban1", "ban2", "ban3"].map((b, i) => (
              <img key={b} alt={`Discount ${i+1}`} className="h-[80px] w-auto object-contain hover:scale-110 transition-transform rounded-lg shadow animate-pulse" src={`/images/${b}.jpg`} />
            ))}
          </div>
        </div>
      </section>

      {/* Animated Cards Section (Replacing Featured Products) */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-800 relative inline-block animate-fadeIn">
            Why Choose FarmFresh?
            
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Rotating 3D Effect */}
          <div className="perspective-1000 group animate-fadeIn hover:animate-none">
            <div className="relative h-64 transition-all duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              <div className="absolute backface-hidden w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border-2 border-green-100">
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Lightning Fast Delivery</h3>
                <p className="text-gray-600 text-center">Harvested in morning, delivered by evening</p>
              </div>
              <div className="absolute backface-hidden w-full h-full bg-green-600 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center rotate-y-180 text-white">
                <h3 className="text-xl font-bold mb-2">Within 8 Hours</h3>
                <p className="text-center">From farm to your doorstep in record time</p>
                <div className="mt-4 w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-3/4 animate-progress"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Floating Animation */}
          <div className="animate-float h-64 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border-2 border-green-100 animate-fadeIn">
            <div className="relative mb-4">
              <div className="absolute -inset-2 bg-green-400 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">100% Organic Certified</h3>
            <p className="text-gray-600 text-center">No chemicals, no pesticides, just pure nature</p>
            <div className="mt-4 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Card 3 - Gradient Border Animation */}
          <div className="relative h-64 p-1 rounded-xl bg-gradient-to-r from-green-400 via-yellow-400 to-green-600 bg-400% animate-gradient-border animate-fadeIn">
            <div className="h-full w-full bg-white rounded-lg p-6 flex flex-col items-center justify-center">
              <div className="bg-gradient-to-br from-pink-500 to-yellow-500 text-white p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fair Prices</h3>
              <p className="text-gray-600 text-center">Farmers earn more, you pay less - win win!</p>
              <div className="mt-4 flex items-center">
                <span className="text-green-600 font-bold text-lg mr-2">₹199</span>
                <span className="text-gray-400 text-sm line-through">₹299</span>
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">33% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12 animate-fadeIn">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The freshest vegetables I've ever had delivered! FarmFresh has changed how my family eats.",
                author: "Priya Sharma",
                location: "Bangalore",
                rating: 5
              },
              {
                quote: "I love supporting local farmers while getting organic produce at reasonable prices. Win-win!",
                author: "Rahul Patel",
                location: "Mumbai",
                rating: 4
              },
              {
                quote: "Their seasonal fruit boxes are amazing. My kids actually ask for fruits now instead of junk food!",
                author: "Ananya Gupta",
                location: "Delhi",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-300 animate-fadeIn">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-4">Join Our FarmFresh Family</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for seasonal offers, farm updates, and healthy recipes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-md transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Us */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">FarmFresh</h3>
              <p className="text-gray-400 text-sm">
                Connecting farmers directly to consumers with fresh, organic produce since 2020.
              </p>
              <div className="flex gap-4 mt-4">
                {["facebook", "twitter", "instagram"].map(s => (
                  <a href="#" className="text-gray-400 hover:text-green-400 transition transform hover:scale-110" key={s}>
                    {/* SVGs omitted for brevity, use your originals here */}
                    <span className="sr-only">{s}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
              <ul className="space-y-2">
                {["Home","About Us","Products","Farmers","Contact"].map(link=>(
                  <li key={link}><a href="#" className="text-gray-400 hover:text-green-400 transition hover:translate-x-1 text-sm">{link}</a></li>
                ))}
              </ul>
            </div>
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Categories</h3>
              <ul className="space-y-2">
                {["Vegetables","Fruits","Dairy Products","Grains & Cereals","Organic Products"].map(cat=>(
                  <li key={cat}><a href="#" className="text-gray-400 hover:text-green-400 transition hover:translate-x-1 text-sm">{cat}</a></li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
              <address className="text-gray-400 text-sm not-italic">
                <p className="mb-2">123 Farm Road, Green Valley</p>
                <p className="mb-2">Bangalore, India - 560001</p>
                <p className="mb-2">Email: info@farmfresh.com</p>
                <p>Phone: +91 9876543210</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} FarmFresh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Add these CSS animations to your stylesheet */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes progress {
          from { width: 0; }
          to { width: 75%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-grow {
          animation: grow 0.8s ease-out forwards;
        }
        .animate-gradient-border {
          animation: gradient-border 4s ease infinite;
        }
        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Home;