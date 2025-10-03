'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params?.slug as string
  const [data, setData] = useState<SiteData>(defaultData)
  const [category, setCategory] = useState<{name: string, slug: string, icon: string} | null>(null)
  const [offers, setOffers] = useState<Array<{title: string, image: string, description: string, affiliateUrl: string}>>([])

  useEffect(() => {
    // Carregar dados do localStorage se existir
    const savedData = localStorage.getItem('siteData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setData(parsedData)
        
        // Encontrar categoria
        const foundCategory = parsedData.categories.find((cat: any) => cat.slug === categorySlug)
        setCategory(foundCategory || null)
        
        // Carregar ofertas da categoria
        setOffers(parsedData.offers[categorySlug] || [])
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    } else {
      // Usar dados padrão
      const foundCategory = defaultData.categories.find(cat => cat.slug === categorySlug)
      setCategory(foundCategory || null)
      setOffers(defaultData.offers[categorySlug] || [])
    }

    // Restaurar posição de scroll se existir
    const savedScrollPosition = sessionStorage.getItem(`scroll-${categorySlug}`)
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition))
      }, 100)
    }

    // Salvar posição de scroll ao sair
    return () => {
      sessionStorage.setItem(`scroll-${categorySlug}`, window.scrollY.toString())
    }
  }, [categorySlug])

  const backgroundImageUrl = "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/cb7cc8ed-bb1f-4ad7-a4d4-160c0088115d.jpg"

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 font-inter">
            Categoria não encontrada
          </h1>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-inter"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors mr-8"
            >
              <ArrowLeft size={20} />
              <span className="font-medium font-inter">Voltar</span>
            </Link>
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 font-inter">
                Meus Descontos Online
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero da Categoria */}
      <section 
        className="relative pt-24 pb-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-inter">
            {category.name}
          </h1>
          <p className="text-xl text-white/90 font-inter">
            Encontre as melhores ofertas em {category.name.toLowerCase()}
          </p>
        </div>
      </section>

      {/* Ofertas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {offers.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">
                  Ofertas Disponíveis
                </h2>
                <p className="text-lg text-gray-600 font-inter">
                  {offers.length} {offers.length === 1 ? 'oferta encontrada' : 'ofertas encontradas'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-3 font-inter">
                        {offer.title}
                      </h3>
                      <p className="text-gray-600 mb-4 font-inter leading-relaxed">
                        {offer.description}
                      </p>
                      <a
                        href={offer.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 w-full justify-center"
                      >
                        Ver Oferta
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">{category.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-inter">
                Em breve, ofertas incríveis!
              </h2>
              <p className="text-lg text-gray-600 mb-8 font-inter">
                Estamos preparando as melhores ofertas de {category.name.toLowerCase()} para você.
              </p>
              <Link
                href="/"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 font-inter"
              >
                Explorar Outras Categorias
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Outras Categorias */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">
              Outras Categorias
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Explore mais ofertas em outras categorias
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.categories
              .filter(cat => cat.slug !== categorySlug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 border border-gray-200"
                >
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <h3 className="font-semibold text-gray-900 font-inter">{cat.name}</h3>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm font-inter mb-2">
            {data.disclaimer}
          </p>
          <p className="text-gray-400 text-sm font-inter">
            © 2024 Meus Descontos Online. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}