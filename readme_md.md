# 🌙 DoctorSleep — Saúde e Bem-Estar do Sono

**DoctorSleep** é uma aplicação web imersiva e inteligente especializada em saúde e bem-estar do sono. Desenvolvido com um design moderno em **Glass-morphism**, o aplicativo combina autenticação segura, ambientes visuais dinâmicos em loop de vídeo (para criar uma atmosfera relaxante antes do descanso) e inteligência artificial avançada conectada para responder dúvidas com base nas diretrizes da Associação Brasileira do Sono (ABS).

---

## ✨ Funcionalidades Principais

* **Autenticação Segura (Supabase & Google OAuth):** Sistema de login robusto com suporte a e-mail/senha e autenticação rápida via conta Google, com sincronização dinâmica da foto de perfil do utilizador.
* **Interface Imersiva Glass-morphism:** Design limpo, elegante e responsivo, adaptado com modos claro e escuro.
* **Ambientes de Fundo Personalizáveis:** O utilizador pode alternar dinamicamente entre diferentes atmosferas visuais e sonoras em loop de vídeo através do menu lateral:
  * Partículas Azuis (Padrão)
  * Universo Estrelado
  * Chuva Relaxante
  * Casa na Floresta
  * Ondas Roxo Místico
  * Noite Sólida (Sem Vídeo)
* **Assistente de IA Integrado (Dify AI):** Chatbot especializado conectado à engine do Dify para suporte e orientações sobre higiene do sono.
* **Sessão Protegida & Logout Completo:** Gestão completa de estado de sessão, limpando o armazenamento local e encerrando tokens ativos com segurança ao sair.

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3 (com variáveis CSS e efeitos de desfoque / vidro), JavaScript (ES6+).
* **Autenticação & Backend as a Service (BaaS):** Supabase Auth SDK v2.
* **Inteligência Artificial:** Dify API (Chat Messages).
* **Ícones & Estilização:** Font Awesome 6.4, Google Fonts (Plus Jakarta Sans).

---

## 📁 Estrutura de Arquivos do Projeto

```text
DoctorSleep/
├── sleep-login.html     # Página de autenticação (E-mail/Senha e Google OAuth)
├── sleep.html           # Página principal da aplicação (Interface do Chat e Menu Lateral)
├── sleep-style.css      # Estilização global, temas (Claro/Escuro) e efeitos Glass-morphism
├── sleep-script.js      # Lógica do chat, integração com Dify AI, gestão de temas e vídeos
└── README.md            # Documentação oficial do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/doctorsleep.git
   cd doctorsleep
   ```

2. **Configuração dos Serviços:**
   * Certifique-se de que as chaves de API do **Supabase** e do **Dify** estão devidamente configuradas nos scripts de autenticação e chat (`sleep-login.html` e `sleep-script.js`).

3. **Execução Local:**
   * Abra o projeto utilizando uma extensão de servidor local (como o **Live Server** no VS Code) para garantir que os módulos e arquivos locais sejam carregados corretamente.
   * Acesse `http://127.0.0.1:5500/sleep-login.html` no seu navegador.

---

## ☁️ Implantação (Deploy no Vercel)

Para colocar o projeto em produção com um endereço HTTPS seguro (essencial para o funcionamento correto do Google OAuth e das requisições de API):

1. Suba o repositório para o seu **GitHub**.
2. Importe o projeto no **Vercel** (`Add New > Project`).
3. No painel do **Supabase**, vá em *Authentication > URL Configuration* e adicione a URL gerada pelo Vercel nos campos **Site URL** e **Redirect URLs**.

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de promoção do bem-estar e saúde do sono.