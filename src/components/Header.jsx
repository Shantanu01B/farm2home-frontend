// src/components/Header.jsx
export default function Header() {
    return (
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Farmers Market</h1>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Login</a>
          </nav>
        </div>
      </header>
    );
  }
  