# 🔗 Landing Page de Links de Afiliado

Uma landing page moderna, responsiva e focada em conversão para centralizar todos os seus links de afiliado.

## ✨ Características

- **Design Moderno**: Interface minimalista com foco em conversão
- **Totalmente Responsivo**: Mobile-first design que funciona perfeitamente em todos os dispositivos
- **Painel Admin Completo**: Edite todo o conteúdo sem tocar no código
- **Performance Otimizada**: Carregamento rápido com lazy loading e otimizações
- **SEO Otimizado**: Meta tags, Open Graph e estrutura semântica
- **Scroll Position Restore**: Mantém posição ao navegar entre páginas

## 🚀 Funcionalidades

### Página Principal
- **Hero Section**: Título impactante com imagem de fundo
- **Categorias**: Tecnologia, Casa & Jardim, Moda, Bebês, Games, Beleza
- **Marketplaces**: Amazon, Mercado Livre, Magazine Luiza, Americanas, Shopee, AliExpress
- **Formulário de Contato**: Integração com FormSubmit/Formspree
- **Links Sociais**: Instagram, TikTok, YouTube

### Páginas Dinâmicas
- **Páginas de Categoria**: Listagem de ofertas por categoria
- **Páginas de Marketplace**: Vitrine inspirada em cada marketplace
- **Navegação Suave**: Scroll suave e preservação de posição

### Painel Administrativo (`/admin`)
- **Autenticação Segura**: Login com e-mail e senha
- **Editor Completo**: Edite textos, links, categorias e ofertas
- **Gerenciamento de Conteúdo**: Adicione/remova marketplaces e categorias
- **Export/Import**: Backup e restauração de configurações
- **Publicação Instantânea**: Mudanças aplicadas imediatamente

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_ADMIN_EMAIL=seu@email.com
NEXT_PUBLIC_ADMIN_PASSWORD=suasenhasegura
```

**⚠️ IMPORTANTE**: 
- Use uma senha forte e segura
- Nunca compartilhe essas credenciais
- Em produção, use variáveis de ambiente da plataforma (Vercel, Netlify, etc.)

### 2. Credenciais Padrão (apenas para teste)

- **E-mail**: admin@exemplo.com
- **Senha**: admin123

### 3. Configuração de Links de Afiliado

1. Acesse `/admin` e faça login
2. Vá para a aba "Marketplaces"
3. Substitua os links de exemplo pelos seus links de afiliado reais
4. Clique em "Salvar & Publicar"

## 📱 Como Usar

### Adicionando Ofertas
1. Acesse o painel admin (`/admin`)
2. Vá para a aba "Ofertas"
3. Selecione a categoria desejada
4. Clique em "Adicionar Oferta"
5. Preencha: título, imagem, descrição e link de afiliado
6. Salve as alterações

### Personalizando Conteúdo
1. **Hero**: Edite título, subtítulo e texto do botão
2. **Marketplaces**: Adicione/remova marketplaces e seus links
3. **Categorias**: Crie novas categorias ou edite existentes
4. **Redes Sociais**: Configure links para Instagram, TikTok e YouTube
5. **Configurações**: Personalize o aviso de transparência

### Exportar/Importar Configurações
- **Exportar**: Baixe um arquivo JSON com todas as configurações
- **Importar**: Carregue configurações de um arquivo JSON
- **Backup**: Mantenha backups regulares das configurações

## 🎨 Personalização Visual

### Imagem de Fundo
A imagem de fundo é aplicada automaticamente em todas as seções. Para alterar:
1. Substitua a URL na variável `backgroundImageUrl` nos arquivos de página
2. Ou edite diretamente no código se necessário

### Cores e Estilos
- **Cores principais**: Azul e laranja (conforme especificado)
- **Fontes**: Inter (padrão do template)
- **Botões**: Gradientes modernos com hover effects
- **Cards**: Sombras suaves e bordas arredondadas

## 🔒 Segurança

### Autenticação
- Login baseado em e-mail e senha
- Sessão salva no localStorage
- Logout automático ao fechar o navegador

### Links de Afiliado
- Todos os links abrem em nova aba (`target="_blank"`)
- Atributo `rel="noopener noreferrer"` para segurança
- Aviso de transparência sempre visível

## 📊 Performance

### Otimizações Implementadas
- **Lazy Loading**: Imagens carregam apenas quando visíveis
- **Fontes Otimizadas**: `font-display: swap` para carregamento rápido
- **CSS Crítico**: Estilos essenciais inline
- **Imagens Responsivas**: Diferentes tamanhos para diferentes telas

### Métricas Esperadas
- **Performance**: ≥ 90 (Lighthouse)
- **Acessibilidade**: ≥ 90 (Lighthouse)
- **Boas Práticas**: ≥ 90 (Lighthouse)
- **SEO**: ≥ 90 (Lighthouse)

## 🌐 SEO

### Meta Tags Configuradas
- Title e Description otimizados
- Keywords relevantes para afiliados
- Open Graph para redes sociais
- Twitter Cards para compartilhamento
- Estrutura semântica HTML5

### URLs Amigáveis
- `/categoria/tecnologia`
- `/marketplace/amazon`
- `/admin`

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático

### Netlify
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras Plataformas
- Configure Node.js 18+
- Instale dependências: `npm install`
- Build: `npm run build`
- Start: `npm start`

## 📞 Suporte

### Problemas Comuns
1. **Não consigo fazer login**: Verifique as variáveis de ambiente
2. **Links não funcionam**: Verifique se os links de afiliado estão corretos
3. **Imagens não carregam**: Verifique se as URLs das imagens são válidas

### Manutenção
- Faça backup regular das configurações (Export JSON)
- Monitore os links de afiliado periodicamente
- Atualize ofertas regularmente para manter engajamento

## 📄 Licença

Este projeto foi criado para uso pessoal/comercial. Você pode modificar e usar conforme necessário.

---

**Desenvolvido com ❤️ para maximizar suas conversões de afiliado!**