import { LogLevel } from "../../src/core/type/log-level";
import { Formatter } from "../../src/core/formatter";
import { formatInfoResponse } from "../stubs/formatResponse";

describe("Formatter", () => {

    let formatter = new Formatter("service");

    beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date(2021, 0, 1));
	});


    it("Should format correctly", () => {
        const response = formatter.format("mensagem", LogLevel.info, {global_event_name: "teste"});
        const expected = formatInfoResponse;
        
        expect(response).toBe(expected);
    });
});