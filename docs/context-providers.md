# Enriquecimento Automático (Context Providers)

Os `LogContextProviders` permitem que o Logger seja "auto-preenchido" com informações de contexto (como `trace_id`, `span_id`, `user_id`, etc.) sem a necessidade de passar esses dados manualmente em cada chamada de log.

## O que são Context Providers?

São classes que implementam a interface `LogContextProviderInterface`. Elas são chamadas pelo Logger em cada execução de log para coletar metadados dinâmicos do ambiente de execução (geralmente via `AsyncLocalStorage` ou bibliotecas de APM como New Relic).

---

## Comparação: Sem vs Com Context Provider

### ❌ Sem Context Provider
Você precisa capturar o trace/span manualmente e passar no objeto de opções de cada log.

```typescript
// Em cada log do seu código
const traceId = myApm.getTraceId();
logger.info('Iniciando processamento', { trace_id: traceId });
```

**Resultado:**
```json
{
  "message": "Iniciando processamento",
  "level": "info",
  "trace_id": "abc-123"
}
```

### ✅ Com Context Provider
O Logger busca os dados automaticamente. Seu código fica limpo e padronizado.

```typescript
// Configuração única na inicialização
const logger = Container.getLogger({
  serviceName: 'my-app',
  level: LogLevel.info,
  contextProviders: [new MyApmProvider()] // Registro do provider
});

// Em qualquer lugar do código
logger.info('Iniciando processamento'); 
```

**Resultado (Automático):**
```json
{
  "message": "Iniciando processamento",
  "level": "info",
  "trace_id": "abc-123",
  "span_id": "xyz-789",
  "entity.name": "my-app-prod"
}
```

---

## Cenários de Uso

### 1. Aplicações API (Ex: NestJS, Express)

Em APIs, o `trace_id` é gerado no início da requisição HTTP. Ferramentas como New Relic mantêm esse ID vinculado à "thread" (contexto assíncrono) daquela requisição específica.

**Exemplo de Provider para New Relic:**
```typescript
import { LogContextProviderInterface } from '@madeiramadeira/lib-node-logger';
import newrelic from 'newrelic';

export class NewRelicProvider implements LogContextProviderInterface {
  getContext() {
    const metadata = newrelic.getLinkingMetadata();
    return {
      "trace.id": metadata['trace.id'],
      "span.id": metadata['span.id']
    };
  }
}
```

### 2. Workers e Consumidores (Ex: SQS, Kafka, RabbitMQ)

... (conteúdo anterior) ...

---

## Exemplos de Uso por Framework

### NestJS (Singleton via Module)

```typescript
@Module({
  providers: [
    {
      provide: 'LOGGER',
      useFactory: () => {
        return Container.getLogger({
          level: LogLevel.info,
          serviceName: 'my-service',
          contextProviders: [new NewRelicProvider()],
        });
      },
    },
  ],
})
export class LoggerModule {}
```

### Node.js Puro (Simples)

Para projetos sem frameworks complexos, basta instanciar e usar:

```typescript
import { Container, LogLevel } from '@madeiramadeira/lib-node-logger';
import { NewRelicProvider } from './providers/new-relic';

const logger = Container.getLogger({
  level: LogLevel.info,
  serviceName: 'pure-node-app',
  contextProviders: [new NewRelicProvider()]
});

// Trace e Span serão injetados automaticamente
logger.info('Iniciando processamento em Node.js puro');
```

---

## Performance
A biblioteca foi otimizada para ter **impacto zero** quando nenhum provider é utilizado. Quando utilizados, o custo é apenas o de uma leitura de memória (microssegundos), sendo muito mais eficiente do que gerenciar esses IDs manualmente no código da aplicação.
