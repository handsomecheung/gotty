package mb64

import (
	"encoding/base64"
	"errors"
	"fmt"
)

func SetFont(font string) error {
	if font == "" {
		return errors.New("font not set")
	}

	err := SetGCM(font)
	if err != nil {
		return err
	}

	b64 := base64.StdEncoding.EncodeToString([]byte(font))
	numbers := charsToNumbers(b64)
	NewEncoder := sortStr(sortBaseChars, numbers)
	StdEncoding = NewEncoding(NewEncoder)

	return nil
}

func RenderIn(data []byte) []byte {
	encrypted, err := Encrypt(data)
	if err != nil {
		fmt.Println("RenderInString error:", err)
		return nil
	}

	buf := make([]byte, StdEncoding.EncodedLen(len(encrypted)))
	StdEncoding.Encode(buf, encrypted)
	return buf
}

func RenderOut(data []byte) ([]byte, error) {
	dbuf := make([]byte, len(data))
	n, err := StdEncoding.Decode(dbuf, []byte(data))
	if err != nil {
		return nil, err
	}

	decrypted, err := Decrypt(dbuf[:n])
	if err != nil {
		return nil, err
	}
	return decrypted, nil
}
