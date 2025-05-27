package webtty

import "github.com/handsomecheung/mb64"

type Decoder interface {
	Decode(src []byte) ([]byte, error)
}

type Encoder interface {
	Encode(src []byte) ([]byte, error)
}

type NullCodec struct{}

func (NullCodec) Encode(src []byte) ([]byte, error) {
	return src, nil
}

func (NullCodec) Decode(src []byte) ([]byte, error) {
	return src, nil
}

type Base64Codec struct{}

func (Base64Codec) Encode(src []byte) ([]byte, error) {
	return mb64.Encode(src)
}

func (Base64Codec) Decode(src []byte) ([]byte, error) {
	return mb64.Decode(src)
}
