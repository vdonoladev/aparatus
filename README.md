# 💈 Aparatus

**Aparatus** é um SaaS de agendamento inteligente para **barbearias modernas** — simples, bonito e com tecnologia de ponta.  
Os clientes podem marcar horários via **chat com IA**, seja por **voz ou texto**, usando o poder do **Google Gemini 2.0 Flash**.  
O pagamento é feito diretamente pelo **serviço contratado**, com **Stripe** garantindo segurança e praticidade.

---

## 🚀 Stack Tecnológica

| Tecnologia | Função |
|-------------|--------|
| **Next.js** | Framework principal do front e back (App Router) |
| **TypeScript** | Tipagem estática e confiável |
| **Prisma** | ORM e gerenciador de migrações |
| **PostgreSQL (NeonDB)** | Banco de dados escalável e serverless |
| **ShadCN/UI** | Biblioteca de componentes estilosa e acessível |
| **TanStack Query** | Gerenciamento de estado e cache de requisições |
| **Better Auth** | Autenticação segura e moderna |
| **Stripe** | Pagamentos online por serviço |
| **Node.js** | Ambiente de execução do backend |
| **Google Gemini 2.0 Flash** | IA para chat e voz |
| **OpenAI API** | Suporte adicional de IA (fallback e extensões) |

---

## 🧠 Funcionalidades Principais

- 💬 **Chat com IA** — por voz ou texto, via Google Gemini 2.0 Flash  
- 💳 **Pagamentos instantâneos com Stripe** (por serviço contratado)  
- 🧔 **Gestão de barbearias**, barbeiros e agendamentos  
- 🔐 **Autenticação com Better Auth** e login via Google  
- ⚙️ **Dashboard administrativo** completo  
- 🌐 **Infraestrutura com Prisma + NeonDB**  
- 🎨 **Interface moderna** com ShadCN + Tailwind CSS  

---

## ⚡ Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/vdonoladev/aparatus.git
cd apparatus
````

### 2. Instale as dependências

```bash
pnpm install
# ou
npm install
```

### 3. Crie o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo (ou copie do `.env.example`):

```env
DATABASE_URL=""

BETTER_AUTH_SECRET="secret"
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

NEXT_PUBLIC_APP_URL="http://localhost:3000"

GOOGLE_GENERATIVE_AI_API_KEY=""
OPENAI_API_KEY=""
```

---

### 4. Gere e aplique as migrações com Prisma

#### Gere o client do Prisma:

```bash
npx prisma generate
```

#### Crie e aplique as migrações (modo desenvolvimento):

```bash
npx prisma migrate dev --name init
```

*(Use `--name init` só na primeira vez; depois pode trocar pelo nome da alteração)*

#### Se quiser apenas sincronizar o schema (sem histórico de migrações):

```bash
npx prisma db push
```

---

### 5. Rode o projeto

```bash
pnpm run dev
```

Acesse o app em **[http://localhost:3000](http://localhost:3000)**

---

## 💬 Chat com IA

O chat inteligente do Aparatus entende **voz e texto**, usando o **Google Gemini 2.0 Flash**.
O cliente pode conversar naturalmente, escolher o barbeiro, ver horários disponíveis e confirmar o agendamento.
A IA interpreta preferências, ajusta datas e, se quiser, finaliza o pagamento via **Stripe**.

---

## 💰 Pagamentos

* Pagamento direto por **serviço contratado**
* Processamento seguro via **Stripe Checkout**
* Webhooks configurados para sincronizar status de pagamento

---

## 🧔 Sobre o Projeto

O **Aparatus** nasceu da vontade de trazer praticidade pro dia a dia das barbearias.
Menos papelada, menos desencontro — mais tempo pro que realmente importa: **cuidar do cliente**. 💈

---

## 📜 Licença

Este projeto está sob a licença **MIT**.
Sinta-se à vontade para usar, adaptar e contribuir!

---

### ⭐ Dê um Star!

Se curtiu o projeto, deixa um ⭐ no repositório — ajuda demais!
