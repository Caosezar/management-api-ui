# Documentação Base do Projeto

## Estrutura de Rotas

O projeto utiliza o `router.tsx` para gerenciar a navegação entre páginas. As rotas são separadas em públicas e privadas:

- **Públicas:** Acessíveis sem autenticação, localizadas em `src/routes/public/`.
- **Privadas:** Requerem autenticação, localizadas em `src/routes/private/`.
- **Layouts:** Utilizados para organizar a estrutura visual das rotas, em `src/routes/layouts/`.

### Proteção de Páginas Privadas

As páginas privadas são protegidas por um layout específico (`private-layout.tsx`) que verifica a autenticação do usuário usando o hook `useAuth`. Caso o usuário não esteja autenticado, é redirecionado para a página de login.

Exemplo:

```tsx
// src/routes/layouts/private-layout.tsx
const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
```

## Organização das Features

Cada contexto funcional do sistema deve ser separado dentro da pasta `src/features/`, facilitando a escalabilidade e manutenção. Exemplo: `auth`, `users`, `dashboard`.

## Padrão de Implementação Zustand

Os stores Zustand devem ser criados em arquivos dentro de `src/features/[context]/store.ts` ou em `src/store/` para estados globais. O padrão recomendado:

```ts
import { create } from "zustand";

interface State {
  // ...definição dos estados
}

export const useStore = create<State>((set) => ({
  // ...ações e estados
}));
```

## Padrão de Implementação de Queries

    ### Exemplo de Definição de Rotas
    ```tsx
    // src/router.tsx
    import { createBrowserRouter } from 'react-router-dom';
    import PublicLayout from './routes/layouts/public-layout';
    import PrivateLayout from './routes/layouts/private-layout';
    import Login from './routes/public/login';
    import Dashboard from './routes/private/dashboard';

    export const router = createBrowserRouter([
    	{
    		path: '/',
    		element: <PublicLayout />, // layout público
    		children: [
    			{ path: 'login', element: <Login /> },
    			// outras rotas públicas
    		],
    	},
    	{
    		path: '/app',
    		element: <PrivateLayout />, // layout privado
    		children: [
    			{ path: 'dashboard', element: <Dashboard /> },
    			// outras rotas privadas
    		],
    	},
    ]);
    ```

    ### Fluxo de Autenticação
    1. Usuário acessa rota privada.
    2. `PrivateLayout` verifica autenticação via `useAuth`.
    3. Se não autenticado, redireciona para `/login`.
    4. Após login, usuário é redirecionado para rota protegida.

    #### Exemplo de Hook de Autenticação
    ```ts
    // src/hooks/useAuth.ts
    import { useStore } from '../features/auth/store';
    export function useAuth() {
    	const { token } = useStore();
    	return { isAuthenticated: !!token };
    }
    ```

As queries devem ser implementadas usando React Query, centralizando a lógica em hooks customizados dentro de `src/hooks/` ou `src/features/[context]/hooks/`. Exemplo:

```ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

export function useUsersQuery() {
  return useQuery(["users"], () => apiClient.get("/users"));
}
```

## Whitelabel com TailwindCSS

O whitelabel será implementado utilizando TailwindCSS para customização visual. As variações de tema e marca serão controladas por classes utilitárias e arquivos de configuração (`tailwind.config.js`).

- Crie temas customizados em `tailwind.config.js` usando `extend`.
- Utilize variáveis CSS para cores e fontes customizáveis.
- Componentes devem receber props para aplicar classes dinâmicas conforme o tema selecionado.

  ## Organização das Features

  Cada contexto funcional do sistema deve ser separado dentro da pasta `src/features/`, facilitando a escalabilidade e manutenção. Exemplo: `auth`, `users`, `dashboard`.

  - Cada feature pode conter:
    - Componentes (`components/`)
    - Hooks (`hooks/`)
    - Store Zustand (`store.ts`)
    - Serviços/API (`service.ts`)

  Exemplo de estrutura:

  ```
  src/features/users/
  	components/
  	hooks/
  	store.ts
  	service.ts
  ```

Exemplo de configuração:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: "#123456",
      },
    },
  },
};
```

## Resumo

- Rotas organizadas por contexto e protegidas por layouts.
- Features separadas por domínio funcional.
- Zustand para gerenciamento de estado local/global.
- React Query para dados remotos.
- Whitelabel via TailwindCSS e variáveis de tema.
