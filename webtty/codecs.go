package webtty

import "github.com/sorenisanerd/gotty/pkg/mb64"

type Decoder interface {
	RenderOut(src []byte) ([]byte, error)
}

type Encoder interface {
	RenderIn(src []byte) ([]byte, error)
}

type NullCodec struct{}

func (NullCodec) RenderIn(src []byte) []byte {
	return src
}

func (NullCodec) RenderOut(src []byte) ([]byte, error) {
	return src, nil
}

type Base64Codec struct{}

func (Base64Codec) RenderIn(src []byte) []byte {
	return mb64.RenderIn(src)
}

func (Base64Codec) RenderOut(src []byte) ([]byte, error) {
	return mb64.RenderOut(src)
}
