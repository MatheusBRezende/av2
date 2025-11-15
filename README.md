## 📋 Descrição do Projeto
Sistema completo para gestão de alunos desenvolvido como atividade avaliativa, contendo versões **web** e **mobile** com funcionalidades de listagem, detalhamento, navegação entre telas e consumo de API REST.

## 🎯 Funcionalidades Implementadas

### 🌐 **Versão Web (React + Vite)**
- ✅ **Listagem completa** de alunos
- ✅ **Página de detalhes** com informações individuais
- ✅ **Navegação fluida** entre telas com React Router DOM
- ✅ **Consumo completo** da API REST de alunos
- ✅ **Interface moderna** com React Bootstrap
- ✅ **Testes automatizados** com Vitest e Testing Library
- ✅ **Responsividade** e experiência do usuário otimizada

### 📱 **Versão Mobile (React Native + Expo)**
- ✅ **Listagem otimizada** para dispositivos móveis
- ✅ **Tela de detalhes** com navegação nativa
- ✅ **Navegação entre telas** com React Navigation
- ✅ **Consumo da mesma API REST**
- ✅ **UI nativa** com componentes do React Native
- ✅ **Pull-to-refresh** para atualização de dados
- ✅ **Gestos e interações** móveis

## 🛠 Tecnologias Utilizadas

### Frontend Web
- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento e navegação
- **React Bootstrap** - Componentes de UI
- **Axios** - Cliente HTTP para APIs
- **Vitest** - Framework de testes
- **Testing Library** - Utilitários para testes

### Mobile
- **React Native** - Framework para apps nativos
- **Expo** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **Axios** - Cliente HTTP

### API
- **API REST** - Endpoint oficial da disciplina
- **Swagger** - Documentação interativa

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Para mobile: Expo Go no dispositivo ou emulador

### 📱 Aplicação Mobile
```bash
# Navegar para a pasta mobile
cd mobile

# Instalar dependências
npm install

# Executar o projeto
npx expo start
```

### 🌐 Aplicação Web
```bash
# Navegar para a pasta web
cd web

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar testes
npm test

# Build para produção
npm run build
```

## 🧪 Testes Automatizados

### Estrutura de Testes
```
web/src/tests/
├── App.test.jsx           # Testes do componente principal
├── Home.test.jsx          # Testes da listagem de alunos
├── StudentDetail.test.jsx # Testes dos detalhes do aluno
└── api.test.js            # Testes do serviço de API
```

### Executar Testes
```bash
cd web
npm test                   # Executa todos os testes
npm test -- --watch        # Modo watch para desenvolvimento
```

### Cobertura de Testes
- ✅ **9 testes** implementados e passando
- ✅ **Testes de componentes** React
- ✅ **Testes de navegação** entre rotas
- ✅ **Testes de API** com mocks
- ✅ **Testes de renderização** e estado

## 🔗 API REST Consumida

### Endpoints Utilizados
- `GET /alunos` - Listar todos os alunos
- `GET /alunos/{id}` - Buscar aluno por ID
- `POST /alunos` - Criar novo aluno
- `PUT /alunos/{id}` - Atualizar aluno
- `DELETE /alunos/{id}` - Remover aluno

### Documentação da API
- **Swagger UI**: https://proweb.leoproti.com.br/swagger-ui/index.html

## 📁 Estrutura do Projeto

```
av2/
├── 📁 web/                 # Aplicação React
│   ├── src/
│   │   ├── pages/          # Telas da aplicação
│   │   ├── services/       # Serviços de API
│   │   ├── tests/          # Testes automatizados
│   │   └── components/     # Componentes reutilizáveis
│   ├── package.json
│   └── vite.config.js
├── 📁 mobile/              # Aplicação React Native
│   ├── src/
│   │   ├── screens/        # Telas do app
│   │   └── services/       # Serviços de API
│   └── App.js
└── 📄 README.md            # Este arquivo
```

## 🎓 Requisitos da Atividade Atendidos

### ✅ **Listagem de alunos** 
- Implementada em ambas as plataformas
- Consumo real da API REST
- Interface responsiva e intuitiva

### ✅ **Detalhes dos alunos**
- Tela dedicada com informações completas
- Navegação a partir da listagem
- Dados consumidos da API

### ✅ **Navegação entre telas**
- Web: React Router DOM com múltiplas rotas
- Mobile: React Navigation com stack navigator
- Experiência fluida em ambas as plataformas

### ✅ **Consumo de dados via API REST**
- Integração completa com todos os endpoints
- Tratamento de erros e estados de loading
- Arquitetura de serviços organizada

### ✅ **Testes automatizados na versão web**
- Suite completa com 9 testes
- Cobertura de componentes principais
- Configuração profissional com Vitest
