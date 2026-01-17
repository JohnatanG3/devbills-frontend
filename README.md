
# 🎨 Frontend (DevBills Interface)

Frontend da aplicação **DevBills**, um sistema de controle financeiro pessoal com foco em usabilidade, responsividade e organização visual.

A interface consome a API do DevBills e permite ao usuário gerenciar receitas, despesas e categorias de forma simples e intuitiva.

---

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- Vite
- CSS moderno
- Biome (lint + formatter)

---

## 📂 Estrutura do Projeto

```bash
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── hooks/
 ├── styles/
 └── main.tsx
```
---

## ✨ Funcionalidades

- Autenticação de usuário
- Cadastro e login
- Listagem de receitas e despesas
- Organização por categorias
- Interface responsiva (desktop e mobile)
- Consumo de API REST
- Feedback visual ao usuário

---

## 🎥 Demonstração do fluxo completo: login com Google, dashboard, transações e layout responsivo.

https://github.com/user-attachments/assets/31001282-11b4-45ae-a879-da816ebaa049

https://github.com/user-attachments/assets/1f72f975-f781-4661-80f3-28a92e45a978

Essa abordagem foi escolhida para demonstrar as funcionalidades sem necessidade de deploy.

---

## 🔐 Firebase (Login com Google)

Este projeto utiliza **Firebase Authentication** para login com Google.
Para executar localmente, configure as credenciais no arquivo `.env` (baseado no `.env.example`) e habilite o provedor Google no painel do Firebase.

As variáveis utilizadas seguem o padrão `VITE_FIREBASE_*`, conforme definido no arquivo `.env.example`.

---

## 🔗 Repositório do Backend

API do DevBills: https://github.com/JohnatanG3/devbills-backend

---

## ⚙️ Requisitos

- Node.js (versão recomendada: 20+)
- Yarn, NPM ou PNPM
- Backend do DevBills em execução

---

## ✨ Como Contribuir com o projeto

Se você quiser contribuir com este projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.

---

## 🔗 Integração com Backend

Certifique-se de que a API esteja rodando e que o arquivo de configuração de serviços (src/services) esteja apontando para o endereço correto da API.

---

## 🧠 Observações

- Projeto desenvolvido com foco em portfólio
- Código organizado e componentizado
- Responsividade pensada desde o início
- Não utiliza bibliotecas visuais pesadas, priorizando controle manual de layout

---

## 👨‍💻 Autor

Desenvolvido por [JohnatanG3](https://github.com/JohnatanG3).

## ✉️ Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato comigo:

- **GitHub:** [JohnatanG3](https://github.com/JohnatanG3)
- **LinkedIn:** [Johnatan Vieira](https://www.linkedin.com/in/johnatan-felipe-vieira/)
- **E-mail:** johnatan.g3@protonmail.com
