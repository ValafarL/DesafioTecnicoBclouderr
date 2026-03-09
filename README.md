# Countries Explorer

Aplicação Angular que consome a [REST Countries API](https://restcountries.com) para listar países, permitir busca em tempo real e exibir informações detalhadas de cada país.

---

## Como rodar o projeto localmente

**Pré-requisitos:** Node.js >= 18 e npm instalados.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd <pasta do projeto>

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
ng serve
```

Acesse `http://localhost:4200/` no navegador. A aplicação recarrega automaticamente ao salvar qualquer arquivo.

---

## Decisões técnicas

### Para a visualização total dos países
Foi utilizado paginação ao invés de um carregamento vertical, pois é uma quantidade de dados moderada e isso não uma barra de scroll vertical muito grande o que facilita a movimentação do usuário pela página inicial. Os dados são carregados de forma completa devido a api não permitir uma requisição por paginás ou limite para poder requisitar os dados aos poucos otimizando o carregamento inicial da página.

### Signals para gerenciamento de estado
Em vez de usar apenas `BehaviorSubject` ou `AsyncPipe`, utilizei a API de **Signals** do Angular (`signal()`) para gerenciar o estado reativo dos componentes. A integração com RxJS foi feita via `toSignal()` do pacote `@angular/core/rxjs-interop`, mantendo compatibilidade com os Observables do `HttpClient`.

### Busca em tempo real usando Reactive Forms e debounce
O campo de busca utiliza `FormControl` com `ReactiveFormsModule` e os operadores `debounceTime(300)` + `distinctUntilChanged()` do RxJS para evitar sobrecarregar, disparando a lógica apenas quando o usuário pausa a digitação. Como todos os países são carregados logo na página inicial da aplicação por serem poucos dados decidi fazer essa busca em cima desses países ja carregados diminuindo o número de requisições realizadas, já que a quantidade de dados facilita essa decisão.

### Roteamento
A navegação entre a Home e a página de detalhes é feita pelo Angular Router com a rota `/country/:countryCode`. O parâmetro `countryCode` utiliza o código de país ccn3.

---

## O que eu faria diferente com mais tempo

- **Testes unitários** — Cobriria os componentes e o `ApiService` com testes unitários.
- **Cache de requisições** — Implementaria um cache simples para páginas de detalhes dos países para evitar chamadas repetidas à API.
- **Filtros extras** — Adicionaria filtros extras como por exemplo por línguas faladas. Já que a api fornece uma quantidade de dados consideráveis sobre cada país.
- **Tratamento de erros mais robusto** — Centralizaria o tratamento de erros HTTP em um interceptor Angular, ao invés de tratar individualmente em cada componente.
- **Modelo visual para países fronteiriços** — Tentaria criar um modelo visual do mapa real do país selecionado para visualizar seus detalhes e ao seu redor os países fronteiriços, trazendo uma interação mais interessante para o usuário.

