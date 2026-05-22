# Acessibilidade API

API desenvolvida para o hackathon com o objetivo de persistir preferências de acessibilidade de usuários corporativos, autenticar o uso da extensão de navegador e registrar auditoria das alterações realizadas.

## Tecnologias

- Java 21
- Spring Boot 3
- Maven
- PostgreSQL
- Docker Compose
- BCrypt para criptografia de senha
- JWT para autenticação
- Swagger/OpenAPI para documentação interativa
- JaCoCo para relatório e verificação de cobertura de testes

## Funcionalidades

- Cadastro de perfil de usuário.
- Validação de e-mail corporativo `@caixa.gov.br`.
- Senha criptografada com BCrypt.
- Login com geração de token JWT.
- Persistência de preferências de acessibilidade.
- Consulta e atualização de perfil autenticado.
- Auditoria de cadastro, login e alterações de perfil.
- Tratamento padronizado de erros HTTP.
- CORS configurável para integração com o frontend Angular e com extensões de navegador.

## Como Rodar

Entre na pasta do backend:

```bash
cd backend
```

Suba o PostgreSQL:

```bash
docker compose up -d
```

Inicie a API:

```bash
mvn spring-boot:run
```

A API roda em:

```text
http://localhost:8080
```

A documentação interativa fica em:

```text
http://localhost:8080/swagger-ui.html
```

## Banco de Dados

O `docker-compose.yml` sobe um PostgreSQL 16 com as seguintes configurações padrão:

```text
host: localhost
porta: 5433
banco: acessibilidade_db
usuário: acessibilidade_user
senha: acessibilidade_pass
```

A aplicação usa `spring.jpa.hibernate.ddl-auto=update`, portanto as tabelas são criadas/atualizadas automaticamente durante a execução local.

## Usuário Padrão para Testes

Ao iniciar a API com o banco configurado, o sistema cria automaticamente um usuário padrão caso ele ainda não exista:

```text
login: usuario@caixa.gov.br
senha: SenhaForte123
```

Esse usuário foi criado para que a banca avaliadora consiga testar o fluxo de autenticação e uso da extensão sem depender do cadastro manual. A criação acontece apenas quando o registro ainda não existe no banco, evitando duplicidade nas próximas execuções.

## Configurações

As principais configurações ficam em `src/main/resources/application.yaml`.

Variáveis de ambiente suportadas:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
JWT_SECRET
JWT_EXPIRATION_MINUTES
APP_CORS_ALLOWED_ORIGIN
APP_CORS_ALLOWED_ORIGIN_PATTERNS
```

Por padrão, a API aceita requisições vindas do frontend local e de extensões de navegador:

```text
http://localhost:4200
http://127.0.0.1:4200
chrome-extension://*
moz-extension://*
edge-extension://*
```

## Endpoints

### Criar Perfil

```http
POST /api/v1/perfis
```

Body:

```json
{
  "email": "usuario@caixa.gov.br",
  "senha": "SenhaForte123",
  "tamanhoTexto": 16,
  "contraste": true,
  "aparencia": false,
  "espacamento": 1.5,
  "guiaLeitura": true,
  "navegTeclado": true
}
```

Resposta:

```json
{
  "id": 1,
  "email": "usuario@caixa.gov.br",
  "tamanhoTexto": 16,
  "contraste": true,
  "aparencia": false,
  "espacamento": 1.5,
  "guiaLeitura": true,
  "navegTeclado": true,
  "criadoEm": "2026-05-21T20:00:00",
  "atualizadoEm": "2026-05-21T20:00:00"
}
```

### Login

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "email": "usuario@caixa.gov.br",
  "senha": "SenhaForte123"
}
```

Resposta:

```json
{
  "mensagem": "Login realizado com sucesso.",
  "token": "...",
  "tokenExpiraEm": "2026-05-21T23:00:00",
  "config": {
    "preferencia": "usuario@caixa.gov.br",
    "tamanhoTexto": 16,
    "contraste": false,
    "aparencia": false,
    "espacamento": 1.0,
    "guiaLeitura": false,
    "navegTeclado": false
  }
}
```

Observação: no objeto `config`, o campo `preferencia` contém o e-mail do usuário autenticado.

### Consultar Perfil

```http
POST /api/v1/perfis/consultar
Authorization: Bearer TOKEN
```

Body:

```json
{
  "email": "usuario@caixa.gov.br"
}
```

### Atualizar Preferências

```http
PUT /api/v1/perfis
Authorization: Bearer TOKEN
```

Body:

```json
{
  "email": "usuario@caixa.gov.br",
  "tamanhoTexto": 18,
  "contraste": true,
  "aparencia": true,
  "espacamento": 2.0,
  "guiaLeitura": false,
  "navegTeclado": true
}
```

### Consultar Auditoria

```http
POST /api/v1/perfis/auditoria
Authorization: Bearer TOKEN
```

Body:

```json
{
  "email": "usuario@caixa.gov.br"
}
```

## Erros

Os erros retornam um corpo padronizado:

```json
{
  "timestamp": "2026-05-21T20:00:00",
  "status": 401,
  "erro": "Unauthorized",
  "detalhes": [
    "Token invalido ou expirado."
  ]
}
```

## Testes

Para executar a suíte de testes:

```bash
mvn test
```

Para executar a verificação de cobertura configurada no JaCoCo:

```bash
mvn verify
```
