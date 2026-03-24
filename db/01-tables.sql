CREATE TABLE "users"
(
    "id"        SERIAL UNIQUE NOT NULL,
    "active"    BOOLEAN NOT NULL,
    "login"     VARCHAR(30) NOT NULL,
    "password"  VARCHAR(255) NOT NULL,
    "type"      VARCHAR(20) NOT NULL,
    "locale"    VARCHAR(5),
    "phone"     VARCHAR(30)
);

CREATE TABLE "media"
(
    "id"        SERIAL UNIQUE NOT NULL,
    "type"      VARCHAR(30) NOT NULL,
    "title"     VARCHAR(100) NOT NULL,
    "creator"   VARCHAR(100) NOT NULL,
    "desc"      TEXT,
    "tags"      TEXT[],
    "added"     DATE,
    "active"    BOOLEAN,
    "cost"      INT
);

CREATE TABLE "status"
(
    "id"        SERIAL UNIQUE NOT NULL,
    "mediaId"   BIGINT NOT NULL,
    "type"      VARCHAR(100) NOT NULL,
    "user"      BIGINT NOT NULL,
    "date"      DATE
);

ALTER TABLE "status"
    ADD FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE;

ALTER TABLE "status"
    ADD FOREIGN KEY ("user") REFERENCES "users" ("id");
