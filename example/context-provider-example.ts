import { Container, LogLevel, LogContextProviderInterface } from '../src/index';

/**
 * Exemplo de um Provider Customizado.
 * Em um cenário real, você buscaria do 'newrelic', 'cls-hooked' ou 'AsyncLocalStorage'.
 */
class SimpleContextProvider implements LogContextProviderInterface {
  getContext() {

    try {
      return {
        trace_id: 'abc-123-manual',
        span_id: 'xyz-789-manual',
        app_version: '1.0.0'
      };
    } catch (error) {
      return {};
    }
  }
}

function main() {
  // 1. Inicialização do Logger com o Provider
  const logger = Container.getLogger({
    level: LogLevel.info,
    serviceName: 'pure-node-app',
    isDevelopmentEnv: true, // true para imprimir formatado no console
    contextProviders: [new SimpleContextProvider()]
  });

  // 2. Uso Simples
  // Note que não passamos o trace_id aqui, ele virá do provider.
  logger.info('Iniciando processamento em Node.js puro');

  // 3. Sobrescrita de campos
  // Se passarmos manualmente, o valor manual tem prioridade sobre o provider.
  logger.info('Mensagem com ID manual', {
    trace_id: 'id-prioritario-123'
  });
}

main();
