# CAIXA Adapta / AccessiFlow (Hackathon Extension)

Uma extensão de navegador voltada para **acessibilidade web**, desenvolvida com **Angular 19** e **PrimeNG** sob a arquitetura de extensões **Manifest V3**. O objetivo principal desta extensão é permitir que pessoas com deficiências visuais, motoras ou neurodivergentes possam personalizar e adaptar o conteúdo de qualquer página web de acordo com suas necessidades individuais.

## 🚀 Funcionalidades

- **Autenticação Sincronizada**: Login integrado e salvamento de configurações em nuvem.
- **Perfis de Acessibilidade**: Criação de múltiplos perfis pré-configurados que podem ser ativados rapidamente de acordo com a necessidade momentânea.
- **Ajustes de Leitura e Visualização** (Injetados via _Content Scripts_ dinamicamente):
  - **Tamanho da Fonte**: Escalonamento de todo o texto da página (`rem`, `px`, etc).
  - **Espaçamento de Letras**: Ajuste no _letter-spacing_ para melhorar o rastreio visual.
  - **Alto Contraste / Inversão de Cores**: Sobrescreve as cores de fundo para preto e letras para branco/amarelo, ou inverte toda a matriz de cores da página, reduzindo fadiga visual.
  - **Destaque de Foco**: Destaca fortemente com bordas vermelhas os elementos navegáveis pelo teclado, ajudando em restrições motoras.
  - **Guia de Leitura**: Adiciona uma régua de foco horizontal controlada pelo mouse, facilitando a concentração na linha sendo lida (ideal para TDAH ou dislexia).

## 🛠️ Tecnologias Utilizadas

- **Angular 19**: Uso intenso de recursos modernos como Standalone Components, Control Flow (sintaxe `@if`, `@for`) e **Signals** para reatividade local de altíssimo desempenho.
- **PrimeNG (v19)**: Biblioteca de componentes de UI rica para uma estética avançada.
- **Web Extensions API (Manifest V3)**: Arquitetura baseada em Chrome APIs para máxima segurança e compatibilidade cross-browser.
  - _Service Workers_ (`background.js`) para processamento silencioso.
  - _Content Scripts_ (`content.js`) para manipulação e injeção do DOM.
- **SCSS / Sass**: Para customizações avançadas de interface.

## 📦 Como rodar o projeto localmente

### 1. Pré-requisitos

- Node.js (v18 ou superior)
- NPM ou Yarn

### 2. Instalação e Desenvolvimento UI

Para instalar as dependências e testar as telas da extensão localmente (como uma aplicação web comum):

```bash
npm install
npm start
```

> Acesse `http://localhost:4200/` no navegador para visualizar as interfaces.

### 3. Build (Gerando a Extensão)

Para gerar a extensão funcional que poderá ser instalada no navegador:

```bash
npm run build:extension
```

> **Nota:** Este comando realiza o build do Angular (gerando o código de produção) e também executa o script `scripts/build-extension.js`, que estrutura automaticamente a pasta final chamada **`extension/`** com todos os assets e o `manifest.json`.

## 🌐 Como instalar a Extensão no Navegador

Após executar o comando `npm run build:extension`, a pasta `extension/` estará pronta para ser instalada localmente no seu navegador.

### Google Chrome / Microsoft Edge / Brave

1. Acesse o gerenciador de extensões: `chrome://extensions/` (ou `edge://extensions/`).
2. Ative o **"Modo do desenvolvedor"** no canto da tela.
3. Clique em **"Carregar sem compactação"** (Load unpacked) e selecione a pasta `extension/` gerada na raiz do seu projeto.
4. O ícone da extensão irá aparecer na sua barra superior e já estará pronta para uso!

### Mozilla Firefox

1. Abra o navegador e digite na barra de endereços: `about:debugging`
2. Clique no botão **"Carregar extensão temporária..."** (Load Temporary Add-on).
3. Navegue até a pasta `extension/` no seu computador e selecione o arquivo **`manifest.json`**.
4. A extensão será injetada imediatamente.

## 📁 Estrutura de Diretórios Importantes

```plaintext
├── extension/          # Pasta de saída da extensão finalizada gerada após o Build
│   ├── background.js   # Lógica em background (Service Worker)
│   ├── content.js      # Código injetado na página do usuário
│   ├── manifest.json   # Configurações Manifest V3 da extensão
│   └── popup/          # Arquivos transpilados da interface Angular
├── scripts/            # Scripts Node de apoio para gerar a estrutura correta de extensão
└── src/
    ├── app/
    │   ├── core/       # Guards e Services (AuthService, AccessibilityService, etc)
    │   ├── features/   # Componentes e páginas (Login, Profiles, Customizer, etc)
    │   └── shared/     # Componentes reaproveitáveis (Header) e Models
    └── styles.scss     # Estilos globais e redimensionamento do popup
```
