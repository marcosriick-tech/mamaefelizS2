'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ExternalLink, Star, ShoppingCart } from 'lucide-react'
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

// Configurações visuais por marketplace (inspiração neutra)
const marketplaceStyles: Record<string, {
  colors: { primary: string, secondary: string, accent: string },
  description: string
}> = {
  'amazon': {
    colors: { primary: 'from-orange-500 to-yellow-500', secondary: 'bg-orange-50', accent: 'text-orange-600' },
    description: 'Milhões de produtos com entrega rápida e segura'
  },
  'mercado-livre': {
    colors: { primary: 'from-yellow-400 to-yellow-600', secondary: 'bg-yellow-50', accent: 'text-yellow-600' },
    description: 'O maior marketplace da América Latina'
  },
  'magazine-luiza': {
    colors: { primary: 'from-blue-500 to-blue-700', secondary: 'bg-blue-50', accent: 'text-blue-600' },
    description: 'Tecnologia, casa, moda e muito mais'
  },
  'americanas': {
    colors: { primary: 'from-red-500 to-red-700', secondary: 'bg-red-50', accent: 'text-red-600' },
    description: 'Tudo o que você precisa em um só lugar'
  },
  'shopee': {
    colors: { primary: 'from-orange-400 to-red-500', secondary: 'bg-orange-50', accent: 'text-orange-600' },
    description: 'Compras online com os melhores preços'
  },
  'aliexpress': {
    colors: { primary: 'from-red-500 to-orange-500', secondary: 'bg-red-50', accent: 'text-red-600' },
    description: 'Produtos direto da China com ótimos preços'
  }
}

export default function MarketplacePage() {
  const params = useParams()
  const marketplaceName = params?.name as string
  const [data, setData] = useState<SiteData>(defaultData)
  const [marketplace, setMarketplace] = useState<{name: string, affiliateUrl: string, icon: string} | null>(null)
  const [style, setStyle] = useState(marketplaceStyles['amazon'])

  useEffect(() => {
    // Carregar dados do localStorage se existir
    const savedData = localStorage.getItem('siteData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setData(parsedData)
        
        // Encontrar marketplace
        const foundMarketplace = parsedData.marketplaces.find((mp: any) => 
          mp.name.toLowerCase().replace(/\s+/g, '-') === marketplaceName
        )
        setMarketplace(foundMarketplace || null)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    } else {
      // Usar dados padrão
      const foundMarketplace = defaultData.marketplaces.find(mp => 
        mp.name.toLowerCase().replace(/\s+/g, '-') === marketplaceName
      )
      setMarketplace(foundMarketplace || null)
    }

    // Definir estilo baseado no nome do marketplace
    const styleKey = marketplaceName?.toLowerCase().replace(/\s+/g, '-') || 'amazon'
    setStyle(marketplaceStyles[styleKey] || marketplaceStyles['amazon'])

    // Restaurar posição de scroll se existir
    const savedScrollPosition = sessionStorage.getItem(`scroll-marketplace-${marketplaceName}`)
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition))
      }, 100)
    }

    // Salvar posição de scroll ao sair
    return () => {
      sessionStorage.setItem(`scroll-marketplace-${marketplaceName}`, window.scrollY.toString())
    }
  }, [marketplaceName])

  const backgroundImageUrl = "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/cb7cc8ed-bb1f-4ad7-a4d4-160c0088115d.jpg"

  if (!marketplace) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 font-inter">
            Marketplace não encontrado
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

      {/* Hero do Marketplace */}
      <section 
        className="relative pt-24 pb-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">{marketplace.icon}</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-inter">
            {marketplace.name}
          </h1>
          <p className="text-xl text-white/90 mb-8 font-inter">
            {style.description}
          </p>
          <a
            href={marketplace.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gradient-to-r ${style.colors.primary} hover:scale-105 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform shadow-2xl inline-flex items-center gap-3`}
          >
            <ShoppingCart size={24} />
            Ir para {marketplace.name}
            <ExternalLink size={20} />
          </a>
        </div>
      </section>

      {/* Vitrine de Produtos */}
      <section className={`py-16 ${style.colors.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">
              Ofertas Especiais
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Produtos selecionados com os melhores descontos
            </p>
          </div>

          {/* Produtos em Destaque */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Produto em Destaque 1",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
                originalPrice: "R$ 299,99",
                salePrice: "R$ 199,99",
                discount: "33% OFF",
                rating: 4.5,
                reviews: 128
              },
              {
                title: "Produto em Destaque 2", 
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                originalPrice: "R$ 149,99",
                salePrice: "R$ 99,99",
                discount: "33% OFF",
                rating: 4.8,
                reviews: 89
              },
              {
                title: "Produto em Destaque 3",
                image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
                originalPrice: "R$ 89,99",
                salePrice: "R$ 59,99",
                discount: "33% OFF",
                rating: 4.3,
                reviews: 67
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 font-inter">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2 font-inter">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600 font-inter">
                        {product.salePrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through font-inter">
                        {product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <a
                    href={marketplace.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-r ${style.colors.primary} hover:scale-105 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform inline-flex items-center gap-2 w-full justify-center`}
                  >
                    <ShoppingCart size={18} />
                    Comprar Agora
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Principal */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inter">
              Explore Milhares de Produtos
            </h3>
            <p className="text-lg text-gray-600 mb-6 font-inter">
              Acesse {marketplace.name} e descubra ofertas incríveis em todas as categorias
            </p>
            <a
              href={marketplace.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-r ${style.colors.primary} hover:scale-105 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform shadow-2xl inline-flex items-center gap-3`}
            >
              <ShoppingCart size={24} />
              Ver Todas as Ofertas
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Outros Marketplaces */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">
              Outros Marketplaces
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Compare preços e encontre as melhores ofertas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.marketplaces
              .filter(mp => mp.name !== marketplace.name)
              .map((mp) => (
                <Link
                  key={mp.name}
                  href={`/marketplace/${mp.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 border border-gray-200"
                >
                  <div className="text-4xl mb-3">{mp.icon}</div>
                  <h3 className="font-semibold text-gray-900 font-inter">{mp.name}</h3>
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