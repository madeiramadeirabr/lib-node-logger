# Usando Eventos Standard com a Biblioteca de Logs

Esta documentação descreve como utilizar eventos standard para logging, de acordo com as diretrizes definidas na [MMRFC 5](https://github.com/madeiramadeirabr/mmrfc/blob/main/rfcs/MMRFC%205%20-%20Log%20Standard%20Events.md).

- [Usando Eventos Standard com a Biblioteca de Logs](#usando-eventos-standard-com-a-biblioteca-de-logs)
  - [Visão Geral](#visão-geral)
  - [Eventos Standard Disponíveis](#eventos-standard-disponíveis)
  - [Campos Obrigatórios](#campos-obrigatórios)
  - [Níveis de Log Recomendados](#níveis-de-log-recomendados)
  - [Exemplos de Uso](#exemplos-de-uso)
  - [Referências](#referências)

## Visão Geral

A biblioteca de logs suporta o uso de eventos standard, seguindo as especificações da [MMRFC 5](https://github.com/madeiramadeirabr/mmrfc/blob/main/rfcs/MMRFC%205%20-%20Log%20Standard%20Events.md). Esses eventos garantem consistência e padronização nos logs, adicionando automaticamente mensagens de contexto e recomendações. Ao utilizar os eventos standard, é importante fornecer todos os campos obrigatórios para evitar mensagens de erro ou recomendações sobre o uso apropriado.

## Eventos Standard Disponíveis

Os seguintes `global_event_name` estão disponíveis para uso e são definidos no enum `LogStandardGlobalEventNameEnum`:

- `PROCESS_STARTUP_FAILED`
- `USE_CASE_EXECUTION_FAILED`
- `USE_CASE_VALIDATION_FAILED`
- `SERVICE_REQUEST_FAILED`
- `DATABASE_REQUEST_FAILED`
- `SLOW_HTTP_REQUEST`

O `LogStandardGlobalEventNameEnum` está disponível publicamente e deve ser usado para garantir que os valores corretos sejam utilizados.

## Campos Obrigatórios

Cada `global_event_name` requer um conjunto específico de campos no contexto do log. Abaixo estão os eventos e seus respectivos campos obrigatórios:

- **PROCESS_STARTUP_FAILED**
  - `reason`: Motivo da falha no processo de inicialização.

- **USE_CASE_EXECUTION_FAILED**
  - `reason`: Motivo pelo qual a execução do caso de uso falhou.
  - `service`: Nesse caso refere-se ao serviço ao componente que está sendo executado.
  - `action`: Qual ação o serviço estava executando no momento da falha

- **USE_CASE_VALIDATION_FAILED**
  - `reason`: Motivo da falha de validação.
  - `service`: Nesse caso refere-se ao serviço ao componente que está sendo executado.
  - `action`: Qual validação que não foi bem sucedida.

- **SERVICE_REQUEST_FAILED**
  - `reason`: Motivo da falha na requisição de serviço.
  - `service`: Nesse caso refere-se ao serviço externo que está sendo chamado.
  - `action`: Qual ação o serviço externo estava executando no momento da falha.

- **DATABASE_REQUEST_FAILED**
  - `reason`: Motivo da falha na requisição ao banco de dados.
  - `service`: Nesse caso refere-se ao serviço ao componente que está sendo executado.
  - `action`: Qual ação estava sendo executada no banco de dados no momento da falha.

- **SLOW_HTTP_REQUEST**
  - `reason`: Motivo pelo qual a requisição foi considerada lenta.
  - `service`: Nesse caso refere-se ao serviço que está sendo chamado.
  - `action`: Qual ação o serviço estava executando no momento da requisição.
  - `time_spent_ms`: Tempo gasto na requisição em milissegundos.
  - `time_limit_ms`: Tempo limite configurado para a requisição em milissegundos.

Caso algum desses campos esteja ausente, a biblioteca adicionará uma mensagem no log indicando quais campos estão faltando e incluirá uma nota para consultar a MMRFC 5.

## Níveis de Log Recomendados

Ao usar um `global_event_name`, a biblioteca verifica se o nível de log está de acordo com as recomendações da MMRFC 5. Abaixo estão os níveis de log recomendados para cada evento:

- `PROCESS_STARTUP_FAILED`: **ERROR**
- `USE_CASE_EXECUTION_FAILED`: **ERROR**
- `USE_CASE_VALIDATION_FAILED`: **WARNING**
- `SERVICE_REQUEST_FAILED`: **ERROR**
- `DATABASE_REQUEST_FAILED`: **ERROR**
- `SLOW_HTTP_REQUEST`: **WARNING**

Se um nível de log diferente for usado, uma recomendação será adicionada ao contexto, sugerindo o nível de log apropriado.

## Exemplos de Uso

### Exemplo: Log com Todos os Campos Presentes

```javascript
import { LogStandardGlobalEventNameEnum } from '../src/core/type/log-standard-global-event-name.enum';

logger.error('Service failed to start', {
  global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED,
  context: {
    reason: 'Missing configuration file',
    service: 'ConfigService',
  }
});
```

#### Resultado:

```json
{
    "message": "Service failed to start",
    "level": "ERROR",
    "service_name": "example-service",
    "global_event_timestamp": "2023-07-06T18:52:44.845Z",
    "global_event_name": "PROCESS_STARTUP_FAILED",
    "context": {
        "reason": "Missing configuration file",
        "service": "ConfigService",
        "timestamp": "2023-07-06T18:52:44.845Z"
    }
}
```

## Exemplo: Log com Campo Ausente

```javascript
import { LogStandardGlobalEventNameEnum } from '../src/core/type/log-standard-global-event-name.enum';

logger.error('Service failed to start', {
  global_event_name: LogStandardGlobalEventNameEnum.PROCESS_STARTUP_FAILED,
  context: {
    reason: 'Dependency not found',
    // Campo 'service' ausente
  }
});
```

#### Resultado:

```json
{
    "message": "Service failed to start",
    "level": "ERROR",
    "service_name": "example-service",
    "global_event_timestamp": "2023-07-06T18:52:44.845Z",
    "global_event_name": "PROCESS_STARTUP_FAILED",
    "context": {
        "reason": "Dependency not found",
        "service": "The field \"service\" is required for the event \"PROCESS_STARTUP_FAILED\".",
        "note": "Please refer to MMRFC 5 for required fields information."
    }
}
```

## Exemplo: Log com Nível de Log Inadequado

```javascript
import { LogStandardGlobalEventNameEnum } from '../src/core/type/log-standard-global-event-name.enum';

logger.info('Slow HTTP request detected', {
  global_event_name: LogStandardGlobalEventNameEnum.SLOW_HTTP_REQUEST,
  context: {
    url: 'http://example.com',
    duration: '1200ms'
  }
});
```

#### Resultado:

```json
{
    "message": "Slow HTTP request detected",
    "level": "INFO",
    "service_name": "example-service",
    "global_event_timestamp": "2023-07-06T18:52:44.845Z",
    "global_event_name": "SLOW_HTTP_REQUEST",
    "context": {
        "url": "http://example.com",
        "duration": "1200ms",
        "recommendation": "It is recommended to use the log level \"WARNING\" for the event \"SLOW_HTTP_REQUEST\"."
    }
}
```

## Referências

Para mais detalhes, consulte a documentação da [MMRFC 5](https://github.com/madeiramadeirabr/mmrfc/blob/main/rfcs/MMRFC%205%20-%20Log%20Standard%20Events.md)

Esta documentação cobre o uso de eventos standard na biblioteca de logs, incluindo campos obrigatórios e níveis de log recomendados, conforme especificado na MMRFC 5. Seguir essas diretrizes garantirá que seus logs sejam consistentes e conformes, facilitando a depuração e manutenção.