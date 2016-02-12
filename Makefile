TESTS = $(shell find tests/$(target) -type f -name "*.test.js")
TEST_TIMEOUT = 10000*10
MOCHA_REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		-r should \
		-r tests/test_helper \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)
dmg: 
	cp ./res/atom.icns dist/Dagger-darwin-x64/Dagger.app/Contents/Resources/atom.icns
	./node_modules/electron-builder/cli.js dist/Dagger-darwin-x64/Dagger.app/ --platform=osx --out=dist/ --config=config.json

.PHONY: test
.PHONY: dmg
	
