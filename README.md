# Kamping App API

This is an API for [kamping.app](https://kamping.app)

## Setup Local

The only dependencies of the framework are Node.js and npm.

Ensure your versions of those tools match the following criteria:

- Node.js >= 8.0.0
- npm >= 3.0.0


### AdonisJS

Install AdonisJS globally via `npm` like so:
```bash
npm i -g @adonisjs/cli
```

### Clone this repository

```bash
git clone https://github.com/kamping-app/kamping-api.git
```

#### Install dependencies

```bash
cd kamping-api
```

With yarn
```bash
yarn
```

With npm
```bash
npm i
```

### APP Key

Generate a new APP KEY
```bash
adonis key:generate
```

### Migrations

Run the following command to run startup migrations.

```bash
adonis migration:run
```

### Serve

```bash
adonis serve --dev
```
