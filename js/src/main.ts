import { ConnectionFactory } from "./websocket";
import { Terminal, WebTTY, protocols } from "./webtty";
import { OurXterm } from "./xterm";
import { setFont } from "./mb64";

// @TODO remove these
declare var gotty_auth_token: string;
declare var gotty_term: string;
declare var gotty_ws_query_args: string;

const elem = document.getElementById("terminal");

if (elem !== null) {
    const defaultFont = "Yu-Gothic-UI";
    const font =
        typeof window !== "undefined" && window.localStorage
            ? window.localStorage.getItem("font") || defaultFont
            : defaultFont;
    setFont(font);

    var term: Terminal;
    term = new OurXterm(elem);

    const httpsEnabled = window.location.protocol == "https:";
    const queryArgs =
        gotty_ws_query_args === "" ? "" : "?" + gotty_ws_query_args;
    const url =
        (httpsEnabled ? "wss://" : "ws://") +
        window.location.host +
        window.location.pathname +
        "ws" +
        queryArgs;
    const args = window.location.search;
    const factory = new ConnectionFactory(url, protocols);
    const wt = new WebTTY(term, factory, args, gotty_auth_token);
    const closer = wt.open();

    // According to https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event
    // this event is unreliable and in some cases (Firefox is mentioned), having an
    // "unload" event handler can have unwanted side effects. Consider commenting it out.
    window.addEventListener("unload", () => {
        closer();
        term.close();
    });
}
