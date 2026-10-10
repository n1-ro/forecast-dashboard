.PHONY: dev build test lint clean

dev:
	npm run dev

build:
	npm run build

test:
	npm run test

lint:
	npm run lint

clean:
	rm -rf dist node_modules
