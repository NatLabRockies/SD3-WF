.PHONY: all
all: src/lib/generated/sd3.js

src/lib/generated/sd3.js: ../proto/feeder.proto ../proto/scenario.proto
	npm run proto:build
