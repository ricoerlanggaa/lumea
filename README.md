# Lumea

Lumea is a frontend project developed using modern technologies to create a fast, responsive, and scalable user experience.

## 🚀 Tech Stack

Lumea is built with the following technologies:

- **[Next.js](https://nextjs.org)** - A React framework for fast and efficient rendering.
- **[TypeScript](https://www.typescriptlang.org)** - A superset of JavaScript for safer development.
- **[Tailwind CSS](https://tailwindcss.com)** - A utility-first CSS framework.
- **[Docker](https://www.docker.com)** - Containerization for easier deployment.
- **[Jest](https://jestjs.io)** - A JavaScript testing framework.
- **[Redux Toolkit](https://redux-toolkit.js.org)** - State management for a structured application.
- **[Axios](https://axios-http.com)** - An HTTP client for API communication.
- **[Ajv](https://ajv.js.org)** - JSON Schema Validator for data validation.
- **[DaisyUI](https://daisyui.com)** - UI components built on Tailwind.
- **[Hugeicons](https://hugeicons.com)** - A collection of icons.
- **[Storybook](https://storybook.js.org)** - UI documentation and testing in isolation.

## 📦 Installation

Ensure you have the latest compatible **Node.js** version installed.

```sh
# Clone repository
$ git clone https://github.com/ricoerlanggaa/lumea.git
$ cd lumea

# Install dependencies
$ npm install
```

## 🏗️ Running the Project

### Development Mode
```sh
$ npm run dev
```
Access the application at [http://localhost:3000](http://localhost:3000).

### Build for Production
```sh
$ npm run build
$ npm start
```

### Running with Docker

Ensure you have **Docker** and **Docker Compose** installed.

```sh
# Build and start the container
$ docker-compose up --build
```
Access the application at [http://localhost:3000](http://localhost:3000).

To stop the container:
```sh
$ docker-compose down
```

## 🧪 Testing

Run tests with Jest:
```sh
$ npm run test
```

## 📖 Component Documentation

The components used in this project are documented in Storybook.

🔗 [Component Documentation](https://lumea-ui.netlify.app)

To run Storybook locally:
```sh
$ npm run storybook
```

## 🛠️ Additional Configuration

- **.env** - Environment configuration for API and other variables.
