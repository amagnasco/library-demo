print = @printf ":: Alessandro G. Magnasco MAKE SYSTEM :: \\n:: $(date) :: \\n:: starting $(1)... ::\\n"
demo:
	$(call print, $@)
	# copy types
	cp ./schemas/pg.d.ts ./backend/src/pg.d.ts
	cp ./schemas/pg.d.ts ./frontend/src/pg.d.ts

	# start
	docker compose -f compose.yaml up -d --build

clean:
	$(call print,$@)
	docker $(dev) down -v
