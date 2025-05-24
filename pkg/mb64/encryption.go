package mb64

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"errors"
)

var gcm cipher.AEAD

func SetGCM(font string) error {
	key := generateKey(font)
	var err error
	gcm, err = newGCM(key)
	if err != nil {
		return err
	}
	return nil
}

// generateKey generates a 32-byte key from any input string.
// It uses SHA-256 to ensure the output is always 32 bytes.
// The same input will always produce the same output.
func generateKey(input string) []byte {
	hash := sha256.Sum256([]byte(input))
	return hash[:]
}

func newGCM(key []byte) (cipher.AEAD, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}
	return cipher.NewGCM(block)
}

// Encrypt use AES-GCM to encrypt data
// return bytes slice format: nonce(12 bytes) + encrypted data + authentication tag(16 bytes)
func Encrypt(data []byte) ([]byte, error) {
	nonce := make([]byte, gcm.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return nil, err
	}

	return gcm.Seal(nonce, nonce, data, nil), nil
}

// Decrypt use AES-GCM to decrypt data
// input data format must be: nonce(12 bytes) + encrypted data + authentication tag(16 bytes)
func Decrypt(data []byte) ([]byte, error) {
	if len(data) < gcm.NonceSize() {
		return nil, errors.New("ciphertext too short")
	}

	// split nonce and ciphertext
	nonce := data[:gcm.NonceSize()]
	ciphertext := data[gcm.NonceSize():]

	// decrypt data. Open method will automatically verify authentication tag
	return gcm.Open(nil, nonce, ciphertext, nil)
}
