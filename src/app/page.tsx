'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Star, Heart, Baby, Gamepad2, Sparkles, Instagram, Youtube, MessageCircle, Mail, Phone, ExternalLink, Menu, X } from 'lucide-react'
import Link from 'next/link'

interface SiteData {
  hero: {
    title: string
    subtitle: string
    ctaText: string
  }
  marketplaces: Array<{
    name: string
    affiliateUrl: string
    icon: string
  }>
  categories: Array<{
    name: string
    slug: string
    icon: string
  }>
  offers: Record<string, Array<{
    title: string
    image: string
    description: string
    affiliateUrl: string
  }>>
  social: {
    instagram: string
    tiktok: string
    youtube: string
  }
  disclaimer: string
}

const defaultData: SiteData = {
  hero: {
    title: "Todos os Melhores Descontos em um só Lugar",
    subtitle: "Acesso rápido a Mercado Livre, Amazon, Magazine Luiza, Americanas, Shopee e AliExpress",
    ctaText: "Aproveitar Agora"
  },
  marketplaces: [
    { name: "Amazon", affiliateUrl: "https://amazon.com.br", icon: "🛒" },
    { name: "Mercado Livre", affiliateUrl: "https://mercadolivre.com.br", icon: "🛍️" },
    { name: "Magazine Luiza", affiliateUrl: "https://magazineluiza.com.br", icon: "🏪" },
    { name: "Americanas", affiliateUrl: "https://americanas.com.br", icon: "🛒" },
    { name: "Shopee", affiliateUrl: "https://shopee.com.br", icon: "🛍️" },
    { name: "AliExpress", affiliateUrl: "https://aliexpress.com", icon: "📦" }
  ],
  categories: [
    { name: "Tecnologia", slug: "tecnologia", icon: "💻" },
    { name: "Casa & Jardim", slug: "casa-jardim", icon: "🏠" },
    { name: "Moda", slug: "moda", icon: "👗" },
    { name: "Bebês", slug: "bebes", icon: "🍼" },
    { name: "Games", slug: "games", icon: "🎮" },
    { name: "Beleza", slug: "beleza", icon: "💄" }
  ],
  offers: {
    "tecnologia": [
      {
        title: "Smartphone Samsung Galaxy",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        description: "Últimos modelos com desconto especial",
        affiliateUrl: "https://exemplo.com/smartphone"
      }
    ],
    "casa-jardim": [],
    "moda": [],
    "bebes": [],
    "games": [],
    "beleza": []
  },
  social: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com"
  },
  disclaimer: "Este site contém links de afiliados. Ao comprar por eles, você apoia nosso trabalho sem pagar nada a mais."
}

export default function HomePage() {
  const [data, setData] = useState<SiteData>(defaultData)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    // Carregar dados do localStorage se existir
    const savedData = localStorage.getItem('siteData')
    if (savedData) {
      try {
        setData(JSON.parse(savedData))
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    // Configurar scroll restoration
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      
      // Restaurar posição de scroll salva
      const savedScrollPosition = sessionStorage.getItem('scrollPosition')
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition))
        }, 100)
      }

      // Salvar posição de scroll antes de navegar
      const saveScrollPosition = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString())
      }

      // Salvar posição ao clicar em links internos
      const links = document.querySelectorAll('a[href^="/"]')
      links.forEach(link => {
        link.addEventListener('click', saveScrollPosition)
      })

      // Salvar posição ao usar botão voltar
      window.addEventListener('beforeunload', saveScrollPosition)
      window.addEventListener('pagehide', saveScrollPosition)

      return () => {
        window.removeEventListener('beforeunload', saveScrollPosition)
        window.removeEventListener('pagehide', saveScrollPosition)
        links.forEach(link => {
          link.removeEventListener('click', saveScrollPosition)
        })
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simular envio (integrar com FormSubmit ou Formspree)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitMessage('Mensagem enviada com sucesso!')
      setContactForm({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitMessage('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(''), 5000)
    }
  }

  const backgroundImageUrl = "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/cb7cc8ed-bb1f-4ad7-a4d4-160c0088115d.jpg"

  // Cores femininas chamativas para os marketplaces
  const marketplaceColors = [
    'from-pink-400 via-rose-400 to-red-400', // Amazon - Rosa vibrante
    'from-purple-400 via-pink-400 to-fuchsia-400', // Mercado Livre - Roxo/Rosa
    'from-rose-400 via-pink-400 to-purple-400', // Magazine Luiza - Rosa/Roxo
    'from-fuchsia-400 via-purple-400 to-pink-400', // Americanas - Fúcsia/Roxo
    'from-pink-500 via-rose-500 to-orange-400', // Shopee - Rosa/Laranja
    'from-purple-500 via-fuchsia-500 to-pink-500' // AliExpress - Roxo/Fúcsia
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 font-inter">
                Meus Descontos Online
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('ofertas')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Ofertas
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contato
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('inicio')}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium w-full text-left"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection('ofertas')}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium w-full text-left"
                >
                  Ofertas
                </button>
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium w-full text-left"
                >
                  Sobre
                </button>
                <button
                  onClick={() => scrollToSection('contato')}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium w-full text-left"
                >
                  Contato
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="inicio"
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-inter leading-tight">
            {data.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 font-inter leading-relaxed">
            {data.hero.subtitle}
          </p>
          <button
            onClick={() => scrollToSection('ofertas')}
            className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            {data.hero.ctaText}
          </button>
        </div>
      </section>

      {/* Ofertas Section */}
      <section 
        id="ofertas" 
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-inter">
              Ofertas Especiais
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Encontre os melhores descontos organizados por categoria
            </p>
          </div>

          {/* Categorias */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
            {data.categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                onClick={() => {
                  sessionStorage.setItem('scrollPosition', window.scrollY.toString())
                }}
                className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 font-inter text-sm">{category.name}</h3>
              </Link>
            ))}
          </div>

          {/* Marketplaces - MAIOR E COM CORES FEMININAS */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-10 font-inter">
              Principais Marketplaces
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {data.marketplaces.map((marketplace, index) => (
                <Link
                  key={marketplace.name}
                  href={`/marketplace/${marketplace.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
                  }}
                  className={`bg-gradient-to-br ${marketplaceColors[index]} rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20 group relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4 filter drop-shadow-lg">{marketplace.icon}</div>
                    <h4 className="font-bold text-white font-inter text-lg group-hover:text-white/90 transition-colors drop-shadow-md">
                      {marketplace.name}
                    </h4>
                    <div className="mt-3 inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Ofertas em Destaque - MENOR */}
          {data.offers.tecnologia && data.offers.tecnologia.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center font-inter">
                Ofertas em Destaque
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.offers.tecnologia.slice(0, 3).map((offer, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-base text-gray-900 mb-2 font-inter">
                        {offer.title}
                      </h4>
                      <p className="text-gray-600 mb-3 font-inter text-sm">
                        {offer.description}
                      </p>
                      <a
                        href={offer.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 text-sm"
                      >
                        Ver Oferta
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sobre Section */}
      <section 
        id="sobre" 
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 font-inter">
            Sobre Nós
          </h2>
          <p className="text-xl text-white/90 leading-relaxed font-inter">
            Organizamos as melhores promoções de forma prática e segura. Nossa missão é 
            facilitar o acesso aos melhores descontos dos principais marketplaces, 
            economizando seu tempo e dinheiro.
          </p>
        </div>
      </section>

      {/* Contato Section */}
      <section 
        id="contato" 
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-inter">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 font-inter">
              Tem alguma dúvida ou sugestão? Fale conosco!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-inter"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-inter"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-inter resize-none"
                  placeholder="Sua mensagem..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-inter"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>

            {submitMessage && (
              <div className={`mt-4 p-4 rounded-lg text-center font-inter ${
                submitMessage.includes('sucesso') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {submitMessage}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-inter">Meus Descontos Online</h3>
              <p className="text-gray-300 font-inter">
                Sua fonte confiável para os melhores descontos e promoções.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 font-inter">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={data.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a
                  href={data.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 font-inter">Links Rápidos</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection('ofertas')}
                  className="block text-gray-300 hover:text-white transition-colors font-inter"
                >
                  Ofertas
                </button>
                <Link
                  href="/admin"
                  className="block text-gray-300 hover:text-white transition-colors font-inter"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm font-inter mb-2">
              {data.disclaimer}
            </p>
            <p className="text-gray-400 text-sm font-inter">
              © 2024 Meus Descontos Online. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}