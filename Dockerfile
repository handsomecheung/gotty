FROM node:16 as js-build
WORKDIR /gotty
COPY js /gotty/js
COPY Makefile /gotty/
RUN make bindata/static/js/gotty.js.map

FROM golang:1.20 as go-build
WORKDIR /gotty
COPY . /gotty
COPY --from=js-build /gotty/js/node_modules /gotty/js/node_modules
COPY --from=js-build /gotty/bindata/static/js /gotty/bindata/static/js
# Build WebAssembly module and copy all static assets
RUN GOOS=js GOARCH=wasm go build -tags js,wasm -o resources/mb64.wasm ./cmd/mb64wasm && \
    make assets && \
    CGO_ENABLED=0 go build -o gotty

FROM alpine:latest
RUN apk update && \
    apk upgrade && \
    apk --no-cache add ca-certificates bash
WORKDIR /root
COPY --from=go-build /gotty/gotty /usr/bin/
CMD ["gotty",  "-w", "bash"]
