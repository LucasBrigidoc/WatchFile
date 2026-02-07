# Projeto: My App (CultureHub)

## Arquitetura e Decisões
- **Integração Spotify**: O usuário optou por não usar o conector nativo do Replit. A integração será feita manualmente via segredos (`SPOTIFY_CLIENT_ID` e `SPOTIFY_CLIENT_SECRET`) utilizando a API oficial do Spotify.
- **React Native / Expo**: App mobile com React Navigation (bottom tabs + stacks)
- **Backend**: Express.js com TypeScript (tsx), rodando na porta 5000
- **Database**: PostgreSQL (Neon-backed) com Drizzle ORM
- **APIs Externas**: TMDB (filmes/séries), Deezer (música), Jikan/MyAnimeList (anime/mangá), Google Books (livros)

## Componentes Principais
- **MediaCardFull**: Card de mídia em largura total com imagem, avaliação, categoria, data, gênero, sinopse e botões de ação
- **MediaDetailScreen**: Tela de detalhes da mídia com imagem hero, poster, sinopse, avaliação por estrelas, salvar na lista, compartilhar e posts relacionados
- **PostCard**: Card de post de usuário com avaliação e comentário sobre uma mídia
- **GlassCard**: Card estilizado com efeito glass usado como base em vários componentes

## Navegação
- **RootStack**: Auth / Main / CreatePost
- **HomeStack**: Home / MediaDetail
- **DiscoverStack**: Discover / Search / MediaDetail
- **ProfileStack**: Profile / Settings

## Progresso da Migração
- [x] Instalar pacotes iniciais
- [x] Verificar workflows
- [x] Configurar credenciais do Spotify
- [x] Configurar chave da API do TMDB
- [ ] Implementar serviço de busca de músicas (Spotify)
- [x] Implementar rota de filmes (TMDB)
- [x] Integrar busca de filmes e séries no frontend
- [x] Integrar API de Livros (Google Books)
- [x] Integrar busca de músicas (Deezer)
- [x] Integrar busca de animes (Jikan/MyAnimeList)
- [x] Integrar busca de mangás (Jikan/MyAnimeList)

## Mudanças Recentes (2026-02-07)
- Criado componente MediaCardFull para exibição de mídias em cards de largura total
- Criada tela MediaDetailScreen com detalhes da mídia, avaliação, salvar e posts relacionados
- Atualizada navegação para incluir rota MediaDetail nos stacks Home e Discover
- Atualizada DiscoverScreen com cards de largura total e filtros por categoria
- Corrigidos erros LSP pré-existentes em MediaCard.tsx
