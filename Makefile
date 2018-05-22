BINFILE := bin/sorryGolang
FRONTFOLDER := frontend/build/

${BINFILE}:
	go build -o bin/sorryGolang cmd/main.go

${FRONTFOLDER}:
	cd frontend && npm run build

build: ${BINFILE} ${FRONTFOLDER}

run_backend: ${BINFILE}
	./bin/sorryGolang

run_frontend: ${FRONTFOLDER}
	cd frontend && serve -s build/

clean:
	rm -vf tmp/*.ass
	rm -vf tmp/*.gif

clean_bins:
	rm -vf bin/sorryGolang
	rm -vrf frontend/build/
