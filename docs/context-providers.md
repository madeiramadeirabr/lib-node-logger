# Enriquecimento Automático (Context Providers)

Os `LogContextProviders` permitem que o Logger seja "auto-preenchido" com informações de contexto (como `trace_id`, `span_id`, `user_id`, etc.) sem a necessidade de passar esses dados manualmente em cada chamada de log. 

Esta funcionalidade é essencial para garantir o **Distributed Tracing** (Rastreio Distribuído) em arquiteturas de microserviços.

---

## O que são Context Providers?

São classes que implementam a interface `LogContextProviderInterface`. Elas funcionam como "espiões" que o Logger consulta em cada execução de log para coletar metadados dinâmicos do ambiente de execução (geralmente via `AsyncLocalStorage` ou bibliotecas de APM como New Relic).

### Interface
```typescript
export interface LogContextProviderInterface {
  getContext(): Record<string, any>;
}
```

---

## Comparação: Sem vs Com Context Provider

### ❌ Sem Context Provider (Manual)
O desenvolvedor precisa capturar o trace/span manualmente e passar no objeto de opções de cada log. O risco de esquecer ou poluir o código com lógica de infraestrutura é alto.

```typescript
const traceId = myApm.getTraceId();
logger.info('Processando pedido', { trace_id: traceId });
```

### ✅ Com Context Provider (Automático)
O Logger busca os dados automaticamente. O código de negócio permanece limpo e a observabilidade é garantida em 100% dos logs.

```typescript
// Configurado uma única vez na inicialização
logger.info('Processando pedido'); 
```

---

## Implementação com New Relic

Para integrar com a New Relic na MadeiraMadeira, você deve criar um provider que utilize o método `getLinkingMetadata` do agente.

```typescript
import { LogContextProviderInterface } from '@madeiramadeira/lib-node-logger';
import newrelic from 'newrelic';

export class NewRelicContextProvider implements LogContextProviderInterface {
  getContext() {
    const metadata = newrelic.getLinkingMetadata();
    
    // Mapeia os campos para o padrão esperado pela New Relic e pela MMRFC
    return {
      "trace.id": metadata['trace.id'],
      "span.id": metadata['span.id'],
      "entity.name": metadata['entity.name'],
      "entity.guid": metadata['entity.guid'],
      "hostname": metadata['hostname']
    };
  }
}
```

---

## Cenários de Execução

### 1. Aplicações API (Request Scope)
Em APIs (NestJS, Express), o `trace.id` identifica uma requisição HTTP do início ao fim. O provider garante que todos os logs disparados dentro dessa requisição compartilhem o mesmo ID, permitindo a correlação no painel de Observabilidade.

### 2. Workers e Consumidores (SQS / Kafka)
Em Workers, o comportamento de rastreio depende do contexto:
*   **Trace Continuado:** Se o evento recebido contiver metadados de rastreio do produtor, o New Relic continuará o mesmo `trace_id`.
*   **Novo Trace:** Se for um processo isolado (ex: Cron), um novo `trace_id` será gerado.
*   **O Provider:** Independente do cenário, o `LogContextProvider` capturará o ID correto que estiver ativo no momento da execução do job.

---

## Regras de Prioridade e Conflitos

O Logger segue uma ordem lógica para evitar perda de dados:

1.  **Prioridade Máxima:** Argumentos passados manualmente no método de log (ex: `logger.info('msg', { trace_id: 'manual' })`).
2.  **Prioridade Média:** Dados retornados pelos `LogContextProviders`.
3.  **Conflitos entre Providers:** Caso você utilize múltiplos providers que retornem a mesma chave, o último provider da lista terá prioridade.

---

## Como Configurar

### NestJS (Recomendado)
Registre o Logger como um Provider Global no seu `LoggerModule`.

```typescript
@Global()
@Module({
  providers: [
    {
      provide: 'LOGGER',
      useFactory: () => {
        return Container.getLogger({
          level: LogLevel.info,
          serviceName: 'meu-servico',
          contextProviders: [new NewRelicContextProvider()],
        });
      },
    },
  ],
  exports: ['LOGGER'],
})
export class LoggerModule {}
```

### Node.js Puro
```typescript
import { Container, LogLevel } from '@madeiramadeira/lib-node-logger';

const logger = Container.getLogger({
  level: LogLevel.info,
  serviceName: 'worker-app',
  contextProviders: [new NewRelicContextProvider()]
});

logger.info('App iniciado');
```

---

## Performance e Segurança
*   **Zero Impact:** Se nenhum provider for configurado, a biblioteca ignora a lógica de merge, garantindo performance idêntica às versões anteriores.
*   **Imutabilidade:** Os providers não devem alterar o estado da aplicação, apenas ler o contexto atual.
*   **Fail-Safe:** O Logger trata a ausência de contexto de forma segura, não disparando erros caso um provider retorne `undefined` ou um objeto vazio.
