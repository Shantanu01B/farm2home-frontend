import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";

const Home = () => {
  // Inject chatbot script on mount
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

  // Hero slides with your custom gradients
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

        {/* Content Box with Custom Gradient */}
        <div 
          className="p-10 md:p-14 rounded-2xl max-w-2xl shadow-2xl text-white animate-fadeIn"
          style={heroSlides[currentSlide].gradientStyle}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 font-medium">
            {heroSlides[currentSlide].description}
          </p>
          <Link to="/vegetables">
            <button className="bg-white text-green-700 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-50 hover:text-green-900 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          {/* Feature 1 */}
          <div className="grid grid-cols-3 bg-white py-5 md:py-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-green-100">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
              </div>
            </div>
            <div className="col-span-2 text-left pl-2">
              <h2 className="font-bold text-gray-800">Free Shipping</h2>
              <p className="text-sm text-gray-600">On all orders above ₹499.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-3 bg-white py-5 md:py-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-green-100">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
                </svg>
              </div>
            </div>
            <div className="col-span-2 text-left pl-2">
              <h2 className="font-bold text-gray-800">Easy To Return</h2>
              <p className="text-sm text-gray-600">Free 7-day return policy.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-3 bg-white py-5 md:py-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-green-100">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
            </div>
            <div className="col-span-2 text-left pl-2">
              <h2 className="font-bold text-gray-800">Secure Payment</h2>
              <p className="text-sm text-gray-600">100% safe transactions.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="grid grid-cols-3 bg-white py-5 md:py-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-green-100">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
            </div>
            <div className="col-span-2 text-left pl-2">
              <h2 className="font-bold text-gray-800">24 hour Support</h2>
              <p className="text-sm text-gray-600">Friendly customer service.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12 relative">
          <span className="relative inline-block">
            Explore Categories
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1  rounded-full opacity-60"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Vegetable Card */}
          <Link to="/vegetables" className="h-full group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                  New
                </span>
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="/images/vegetables.jpg" 
                  alt="Vegetables" 
                />
              </div>
              <div className="p-6 text-center flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Vegetables</h3>
                <p className="text-gray-600 text-sm">Fresh, locally sourced vegetables for a healthy diet.</p>
              </div>
            </div>
          </Link>
          {/* Fruit Card */}
          <Link to="/fruits" className="h-full group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                  Popular
                </span>
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="/images/fruits.jpg" 
                  alt="Fruits" 
                />
              </div>
              <div className="p-6 text-center flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Fruits</h3>
                <p className="text-gray-600 text-sm">Juicy, sweet, and seasonal fruits delivered fresh.</p>
              </div>
            </div>
          </Link>
          {/* Dairy Card */}
          <Link to="/dairy" className="h-full group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                  Fresh
                </span>
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="/images/dairy.jpg" 
                  alt="Dairy" 
                />
              </div>
              <div className="p-6 text-center flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Dairy</h3>
                <p className="text-gray-600 text-sm">Pure milk, cheese, and more from local farms.</p>
              </div>
            </div>
          </Link>
          {/* Grains Card */}
          <Link to="/grains" className="h-full group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-700 to-green-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                  Healthy
                </span>
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="/images/grains.jpg" 
                  alt="Grains" 
                />
              </div>
              <div className="p-6 text-center flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Grains</h3>
                <p className="text-gray-600 text-sm">Wholesome grains and pulses for your daily needs.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Discount Banners */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 py-6 my-12 mx-auto max-w-[95%] rounded-2xl shadow-xl">
        <div className="flex justify-center overflow-x-auto scroll-smooth no-scrollbar">
          <div className="flex flex-nowrap gap-8 px-4">
            <img alt="Discount 1" className="h-[80px] w-auto object-contain hover:scale-105 transition-transform rounded-lg shadow" src="/images/ban1.jpg" />
            <img alt="Discount 2" className="h-[80px] w-auto object-contain hover:scale-105 transition-transform rounded-lg shadow" src="/images/ban2.jpg" />
            <img alt="Discount 3" className="h-[80px] w-auto object-contain hover:scale-105 transition-transform rounded-lg shadow" src="/images/ban3.jpg" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductList />

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Us */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">FarmFresh</h3>
              <p className="text-gray-400 text-sm">
                Connecting farmers directly to consumers with fresh, organic produce since 2020.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-green-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Farmers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/vegetables" className="text-gray-400 hover:text-green-400 transition text-sm">Vegetables</Link></li>
                <li><Link to="/fruits" className="text-gray-400 hover:text-green-400 transition text-sm">Fruits</Link></li>
                <li><Link to="/dairy" className="text-gray-400 hover:text-green-400 transition text-sm">Dairy Products</Link></li>
                <li><Link to="/grains" className="text-gray-400 hover:text-green-400 transition text-sm">Grains & Cereals</Link></li>
                <li><Link to="/vegetables" className="text-gray-400 hover:text-green-400 transition text-sm">Organic Products</Link></li>
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

    </div>
  );
};

export default Home;
