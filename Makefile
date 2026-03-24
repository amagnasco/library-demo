print = @printf ":: Alessandro G. Magnasco MAKE SYSTEM :: \\n:: $(date) :: \\n:: starting $(1)... ::\\n"
date := $(shell date '+%Y-%m-%d_%H:%M:%S')

demo:
	$(call print, $@)

	# copy types
	cp ./schemas/*.d.ts ./backend/src/types/
	cp ./schemas/*.d.ts ./frontend/src/types/

	# copy openapi
	cp ./schemas/openapi.yaml ./backend/src/
	cp ./schemas/openapi.yaml ./frontend/src

	# start
	docker compose -f compose.yaml up -d --build

clean:
	$(call print,$@)
	docker compose -f compose.yaml down -v
