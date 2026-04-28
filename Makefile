.PHONY: all
all:
	$(MAKE) -C proto all
	$(MAKE) -C pre-processing all

.PHONY: proto
	$(MAKE) -C proto all
