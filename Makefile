TESTS = $(shell find tests/$(target) -type f -name "*.test.js")
TEST_TIMEOUT = 10000*10
MOCHA_REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		-r should \
		-r tests/test_helper \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)

.PHONY: test
