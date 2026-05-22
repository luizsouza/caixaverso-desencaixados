# CAIXA Adapta / AccessiFlow

Projeto unificado desenvolvido para o hackathon, composto por uma API backend e uma extensao de navegador voltada para acessibilidade web.

O objetivo principal do projeto e permitir que usuarios autentiquem com uma conta corporativa, configurem preferencias de acessibilidade e apliquem esses ajustes diretamente nas paginas acessadas pelo navegador por meio de um plugin/extensao.

## Visao Geral

O projeto esta dividido em duas partes:

- `backend/`: API Java com Spring Boot, responsavel por autenticacao, persistencia de preferencias e auditoria.
- `frontend/`: aplicacao Angular que funciona como interface da extensao de navegador e gera o pacote final do plugin.

A extensao injeta configuracoes de acessibilidade na pagina ativa usando `content.js`, enquanto o `background.js` atua como camada de apoio para chamadas HTTP e integracao com o navegador.

## Funcionalidades

- Login com usuario corporativo `@caixa.gov.br`.
- Persistencia de preferencias de acessibilidade por usuario.
- Aplicacao de ajustes visuais em paginas abertas no navegador.
- Suporte a tamanho de texto, contraste, inversao de cores, espacamento, guia de leitura e destaque de foco.
- Auditoria de cadastro, login e alteracoes de perfil.
- API documentada via Swagger/OpenAPI.
- Build de extensao baseado em Manifest V3.

## Tecnologias

Backend:

- Java 21
- Spring Boot 3
- Maven
- PostgreSQL
- Docker Compose
- JWT
- BCrypt
- Swagger/OpenAPI

Frontend/plugin:

- Angular 19
- PrimeNG
- TypeScript
- SCSS
- Web Extensions API
- Manifest V3

## Pre-requisitos

Antes de iniciar, instale:

- Java 21
- Maven
- Docker e Docker Compose
- Node.js 18 ou superior
- NPM
- Navegador compativel com extensoes, como Chrome, Edge, Brave ou Firefox

## Como Rodar o Backend

Entre na pasta do backend:

```bash
cd backend
```

Suba o banco PostgreSQL:

```bash
docker compose up -d
```

Inicie a API:

```bash
mvn spring-boot:run
```

A API ficara disponivel em:

```text
http://localhost:8080
```

A documentacao Swagger ficara disponivel em:

```text
http://localhost:8080/swagger-ui.html
```

## Usuario Padrao

Ao iniciar o backend com o banco configurado, o sistema cria automaticamente um usuario padrao para testes:

```text
login: usuario@caixa.gov.br
senha: SenhaForte123
```

Esse usuario permite que a banca teste o fluxo principal sem precisar cadastrar manualmente uma conta antes de usar a extensao.

## Como Rodar o Frontend em Desenvolvimento

O frontend pode ser executado como uma aplicacao Angular comum para desenvolvimento e validacao das telas.

Em outro terminal, entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

A interface ficara disponivel em:

```text
http://localhost:4200
```

Esse modo e util para testar telas, login e integracao com a API. Para testar o comportamento real como plugin de navegador, gere e instale a extensao seguindo os passos abaixo.

## Como Gerar a Extensao/Plugin

Com o backend rodando em `http://localhost:8080`, execute:

```bash
cd frontend
npm run build:extension
```

Esse comando:

1. Executa o build de producao do Angular.
2. Gera a interface da extensao em `frontend/extension/popup/`.
3. Copia os arquivos do plugin, como `manifest.json`, `background.js` e `content.js`.
4. Prepara a pasta `frontend/extension/` para ser carregada no navegador.

Ao final, a estrutura gerada sera semelhante a:

```text
frontend/extension/
  manifest.json
  background.js
  content.js
  icons/
  popup/
```

## Como Instalar a Extensao no Navegador

### Chrome, Edge ou Brave

1. Gere a extensao com `npm run build:extension`.
2. Abra o gerenciador de extensoes:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Ative o modo de desenvolvedor.
4. Clique em `Carregar sem compactacao` ou `Load unpacked`.
5. Selecione a pasta `frontend/extension/`.
6. Abra o plugin pela barra de extensoes do navegador.
7. Faca login com o usuario padrao ou outro usuario cadastrado.
8. Escolha/aplique as preferencias de acessibilidade.
9. A extensao enviara as configuracoes para a aba ativa por meio do `content.js`.

### Firefox

1. Gere a extensao com `npm run build:extension`.
2. Acesse `about:debugging`.
3. Clique em `This Firefox`.
4. Clique em `Load Temporary Add-on`.
5. Selecione o arquivo `frontend/extension/manifest.json`.

## Fluxo Esperado de Uso

1. Inicie o PostgreSQL com Docker Compose.
2. Inicie o backend Spring Boot.
3. Gere a extensao com `npm run build:extension`.
4. Carregue a pasta `frontend/extension/` no navegador.
5. Abra a extensao/plugin.
6. Realize login com `usuario@caixa.gov.br` e senha `SenhaForte123`.
7. Configure as preferencias de acessibilidade.
8. Navegue para uma pagina qualquer.
9. A extensao aplica os ajustes visuais na pagina ativa.

## Configuracoes Importantes

A API usa por padrao:

```text
Backend: http://localhost:8080
Frontend dev: http://localhost:4200
PostgreSQL: localhost:5433
Base da API no frontend: http://localhost:8080/api/v1
```

As principais variaveis de ambiente suportadas pelo backend sao:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
JWT_SECRET
JWT_EXPIRATION_MINUTES
APP_CORS_ALLOWED_ORIGIN
APP_CORS_ALLOWED_ORIGIN_PATTERNS
```

## Testes

Backend:

```bash
cd backend
mvn test
```

Frontend:

```bash
cd frontend
npm test
```

## Observacoes para Avaliacao

Este projeto foi pensado para ser demonstrado principalmente como uma extensao de navegador. O modo `npm start` ajuda no desenvolvimento da interface, mas a experiencia final acontece ao carregar `frontend/extension/` no navegador.

Para a demonstracao completa, mantenha o backend rodando antes de abrir o plugin. A extensao depende da API para autenticar o usuario e salvar as preferencias de acessibilidade.
