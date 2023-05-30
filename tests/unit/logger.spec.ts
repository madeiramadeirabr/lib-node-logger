import { createMock } from 'ts-auto-mock';
import { Logger } from "../../src/core/logger";
import { HandlerInterface } from '../../src/core/interface/handler';
import { FormatterInterface } from '../../src/core/interface/formatter';
import { LogLevel } from '../../src/core/type/log-level';
import { formatResponse } from '../stubs/formatResponse';

describe('Logger', () => {
	let handlerMock = createMock<HandlerInterface>({
		isHandling: jest.fn(),
		handle: jest.fn()
	})
	
	let formatterMock = createMock<FormatterInterface>({
		format: jest.fn(),
	})
	
	const logger = new Logger(handlerMock, formatterMock)

	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date(2021, 0, 1));
	});

	afterEach(() => {
		jest.clearAllMocks();
	})

	it("Should call isHandling with correct payload", () => {
		jest.spyOn(handlerMock, "isHandling").mockImplementation(() => false);

		logger.log(LogLevel.info, "mensagem");

		expect(handlerMock.isHandling).toBeCalledTimes(1);
		expect(handlerMock.isHandling).toBeCalledWith(LogLevel.info);
	});

	it("Should return false when isHandling is false", () => {
		jest.spyOn(handlerMock, "isHandling").mockImplementation(() => false);
		
		const response = logger.log(LogLevel.info, "mensagem");
		
		expect(handlerMock.isHandling).toBeCalledTimes(1);
		expect(handlerMock.isHandling).toBeCalledWith(LogLevel.info);
		expect(response).toBeFalsy();
	});
	
	it("Should call format when isHandling is true", () => {
		jest.spyOn(handlerMock, "isHandling").mockImplementation(() => true);
		
		logger.log(LogLevel.info, "mensagem", {global_event_name: "teste"});

		expect(formatterMock.format).toBeCalledTimes(1);
		expect(formatterMock.format).toBeCalledWith("mensagem", LogLevel.info, {global_event_name: "teste"});
	});

	it("Should call handle when isHandling is true", () => {
		jest.spyOn(handlerMock, "isHandling").mockImplementation(() => true);
		jest.spyOn(formatterMock, "format").mockImplementation(() => formatResponse);
		
		logger.log(LogLevel.info, "mensagem", {global_event_name: "teste"});

		expect(handlerMock.handle).toBeCalledTimes(1);
		expect(handlerMock.handle).toBeCalledWith(formatResponse);
	});

	it("Should return true when success", () => {
		jest.spyOn(handlerMock, "isHandling").mockImplementation(() => true);
		jest.spyOn(formatterMock, "format").mockImplementation(() => formatResponse);
		
		const response = logger.log(LogLevel.info, "mensagem", {global_event_name: "teste"});

		expect(response).toBeTruthy();
	});

});
