# Usando a biblioteca

Nessa documentação temos:

- [Usando a biblioteca](#usando-a-biblioteca)
  - [Como usar](#como-usar)
  - [Como alterar as configurações](#como-alterar-as-configurações)
  - [Exemplos de uso](#exemplos-de-uso)

## Como usar

O exemplo abaixo mostra como instânciar um objeto `Logger`, passando o log level e o nome da aplicação.
```javascript
import { Container } from '../src/container';
import { LogLevel } from '../src/core/type/log-level';

function main() {
  const logger = Container.getLogger({
    level: LogLevel.info,
    serviceName: 'example',
  });

  logger.info('Hello World');
}
```

## Como alterar as configurações

Para alterar as configurações, basta no gerenciador de dependências, atualizar os campos `level` ou `serviceName`.

```javascript
import { Container } from '../src/container';
import { LogLevel } from '../src/core/type/log-level';

function main() {
  const logger = Container.getLogger({
    level: LogLevel.warning,
    serviceName: 'my-application-name',
  });
}
```

## Exemplos de uso

Para alterar as configurações, basta no gerenciador de dependências, atualizar os campos `level` ou `serviceName`.

**Exemplo:**
```javascript
import { Container } from '../src/container';
import { LogLevel } from '../src/core/type/log-level';

function main() {
  const logger = Container.getLogger({
    level: LogLevel.info,
    serviceName: 'my-application-name',
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
    "message": "Simple warning event occurred",
    "level": "WARNING",
    "service_name": "my-application-name",
    "global_event_timestamp": "2023-07-06T18:52:44.845Z",
    "context": {
        "foo": "bar"
    },
    "global_event_name": "EVENT_TEST",
    "trace_id": "abcde"
}
```