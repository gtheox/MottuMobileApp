# 🏍️ Mottu Control - App Mobile

Aplicativo mobile em React Native para a gestão inteligente de motos e pátios da empresa Mottu. Este projeto foi desenvolvido para a matéria de Mobile Application Development e consome a [API .NET do Mottu Control](https://github.com/gtheox/MottuControlApi).

---

## 📚 Sumário

- [Integrantes](#-integrantes)
- [Descrição do Projeto](#-descrição-do-projeto)
- [✨ Features & Boas Práticas](#-features--boas-práticas)
- [🏛️ Arquitetura do Código](#️-arquitetura-do-código)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Rodar o Projeto](#-como-rodar-o-projeto)
- [📹 Vídeo de Apresentação](#-vídeo-de-apresentação)

---

## 👨‍💻 Integrantes

| Nome                           | RM     | GitHub                                          |
| ------------------------------ | ------ | ----------------------------------------------- |
| Gabriel Teodoro Gonçalves Rosa | 555962 | [gtheox](https://github.com/gtheox)             |
| Luka Shibuya                   | 558123 | [lukashibuya](https://github.com/lukashibuya)   |
| Eduardo Giovannini             | 555030 | [DuGiovannini](https://github.com/DuGiovannini) |

---

## 📖 Descrição do Projeto

O **Mottu Control** é um aplicativo mobile que serve como interface para o sistema de gerenciamento de frotas da Mottu. Ele permite que administradores visualizem, cadastrem, editem e excluam motos e pátios, tudo isso através de uma comunicação em tempo real com um backend robusto construído em .NET.

---

## ✨ Features & Boas Práticas

- **Integração com API:** Consumo de uma API .NET para todas as operações de CRUD (Create, Read, Update, Delete) de Motos e Pátios.
- **Gerenciamento de Estado de API:** Uso do **TanStack Query (React Query)** para gerenciar o estado do servidor, cache, `isLoading`, `isError` e "pull-to-refresh".
- **Autenticação com Firebase:** Sistema completo de login e cadastro de usuários utilizando o Firebase Authentication.
- **Tema Dinâmico (Light/Dark Mode):** Suporte completo a temas claro e escuro, que se adapta automaticamente às preferências do sistema operacional e pode ser alterado manualmente.
- **Internacionalização (i18n):** Suporte para Português e Inglês, com detecção automática do idioma do dispositivo e opção de troca manual.
- **Notificações Push:** Configuração para recebimento de notificações push via Firebase Cloud Messaging (FCM).
- **Publicação e Versionamento:** Publicação para testes via Firebase App Distribution e exibição do hash de commit do Git na tela "Sobre".

---

## 🏛️ Arquitetura do Código

O projeto foi estruturado seguindo as melhores práticas de desenvolvimento para React Native, com foco na separação de responsabilidades para garantir um código limpo, escalável e de fácil manutenção.

- `src/api`: Centraliza toda a lógica de comunicação com a API .NET usando `axios`.
- `src/components`: Contém componentes React reutilizáveis (botões, cards, etc.).
- `src/contexts`: Gerencia o estado global da aplicação usando a Context API do React para Tema e para o TanStack Query.
- `src/locales`: Armazena os arquivos de tradução (`pt.json`, `en.json`).
- `src/navigation`: Define todos os fluxos de navegação (Autenticação e Principal) usando React Navigation.
- `src/screens`: Contém as telas do aplicativo, organizadas em subpastas por funcionalidade (Auth, Home, Motos, Patios, etc.).
- `src/services`: Configura serviços externos como Firebase e i18next.
- `src/theme`: Define as paletas de cores para os temas claro e escuro.

---

## 🛠️ Tecnologias Utilizadas

- React Native com Expo
- React Navigation (para roteamento)
- TanStack Query (React Query) (para gerenciamento de estado de API)
- Firebase (Authentication e Cloud Messaging)
- i18next (para internacionalização)
- Axios (para requisições HTTP)
- Expo Application Services (EAS) (para builds de desenvolvimento)

---

## 🚀 Como Rodar o Projeto

Este projeto utiliza bibliotecas com código nativo e **não é compatível com o Expo Go**. É necessário criar um **Development Build**.

**1. Pré-requisitos**

- Node.js e npm
- [EAS CLI](https://docs.expo.dev/eas/getting-started/) instalado (`npm install -g eas-cli`)
- Conta no site [expo.dev](https://expo.dev/) (faça login com `eas login`)
- Emulador Android (via Android Studio) ou iOS (via Xcode) configurado.
- API .NET do projeto rodando localmente.

**2. Instalação**

```bash
# Clone o repositório
git clone [https://github.com/gtheox/MottuMobileApp]
cd seu-repositorio

# Instale todas as dependências
npm install
```

**3. Configuração da API**

No arquivo `src/api/apiService.js`, ajuste a `API_BASE_URL` para o endereço IP correto da sua máquina onde a API .NET está rodando.

**4. Construindo o Development Build**

```bash
# Crie o build para a plataforma desejada (ex: android)
eas build --profile development --platform android
```

**5. Executando o Projeto**

```bash
# Instale e rode o build no seu emulador
eas build:run --platform android

# Em outro terminal, inicie o servidor de desenvolvimento
npx expo start --dev-client
```

O aplicativo personalizado no emulador se conectará ao servidor e você poderá usar todas as funcionalidades.

---

## 📹 Vídeo de Apresentação

[Cole aqui o link para o seu vídeo de demonstração, hospedado no YouTube, Loom, etc.]
