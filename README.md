# Nuxt js project

- Please create .env file at the root of the project and copy content from
.env.example file.
- Set the urls in .env according to yours.
## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## .htaccess content:
DirectoryIndex disabled
 RewriteEngine On
 RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
 RewriteCond %{REQUEST_FILENAME} !-f
 RewriteCond %{REQUEST_FILENAME} !-d
 RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
