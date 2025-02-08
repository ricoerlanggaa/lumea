# Lumea

Lumea is a frontend project developed using modern technologies to create a fast, responsive, and scalable user experience.

## Tech Stack

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

## Installation

Ensure you have the latest compatible **Node.js** version installed.

```sh
# Clone repository
$ git clone https://github.com/ricoerlanggaa/lumea.git
$ cd lumea

# Install dependencies
$ npm install
```

## Running the Project

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

## Testing

Run tests with Jest:
```sh
$ npm run test
```

## Component Documentation

The components used in this project are documented in Storybook.

🔗 [Component Documentation](https://lumea-ui.netlify.app)

To run Storybook locally:
```sh
$ npm run storybook
```

## Project Structure

```
lumea/
├── .changeset/         # Changeset versioning system
├── .github/            # GitHub Actions and workflow configurations
├── .storybook/         # Storybook configuration files
├── public/             # Static assets like images and fonts
├── src/                # Source code directory
│   ├── app/            # Next.js app directory (if using App Router)
│   ├── components/     # Reusable UI components
│      ├── atoms/       # Smallest UI elements (buttons, inputs)
│      ├── molecules/   # Combination of atoms (cards, modals)
│      ├── organisms/   # Larger UI structures (headers, sections)
│      └── templates/   # Full-page layouts
│   ├── contexts/       # React Context for global state management
│   ├── hooks/          # Custom hooks
│   ├── providers/      # Providers for app-wide dependencies
│   ├── services/       # API calls and business logic
│   ├── store/          # Redux store and slices
│   ├── stories/        # Storybook stories for UI components
│   ├── styles/         # Global and component-specific styles
│   ├── tests/          # Unit and integration tests
│   ├── types/          # TypeScript types and interfaces
│   ├── utilities/      # Helper functions and utilities
│   └── middleware.ts   # API middleware (if needed)
├── .dockerignore       # Files to ignore in Docker builds
├── .env                # Environment variables
├── .env.example        # Sample environment file
├── .eslintrc.json      # ESLint configuration
├── .nvmrc              # Node.js version configuration
├── .prettierrc.json    # Prettier configuration
├── CHANGELOG.md        # Changelog file
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile           # Docker container setup
├── jest.config.ts       # Jest configuration file
├── jest.setup.ts       # Jest setup file
├── netlify.toml        # Netlify deployment settings
├── next.config.ts       # Next.js configuration
├── package.json        # Project dependencies and scripts
├── postcss.config.mjs   # PostCSS configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Commit Message Convention

Lumea follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages:

- **feat:** Introduce a new feature
- **fix:** Fix a bug
- **docs:** Update documentation
- **style:** Format or style updates (no logic changes)
- **refactor:** Code restructuring without changing functionality
- **perf:** Performance improvements
- **test:** Add or update tests
- **chore:** Maintenance changes (build, dependencies, CI/CD)
- **revert:** Revert a previous commit

**Example Commit Message:**
```sh
git commit -m "feat(auth): add JWT authentication support"
```

## Additional Configuration

- **.env** - Environment configuration for API and other variables.
