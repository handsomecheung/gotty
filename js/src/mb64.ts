// This file now serves as a wrapper around the WebAssembly implementation

declare global {
  interface Window {
    mb64: {
      setFont(str: string): string;
      renderIn(data: Uint8Array): string;
      renderOut(str: string): Uint8Array;
    };
    mb64Initialized: boolean;
  }
}

function checkInitialization() {
  if (!window.mb64Initialized) {
    throw new Error("mb64 WebAssembly module is not initialized yet. Please wait for initialization to complete.");
  }
  if (!window.mb64) {
    throw new Error("mb64 WebAssembly module failed to register its functions. Please check the browser console for errors.");
  }
}

export function setFont(font: string): string {
  checkInitialization();
  try {
    const err = window.mb64.setFont(font);
    console.log("set font, error: ", err);
    return err;
  } catch (err) {
    console.error("Error in setFont:", err);
    throw new Error(`failed to set font: ${err.message}`);
  }
}

export function renderIn(uint8: Uint8Array): string {
  checkInitialization();
  try {
    return window.mb64.renderIn(uint8);
  } catch (err) {
    console.error("Error in mb64.renderIn:", err);
    throw new Error(`mb64 renderIn failed: ${err.message}`);
  }
}

export function renderOut(b64: string): Uint8Array {
  checkInitialization();
  try {
    return window.mb64.renderOut(b64);
  } catch (err) {
    console.error("Error in mb64.renderOut:", err);
    throw new Error(`mb64 renderOut failed: ${err.message}`);
  }
}
