# miniYoutube

## Summary 📄

> The solution is implemented with Express and MongoDB for backend,
> the Front-end contains reactJs with hooks, axios and materialUI

## steps to execute 🚀

- install `docker` and `docker-compose`,

and just run:

```
docker-compose up
```

> open your browser on `http://localhost:85/`

## run individually 🏃🏻

- install and run mongo
- in root folder exec 👇
- Backend `npm i --prefix ./server && npm start --prefix ./server` -> runs on port `5000`
- FrontEnd `npm i --prefix ./client && npm start --prefix ./client` -> runs on port `3000`

## models mongo

| videos  | likes    | users     |
| ------- | -------- | --------- |
| id      | id_video | id        |
| name    | id_user  | user_name |
| tags    |          |           |
| file    |          |           |
| id_user |          |           |
