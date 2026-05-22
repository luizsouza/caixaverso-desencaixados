# CAIXA Adapta

Projeto unificado desenvolvido para o hackathon, composto por uma API backend e uma extensão de navegador voltada para acessibilidade web.

O objetivo principal do projeto é permitir que usuários autentiquem com uma conta corporativa, configurem preferências de acessibilidade e apliquem esses ajustes diretamente nas páginas acessadas pelo navegador por meio de um plugin/extensão.

## Visão Geral

O projeto está dividido em duas partes:

- `backend/`: API Java com Spring Boot, responsável por autenticação, persistência de preferências e auditoria.
- `frontend/`: aplicação Angular que funciona como interface da extensão de navegador e gera o pacote final do plugin.

A extensão injeta configurações de acessibilidade na página ativa usando `content.js`, enquanto o `background.js` atua como camada de apoio para chamadas HTTP e integração com o navegador.

## Funcionalidades

- Login com usuário corporativo `@caixa.gov.br`.
- Persistência de preferências de acessibilidade por usuário.
- Aplicação de ajustes visuais em páginas abertas no navegador.
- Suporte a tamanho de texto, contraste, inversão de cores, espaçamento, guia de leitura e destaque de foco.
- Auditoria de cadastro, login e alterações de perfil.
- API documentada via Swagger/OpenAPI.
- Build de extensão baseado em Manifest V3.

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

## Pré-requisitos

Antes de iniciar, instale:

- Java 21
- Maven
- Docker e Docker Compose
- Node.js 18 ou superior
- NPM
- Navegador compatível com extensões, como Chrome, Edge, Brave ou Firefox

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

A API ficará disponível em:

```text
http://localhost:8080
```

A documentação Swagger ficará disponível em:

```text
http://localhost:8080/swagger-ui.html
```

## Usuário Padrão

Ao iniciar o backend com o banco configurado, o sistema cria automaticamente um usuário padrão para testes:

```text
login: usuario@caixa.gov.br
senha: SenhaForte123
```

Esse usuário permite que a banca teste o fluxo principal sem precisar cadastrar manualmente uma conta antes de usar a extensão.

## Como Rodar o Frontend em Desenvolvimento

O frontend pode ser executado como uma aplicação Angular comum para desenvolvimento e validação das telas.

Em outro terminal, entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

A interface ficará disponível em:

```text
http://localhost:4200
```

Esse modo é útil para testar telas, login e integração com a API. Para testar o comportamento real como plugin de navegador, gere e instale a extensão seguindo os passos abaixo.

## Como Gerar a Extensão/Plugin

Com o backend rodando em `http://localhost:8080`, execute:

```bash
cd frontend
npm run build:extension
```

Esse comando:

1. Executa o build de produção do Angular.
2. Gera a interface da extensão em `frontend/extension/popup/`.
3. Copia os arquivos do plugin, como `manifest.json`, `background.js` e `content.js`.
4. Prepara a pasta `frontend/extension/` para ser carregada no navegador.

Ao final, a estrutura gerada será semelhante a:

```text
frontend/extension/
  manifest.json
  background.js
  content.js
  icons/
  popup/
```

## Como Instalar a Extensão no Navegador

### Chrome, Edge ou Brave

1. Gere a extensão com `npm run build:extension`.
2. Abra o gerenciador de extensões:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Ative o modo de desenvolvedor.
4. Clique em `Carregar sem compactação` ou `Load unpacked`.
5. Selecione a pasta `frontend/extension/`.
6. Abra o plugin pela barra de extensões do navegador.
7. Faça login com o usuário padrão ou outro usuário cadastrado.
8. Escolha/aplique as preferências de acessibilidade.
9. A extensão enviará as configurações para a aba ativa por meio do `content.js`.

### Firefox

1. Gere a extensão com `npm run build:extension`.
2. Acesse `about:debugging`.
3. Clique em `This Firefox`.
4. Clique em `Load Temporary Add-on`.
5. Selecione o arquivo `frontend/extension/manifest.json`.

###  Build e Execução (Modo Web)

Para gerar a versão web padrão do projeto e rodar localmente utilizando `npx` (com um servidor estático):

```bash
npm run build:extension

npx http-server extension/popup
ou
npx serve extension/popup
```

## Fluxo Esperado de Uso

1. Inicie o PostgreSQL com Docker Compose.
2. Inicie o backend Spring Boot.
3. Gere a extensão com `npm run build:extension`.
4. Carregue a pasta `frontend/extension/` no navegador.
5. Abra a extensão/plugin.
6. Realize login com `usuario@caixa.gov.br` e senha `SenhaForte123`.
7. Configure as preferências de acessibilidade.
8. Navegue para uma página qualquer.
9. A extensão aplica os ajustes visuais na página ativa.

## Configurações Importantes

A API usa por padrão:

```text
Backend: http://localhost:8080
Frontend dev: http://localhost:4200
PostgreSQL: localhost:5433
Base da API no frontend: http://localhost:8080/api/v1
```

As principais variáveis de ambiente suportadas pelo backend são:

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

## Observações para Avaliação

Este projeto foi pensado para ser demonstrado principalmente como uma extensão de navegador. O modo `npm start` ajuda no desenvolvimento da interface, mas a experiência final acontece ao carregar `frontend/extension/` no navegador.

Para a demonstração completa, mantenha o backend rodando antes de abrir o plugin. A extensão depende da API para autenticar o usuário e salvar as preferências de acessibilidade.
