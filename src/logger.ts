

import fs from "fs";
import { error, warning, info, success } from './consoleTheme';

class Logger {

    private formatedLog(messageType: string, message: string, req = null): string {
        return `[${new Date().toLocaleString().replace(', ', ' ')}] ${messageType}:\t${(req == null ? ' ' : `[${req.method}] [${req.originalUrl}] `)}${message}`;
    }

    private _log(messageType: string, message: string, method, color, req = null, printToConsole: boolean = true): void {
        let formatedLog = this.formatedLog(messageType, message, req);
        fs.appendFileSync("log.txt", formatedLog + "\n", "utf-8");
        if (printToConsole) method(color(formatedLog));

    }

    error(message: string, req = null, printToConsole: boolean = true): void {
        this._log("error", "\t" + message, console.error, error, req, printToConsole);
    }

    warn(message: string, req = null, printToConsole: boolean = true): void {
        this._log("warning", message, console.warn, warning, req, printToConsole);
    }

    info(message: string, req = null, printToConsole: boolean = true): void {
        this._log("info", "\t" + message, console.info, info, req, printToConsole);
    }

    success(message: string, req = null, printToConsole: boolean = true): void {
        this._log("success", message, console.log, success, req, printToConsole);
    }
}

export const logger = new Logger();
export default logger;