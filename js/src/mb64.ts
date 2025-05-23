// This file now serves as a wrapper around the WebAssembly implementation

declare global {
  interface Window {
    mb64: {
      setFont(str: string): string;
      encodeToString(data: Uint8Array): string;
      decodeString(str: string): Uint8Array;
    };
    mb64Initialized: boolean;
  }
}

function checkInitialization() {
  if (!window.mb64Initialized) {
    throw new Error(
      "mb64 WebAssembly module is not initialized yet. Please wait for initialization to complete.",
    );
  }
  if (!window.mb64) {
    throw new Error(
      "mb64 WebAssembly module failed to register its functions. Please check the browser console for errors.",
    );
  }
}

export function setFont(font: string): string {
  checkInitialization();
  try {
    const err = window.mb64.setFont(font);
    console.log("set font: ", err);
    return err;
  } catch (err) {
    console.error("Error in mb64.setFont:", err);
    throw new Error(`failed to set font: ${err.message}`);
  }
}

export function fromByteArray(uint8: Uint8Array): string {
  checkInitialization();
  try {
    return window.mb64.encodeToString(uint8);
  } catch (err) {
    console.error("Error in mb64.encodeToString:", err);
    throw new Error(`mb64 encoding failed: ${err.message}`);
  }
}

export function toByteArray(b64: string): Uint8Array {
  checkInitialization();
  try {
    const r = window.mb64.decodeString(b64);
    const s = new TextDecoder().decode(r);

    console.log("toByteArray: ", b64, "result: ", s);
    return r;
  } catch (err) {
    console.error("Error in mb64.decodeString:", err);
    throw new Error(`mb64 decoding failed: ${err.message}`);
  }
}
