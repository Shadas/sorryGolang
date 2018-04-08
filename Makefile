BINFILE := bin/sorryGolang

${BINFILE}:
	go build -o bin/sorryGolang cmd/main.go

build: ${BINFILE}

run: ${BINFILE}
	./bin/sorryGolang

clean:
	rm -vf tmp/*.ass
	rm -vf tmp/*.gif
