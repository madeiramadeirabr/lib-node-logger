import { LogLevel } from "../../src/core/type/log-level";
import { Handler } from "../../src/core/handler";
import { levelStringToInt } from "../../src/core/type/log-level";

describe("Handler", () => {

    describe("isHandling", () => {
        const levels = Object.values(LogLevel);
        
        levels.map(levelHandler => {
            let handler = new Handler(levelHandler);
            levels.map(levelMessage => {
                
                let expected = levelStringToInt(levelMessage) >= levelStringToInt(levelHandler)  

                it(`Should return ${expected} when message is ${levelMessage} and handler is ${levelHandler}`, () => {

                    let response = handler.isHandling(levelMessage);
                    
                    expect(response).toBe(expected);
                })
            })
        })
    });

    describe("handle", () => {

        afterEach(() => {
            jest.clearAllMocks();
        })
        
        it("Should call console.log", () => {
            console.log = jest.fn();

            const handler = new Handler(LogLevel.info);

            handler.handle("message");
            expect(console.log).toBeCalledTimes(1);
            expect(console.log).toBeCalledWith("message");
        });
    });
});