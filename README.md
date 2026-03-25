# Library demo app
by Alessandro G. Magnasco 2026, AGPLv3

> This is a full stack demo library management app. It showcases a simple setup that was solo written in a few hours. This is NOT intended to be a secured production application and does not contain SSL.

### Stack:
- Front: Node.js, Typescript, React.js, EasyPeasy, i18n (en/es/fr)
- Back: NGINX, Express.js, Postgres, OpenAPI
- Docker

### Installation and removal:
- Requirements: Git, GNU Make, Docker
- Clone the git repository https://github.com/amagnasco/library-demo and enter it
- Rename '.env.example' to '.env'
- In a shell, run "make demo"
- Navigate to http://localhost/
- To remove, run "make clean" and delete the folder

### Features:
- [x] Admin users can add, remove, or edit books.
- [x] Patron users can check books in or out.
- [x] The collection is searchable by text fields or by tags.

### Accounts:
- Librarian: username: alice (pass: nevermore)
- Patrons: bob (dublin), charlie (mississippi)

### Roadmap:
- [x] project set up
- [x] architecture design and schemas
- [x] installation instructions
- [x] demo users created
- [x] docker online
- [x] database online
- [x] nginx online
- [x] backend online
- [x] frontend online
- [x] login page
- [x] collection page
- [x] i18n en/es/fr
- [x] login functional
- [x] new media pane
- [x] new media functional
- [x] collections functional
- [x] existing media pane
- [x] existing media functional
- [x] checkin/checkout functional
- [x] search function
- [x] finish i18n
- [x] styling

Enjoy!
Ale
