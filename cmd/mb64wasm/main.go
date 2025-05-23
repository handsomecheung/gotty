//go:build js && wasm
// +build js,wasm

package main

import (
	"github.com/sorenisanerd/gotty/pkg/mb64wasm"
)

func main() {
	// Register the mb64 functions to the global JavaScript object
	mb64wasm.RegisterWasmFunctions()

	// Keep the program running
	select {}
}
