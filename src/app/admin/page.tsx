'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Save, Download, Upload, Plus, Trash2, Edit3, ExternalLink } from 'lucide-react'

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
    "tecnologia": [],
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState<SiteData>(defaultData)
  const [activeTab, setActiveTab] = useState('hero')
  const [message, setMessage] = useState('')
  const [editingOffer, setEditingOffer] = useState<{category: string, index: number} | null>(null)

  useEffect(() => {
    // Verificar se já está autenticado
    const isAuth = localStorage.getItem('adminAuth')
    if (isAuth === 'true') {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const loadData = () => {
    const savedData = localStorage.getItem('siteData')
    if (savedData) {
      try {
        setData(JSON.parse(savedData))
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Verificar credenciais (usar variáveis de ambiente em produção)
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@exemplo.com'
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    
    if (loginForm.email === adminEmail && loginForm.password === adminPassword) {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      loadData()
      setMessage('Login realizado com sucesso!')
    } else {
      setMessage('Credenciais inválidas!')
    }
    
    setTimeout(() => setMessage(''), 3000)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    setLoginForm({ email: '', password: '' })
  }

  const saveData = () => {
    localStorage.setItem('siteData', JSON.stringify(data))
    setMessage('Dados salvos com sucesso!')
    setTimeout(() => setMessage(''), 3000)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'site-data.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target?.result as string)
          setData(importedData)
          setMessage('Dados importados com sucesso!')
        } catch (error) {
          setMessage('Erro ao importar dados!')
        }
        setTimeout(() => setMessage(''), 3000)
      }
      reader.readAsText(file)
    }
  }

  const addMarketplace = () => {
    setData(prev => ({
      ...prev,
      marketplaces: [...prev.marketplaces, { name: '', affiliateUrl: '', icon: '🛒' }]
    }))
  }

  const removeMarketplace = (index: number) => {
    setData(prev => ({
      ...prev,
      marketplaces: prev.marketplaces.filter((_, i) => i !== index)
    }))
  }

  const addCategory = () => {
    setData(prev => ({
      ...prev,
      categories: [...prev.categories, { name: '', slug: '', icon: '📦' }]
    }))
  }

  const removeCategory = (index: number) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }))
  }

  const addOffer = (category: string) => {
    setData(prev => ({
      ...prev,
      offers: {
        ...prev.offers,
        [category]: [
          ...prev.offers[category],
          { title: '', image: '', description: '', affiliateUrl: '' }
        ]
      }
    }))
  }

  const removeOffer = (category: string, index: number) => {
    setData(prev => ({
      ...prev,
      offers: {
        ...prev.offers,
        [category]: prev.offers[category].filter((_, i) => i !== index)
      }
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-inter">Admin Login</h1>
            <p className="text-gray-600 mt-2 font-inter">Acesse o painel administrativo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-inter"
                placeholder="admin@exemplo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-inter"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 font-inter"
            >
              Entrar
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-lg text-center font-inter ${
              message.includes('sucesso') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500 font-inter">
            <p>Credenciais padrão para teste:</p>
            <p>E-mail: admin@exemplo.com</p>
            <p>Senha: admin123</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 font-inter">
              Painel Administrativo
            </h1>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 font-inter"
              >
                <ExternalLink size={16} />
                Ver Site
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-inter"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={saveData}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-inter"
            >
              <Save size={20} />
              Salvar & Publicar
            </button>
            <button
              onClick={exportData}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-inter"
            >
              <Download size={20} />
              Exportar
            </button>
            <label className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer font-inter">
              <Upload size={20} />
              Importar
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>
          
          {message && (
            <div className={`mt-4 p-4 rounded-lg font-inter ${
              message.includes('sucesso') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'hero', label: 'Hero' },
                { id: 'marketplaces', label: 'Marketplaces' },
                { id: 'categories', label: 'Categorias' },
                { id: 'offers', label: 'Ofertas' },
                { id: 'social', label: 'Redes Sociais' },
                { id: 'settings', label: 'Configurações' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors font-inter ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Hero Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 font-inter">Seção Hero</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={data.hero.title}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    Subtítulo
                  </label>
                  <textarea
                    value={data.hero.subtitle}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      hero: { ...prev.hero, subtitle: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={data.hero.ctaText}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      hero: { ...prev.hero, ctaText: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                  />
                </div>
              </div>
            )}

            {/* Marketplaces Tab */}
            {activeTab === 'marketplaces' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 font-inter">Marketplaces</h2>
                  <button
                    onClick={addMarketplace}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-inter"
                  >
                    <Plus size={16} />
                    Adicionar
                  </button>
                </div>

                <div className="space-y-4">
                  {data.marketplaces.map((marketplace, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                            Nome
                          </label>
                          <input
                            type="text"
                            value={marketplace.name}
                            onChange={(e) => {
                              const newMarketplaces = [...data.marketplaces]
                              newMarketplaces[index].name = e.target.value
                              setData(prev => ({ ...prev, marketplaces: newMarketplaces }))
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                            Ícone
                          </label>
                          <input
                            type="text"
                            value={marketplace.icon}
                            onChange={(e) => {
                              const newMarketplaces = [...data.marketplaces]
                              newMarketplaces[index].icon = e.target.value
                              setData(prev => ({ ...prev, marketplaces: newMarketplaces }))
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                            Link de Afiliado
                          </label>
                          <input
                            type="url"
                            value={marketplace.affiliateUrl}
                            onChange={(e) => {
                              const newMarketplaces = [...data.marketplaces]
                              newMarketplaces[index].affiliateUrl = e.target.value
                              setData(prev => ({ ...prev, marketplaces: newMarketplaces }))
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => removeMarketplace(index)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 font-inter">Categorias</h2>
                  <button
                    onClick={addCategory}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-inter"
                  >
                    <Plus size={16} />
                    Adicionar
                  </button>
                </div>

                <div className="space-y-4">
                  {data.categories.map((category, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                            Nome
                          </label>
                          <input
                            type="text"
                            value={category.name}
                            onChange={(e) => {
                              const newCategories = [...data.categories]
                              newCategories[index].name = e.target.value
                              setData(prev => ({ ...prev, categories: newCategories }))
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                            Slug
                          </label>
                          <input
                            type="text"
                            value={category.slug}
                            onChange={(e) => {
                              const newCategories = [...data.categories]
                              newCategories[index].slug = e.target.value
                              setData(prev => ({ ...prev, categories: newCategories }))
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                            Ícone
                          </label>
                          <input
                            type="text"
                            value={category.icon}
                            onChange={(e) => {
                              const newCategories = [...data.categories]
                              newCategories[index].icon = e.target.value
                              setData(prev => ({ ...prev, categories: newCategories }))
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => removeCategory(index)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offers Tab */}
            {activeTab === 'offers' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 font-inter">Ofertas por Categoria</h2>
                
                {data.categories.map((category) => (
                  <div key={category.slug} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 font-inter">
                        {category.name} ({data.offers[category.slug]?.length || 0} ofertas)
                      </h3>
                      <button
                        onClick={() => addOffer(category.slug)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-inter"
                      >
                        <Plus size={16} />
                        Adicionar Oferta
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.offers[category.slug]?.map((offer, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                                Título
                              </label>
                              <input
                                type="text"
                                value={offer.title}
                                onChange={(e) => {
                                  const newOffers = { ...data.offers }
                                  newOffers[category.slug][index].title = e.target.value
                                  setData(prev => ({ ...prev, offers: newOffers }))
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                                URL da Imagem
                              </label>
                              <input
                                type="url"
                                value={offer.image}
                                onChange={(e) => {
                                  const newOffers = { ...data.offers }
                                  newOffers[category.slug][index].image = e.target.value
                                  setData(prev => ({ ...prev, offers: newOffers }))
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                                Descrição
                              </label>
                              <textarea
                                value={offer.description}
                                onChange={(e) => {
                                  const newOffers = { ...data.offers }
                                  newOffers[category.slug][index].description = e.target.value
                                  setData(prev => ({ ...prev, offers: newOffers }))
                                }}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">
                                Link de Afiliado
                              </label>
                              <input
                                type="url"
                                value={offer.affiliateUrl}
                                onChange={(e) => {
                                  const newOffers = { ...data.offers }
                                  newOffers[category.slug][index].affiliateUrl = e.target.value
                                  setData(prev => ({ ...prev, offers: newOffers }))
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => removeOffer(category.slug, index)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                              <Trash2 size={16} />
                              Remover
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Social Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 font-inter">Redes Sociais</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={data.social.instagram}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        social: { ...prev.social, instagram: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      TikTok
                    </label>
                    <input
                      type="url"
                      value={data.social.tiktok}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        social: { ...prev.social, tiktok: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={data.social.youtube}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        social: { ...prev.social, youtube: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 font-inter">Configurações</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                    Aviso de Transparência
                  </label>
                  <textarea
                    value={data.disclaimer}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      disclaimer: e.target.value
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2 font-inter">
                    Variáveis de Ambiente
                  </h3>
                  <p className="text-yellow-700 mb-4 font-inter">
                    Configure as seguintes variáveis de ambiente para segurança:
                  </p>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="bg-yellow-100 p-2 rounded">
                      NEXT_PUBLIC_ADMIN_EMAIL=seu@email.com
                    </div>
                    <div className="bg-yellow-100 p-2 rounded">
                      NEXT_PUBLIC_ADMIN_PASSWORD=suasenhasegura
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}