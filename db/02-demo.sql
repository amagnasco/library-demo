-- hashes generated with argon2id
-- salt LAu5ta9s4oVPtNUk, parallelism 1, memory 16, iterations 2, length 16

-- admin user alice, pass "nevermore"
INSERT INTO users (active, login, password, type)
VALUES (true, "alice", "$argon2id$v=19$m=16,t=2,p=1$TEF1NXRhOXM0b1ZQdE5Vaw$AzOtNpYVUjJvw86rMURPSw", "admin")

-- patron user bob, pass "dublin"
INSERT INTO users (active, login, password, type)
VALUES (true, "bob", "$argon2id$v=19$m=16,t=2,p=1$TEF1NXRhOXM0b1ZQdE5Vaw$n/DFZfrnebOtTL7Uj210Kg", "patron")

-- patron user charlie, pass "mississippi"
INSERT INTO users (active, login, password, type)
VALUES (true, "charlie", "$argon2id$v=19$m=16,t=2,p=1$TEF1NXRhOXM0b1ZQdE5Vaw$I/sXkepz4iDwyVd6Ei+4uw", "patron")
