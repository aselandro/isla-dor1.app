import React, { useState, useEffect } from 'react';

export default function App() {
  const [language, setLanguage] = useState('es');
  const [activePage, setActivePage] = useState('inicio');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [budgetFilter, setBudgetFilter] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: [],
    budget: '',
    people: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newPrefs = checked
        ? [...prev.preferences, value]
        : prev.preferences.filter((pref) => pref !== value);
      return { ...prev, preferences: newPrefs };
    });
  };

  const categories = [
    { id: 1, name: { es: 'Playas y Naturaleza', en: 'Beaches & Nature', de: 'Strände & Natur' }, icon: '🌴' },
    { id: 2, name: { es: 'Gastronomía', en: 'Gastronomy', de: 'Gastronomie' }, icon: '🍽️' },
    { id: 3, name: { es: 'Deportes Acuáticos', en: 'Water Sports', de: 'Wassersport' }, icon: '🏄' },
    { id: 4, name: { es: 'Cultura y Tradición', en: 'Culture & Tradition', de: 'Kultur & Tradition' }, icon: '🏛️' },
    { id: 5, name: { es: 'Noche y Ocio', en: 'Nightlife & Leisure', de: 'Nachtleben & Freizeit' }, icon: '🌃' },
  ];

  const experiences = [
    { id: 1, title: 'Paseo en Kayak por Cala d’Or', category: 1, price: 30, duration: '2h', image: 'https://placehold.co/600x400?text=Kayak+Adventure' },
    { id: 2, title: 'Tour Gastronómico por Restaurantes Locales', category: 2, price: 60, duration: '3h', image: ' https://placehold.co/600x400?text=Gourmet+Tour' },
    { id: 3, title: 'Snorkel en Calas Escondidas', category: 3, price: 45, duration: '2.5h', image: ' https://placehold.co/600x400?text=Snorkel+Adventure' },
    { id: 4, title: 'Visita Guiada a Cuevas y Castillos', category: 4, price: 55, duration: '4h', image: ' https://placehold.co/600x400?text=Historic+Tours' },
    { id: 5, title: 'Cena y Fiesta en Club de Playa', category: 5, price: 90, duration: '5h', image: ' https://placehold.co/600x400?text=Beach+Party' },
  ];

  const testimonials = [
    { id: 1, text: { es: 'Una experiencia inolvidable. Todo perfectamente organizado.', en: 'An unforgettable experience. Everything perfectly organized.', de: 'Eine unvergessliche Erfahrung. Alles perfekt organisiert.' }, author: 'María G.' },
    { id: 2, text: { es: 'La mejor manera de descubrir Mallorca. Recomendado 100%!', en: 'The best way to discover Mallorca. 100% recommended!', de: 'Die beste Art, Mallorca zu entdecken. 100% empfehlenswert!' }, author: 'James R.' },
    { id: 3, text: { es: 'Muy profesional y trato cercano. Repetiré seguro.', en: 'Very professional and friendly service. I’ll definitely come back.', de: 'Sehr professionell und freundliche Betreuung. Komme sicher wieder.' }, author: 'Lars M.' },
  ];

  const translations = {
    slogan: { es: 'Tu viaje, tu ritmo. Vive la Isla d’Or.', en: 'Your trip, your pace. Experience Isla d’Or.', de: 'Deine Reise, dein Tempo. Erlebe die Isla d’Or.' },
    description: { es: 'Isla d\'Or es tu nueva forma de explorar Cala d\'Or...', en: 'Isla d’Or is your new way to explore Cala d’Or...', de: 'Isla d’Or ist deine neue Art, Cala d’Or zu entdecken...' },
    ctaExplore: { es: 'Explora experiencias', en: 'Explore experiences', de: 'Erlebnisse entdecken' },
    ctaCreate: { es: 'Crea tu pack', en: 'Create your pack', de: 'Pack erstellen' },
    ctaReserve: { es: 'Reserva ahora', en: 'Book now', de: 'Jetzt buchen' },
    contactWhatsApp: { es: 'Contacta por WhatsApp', en: 'Contact via WhatsApp', de: 'Über WhatsApp kontaktieren' },
  };

  const filteredExperiences = experiences.filter((exp) => {
    if (selectedCategory && exp.category !== selectedCategory) return false;
    if (budgetFilter === 'low' && exp.price > 50) return false;
    if (budgetFilter === 'medium' && (exp.price <= 50 || exp.price > 150)) return false;
    if (budgetFilter === 'high' && exp.price <= 150) return false;
    return true;
  });

  const handleWhatsAppClick = () => {
    const message = `
Hola Isla d’Or,

Me interesa crear un pack personalizado.

Datos:
Nombre: ${formData.name || 'No especificado'}
Email: ${formData.email || 'No especificado'}
Preferencias: ${formData.preferences.length > 0 ? formData.preferences.join(', ') : 'Sin especificar'}
Presupuesto: ${formData.budget ? formData.budget : 'No definido'}
Número de personas: ${formData.people || 'No especificado'}
Fecha: ${formData.date || 'No definida'}

Espero respuesta pronto.
`.trim();

    const whatsappUrl = ` https://wa.me/34123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Carrusel automático
  const carouselImages = [
    ' https://placehold.co/800x500?text=Relax+in+Paradise',
    ' https://placehold.co/800x500?text=Kayaking+on+Crystal+Waters',
    ' https://placehold.co/800x500?text=Sunset+in+Cala+d%27Or',
    ' https://placehold.co/800x500?text=Beach+Party+Vibes',
    ' https://placehold.co/800x500?text=Explore+Hidden+Coves',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-900">Isla d’Or</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => setActivePage('inicio')} className={`text-sm font-medium ${activePage === 'inicio' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'}`}>
              Inicio
            </button>
            <button onClick={() => setActivePage('experiencias')} className={`text-sm font-medium ${activePage === 'experiencias' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'}`}>
              Experiencias
            </button>
            <button onClick={() => setActivePage('crear-pack')} className={`text-sm font-medium ${activePage === 'crear-pack' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'}`}>
              Crear Pack
            </button>
            <button onClick={() => setActivePage('contacto')} className={`text-sm font-medium ${activePage === 'contacto' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'}`}>
              Contacto
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <select onChange={(e) => setLanguage(e.target.value)} className="text-sm border border-gray-300 rounded px-2 py-1">
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
            <button onClick={handleWhatsAppClick} className="bg-green-500 text-white px-4 py-2 rounded-full text-sm flex items-center space-x-1 hover:bg-green-600 transition">
              <span>WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Botón de volver al inicio */}
      {activePage !== 'inicio' && (
        <div className="container mx-auto px-4 mt-4">
          <button onClick={() => setActivePage('inicio')} className="text-blue-900 underline hover:text-blue-700">
            ← Volver al inicio
          </button>
        </div>
      )}

      {/* Hero Section */}
      {activePage === 'inicio' && (
        <section className="relative bg-gradient-to-r from-blue-50 to-teal-50 py-20 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">{translations.slogan[language]}</h1>
              <p className="mt-4 text-lg text-gray-600">{translations.description[language]}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => setActivePage('experiencias')}
                  className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition text-lg font-medium"
                >
                  {translations.ctaExplore[language]}
                </button>
                <button
                  onClick={() => setActivePage('crear-pack')}
                  className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition text-lg font-medium"
                >
                  {translations.ctaCreate[language]}
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <img src={carouselImages[currentImageIndex]} alt="Isla d'Or" className="rounded-lg shadow-lg w-full h-auto object-cover" />
              <button onClick={goToPrevious} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"><</button>
              <button onClick={goToNext} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">></button>
            </div>
          </div>
        </section>
      )}

      {/* Categorías Destacadas */}
      {activePage === 'inicio' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Categorías Destacadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActivePage('experiencias');
                  }}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <span className="text-center text-gray-700 font-medium">{cat.name[language]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filtro por Presupuesto */}
      {activePage === 'inicio' && (
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Filtrar por Presupuesto</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setBudgetFilter('low')}
                className={`px-6 py-3 rounded-lg border-2 border-blue-900 text-blue-900 font-medium hover:bg-blue-100 transition ${budgetFilter === 'low' ? 'bg-blue-100' : ''}`}
              >
                0-50€
              </button>
              <button
                onClick={() => setBudgetFilter('medium')}
                className={`px-6 py-3 rounded-lg border-2 border-blue-900 text-blue-900 font-medium hover:bg-blue-100 transition ${budgetFilter === 'medium' ? 'bg-blue-100' : ''}`}
              >
                50-150€
              </button>
              <button
                onClick={() => setBudgetFilter('high')}
                className={`px-6 py-3 rounded-lg border-2 border-blue-900 text-blue-900 font-medium hover:bg-blue-100 transition ${budgetFilter === 'high' ? 'bg-blue-100' : ''}`}
              >
                +150€
              </button>
            </div>
            <div className="mt-10 text-center">
              <button
                onClick={() => setActivePage('experiencias')}
                className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition text-lg font-medium"
              >
                Ver Experiencias
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonios */}
      {activePage === 'inicio' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Opiniones de Nuestros Viajeros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="p-6 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-gray-600 italic">"{t.text[language]}"</p>
                  <p className="mt-4 font-medium text-gray-800">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Página de Experiencias */}
      {activePage === 'experiencias' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Catálogo de Experiencias</h2>
            <div className="mb-8 flex justify-center flex-wrap gap-2 md:gap-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded border ${!selectedCategory ? 'bg-blue-100 border-blue-900' : 'border-gray-300'}`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded border ${selectedCategory === cat.id ? 'bg-blue-100 border-blue-900' : 'border-gray-300'}`}
                >
                  {cat.name[language]}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.map((exp) => (
                <div key={exp.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition">
                  <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-blue-900">{exp.title}</h3>
                    <p className="text-gray-600 mt-2">Duración: {exp.duration}</p>
                    <p className="text-gray-600">Precio: {exp.price}€</p>
                    <button
                      onClick={handleWhatsAppClick}
                      className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                    >
                      {translations.ctaReserve[language]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Crear Pack */}
      {activePage === 'crear-pack' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Crea Tu Pack Personalizado</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Preferencias</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        value={cat.name[language]}
                        checked={formData.preferences.includes(cat.name[language])}
                        onChange={handleCheckboxChange}
                        className="rounded text-blue-600"
                      />
                      <span>{cat.name[language]}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Presupuesto Total</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2">
                  <option value="">Seleccionar</option>
                  <option value="low">Bajo (0-50€)</option>
                  <option value="medium">Medio (50-150€)</option>
                  <option value="high">Alto (+150€)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Número de Personas</label>
                <input type="number" name="people" value={formData.people} onChange={handleChange} min="1" className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Fecha de Visita</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
              </div>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition"
              >
                Enviar y Reservar por WhatsApp
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Contacto */}
      {activePage === 'contacto' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                    <input type="text" required className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="email" required className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Asunto</label>
                    <input type="text" required className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Mensaje</label>
                    <textarea rows="5" required className="w-full border border-gray-300 rounded px-4 py-2"></textarea>
                  </div>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition"
                  >
                    Enviar y Contactar por WhatsApp
                  </button>
                </form>
              </div>
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Dirección</h3>
                  <p className="text-gray-600">Cala d’Or, Mallorca, España</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Email</h3>
                  <p className="text-gray-600">info@isladOr.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Teléfono</h3>
                  <p className="text-gray-600">+34 123 456 789</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-lg font-bold text-blue-900">Isla d’Or</span>
              <p className="text-gray-600 text-sm mt-1">Tu viaje, tu ritmo. Vive la Isla d’Or.</p>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setActivePage('inicio')} className="text-gray-600 hover:text-blue-900">Inicio</button>
              <button onClick={() => setActivePage('experiencias')} className="text-gray-600 hover:text-blue-900">Experiencias</button>
              <button onClick={() => setActivePage('crear-pack')} className="text-gray-600 hover:text-blue-900">Crear Pack</button>
              <button onClick={() => setActivePage('contacto')} className="text-gray-600 hover:text-blue-900">Contacto</button>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setLanguage('es')} className="text-gray-600 hover:text-blue-900">ES</button>
              <button onClick={() => setLanguage('en')} className="text-gray-600 hover:text-blue-900">EN</button>
