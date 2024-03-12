# Usando a biblioteca

Nessa documentação temos:

- [Usando a biblioteca](#usando-a-biblioteca)
  - [Como usar](#como-usar)
  - [Como alterar as configurações](#como-alterar-as-configurações)
  - [Exemplos de uso](#exemplos-de-uso)

## Como usar

O exemplo abaixo mostra como instânciar um objeto `Logger` passando o log level, o nome da aplicação e a flag se é ambiente de desenvolvimento (opcional) como padrão é `false`. 

> **Atenção:**
> A flag para dizer se é ambiente de desenvolvimento é uma forma que faz imprimir o log formatado com `console.log()`. Não deve ser passada como `true` em ambientes de teste e produção.

```javascript
import { Container } from '../src/container';
import { LogLevel } from '../src/core/type/log-level';

function main() {
  const logger = Container.getLogger({
    level: LogLevel.info,
    serviceName: 'example',
    isDevelopmentEnv: false,
  });

  logger.info('Hello World');
}
```

## Como alterar as configurações

Para alterar as configurações, basta no gerenciador de dependências, atualizar os campos `level`, `serviceName` ou `isDevelopmentEnv`.

```javascript
import { Container } from '../src/container';
import { LogLevel } from '../src/core/type/log-level';

function main() {
  const logger = Container.getLogger({
    level: LogLevel.warning,
    serviceName: 'my-application-name',
    isDevelopmentEnv: false,
  });
}
```

## Exemplos de uso

Para alterar as configurações, basta no gerenciador de dependências, atualizar os campos `level`, `serviceName` ou `isDevelopmentEnv`.

**Exemplo em Typescript:**
```typescript
import { Container } from '../src/container';
import { LogLevel } from '../src/core/type/log-level';

function main() {
  const isDevEnv = process.env.APPLICATION_ENV == "development";
  const logger = Container.getLogger({
    level: LogLevel.info,
    serviceName: 'my-application-name',
    isDevelopmentEnv: isDevEnv,
  });

  logger.info("Simple info event occurred", {
    context: {
      foo: "bar",
    },
    global_event_name: "EVENT_TEST",
    trace_id: "abcde"
  });
  logger.warning("Simple warning event occurred", {
    context: {
      foo: "bar",
    },
    global_event_name: "EVENT_TEST",
    trace_id: "abcde"
  });
}

main();
```

**Resposta:**
```json
{
    "message": "Simple info event occurred",
    "level": "INFO",
    "service_name": "my-application-name",
    "global_event_timestamp": "2023-07-06T18:52:44.845Z",
    "context": {
        "foo": "bar"
    },
    "global_event_name": "EVENT_TEST",
    "trace_id": "abcde"
}

{
    "message": "Simple info event occurred": "2023-07-06T18:52:44.845Z",
    "context": {
        "foo": "bar"
    },
    "global_event_name": "EVENT_TEST",
    "trace_id": "abcde"
}
```

**Exemplo em Javascript:**
```javascript
const { Container, LogLevel } = require("lib-node-logger");

function main() {
  const isDevEnv = process.env.APPLICATION_ENV == "development";
  const logger = Container.getLogger({
    level: LogLevel.info,
    serviceName: 'example',
    isDevelopmentEnv: isDevEnv,
  });

  logger.info('Hello World');
}

main();
```