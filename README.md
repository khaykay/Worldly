# Countries Explorer Application

This is a **Countries Explorer Application** built with:

- React
- TypeScript
- GraphQL

It allows users to:

- View a list of countries.
- Search for countries by name.
- Filter by region or language.
- Sort by name, population, or area.
- View detailed country information.

## 💻 Demo

https://worldyapp.netlify.app/

## Features

- **Search Bar:** Search for countries by name with debounce functionality for optimized user experience.
- **Dynamic Filters:** Filter by region or languages available in the data.
- **Sorting Options:** Sort countries by name, population, or area.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Installation

To run the application locally, follow these steps:
Clone the repository:

```bash
git clone https://github.com/your-username/countries-explorer.git
cd countries-explorer
```

Install dependencies:

```bash

  npm install
```

Create an .env file in the root directory and add your API key:

```plaintext

  REACT_APP_API_KEY=your_api_key_here
```

Start the development server:

```
bash
npm start
```

## GraphQL Queries

The application uses the following GraphQL queries:

GET_COUNTRIES: Fetches countries with details like name, region, population, area, languages, and flags.
Folder Structure

```folder structure

src/
├── components/         # React components
├── GraphQL/            # GraphQL queries
├── types/              # TypeScript types and interfaces
├── styles/             # CSS or TailwindCSS classes
├── App.tsx             # Main application component
└── index.tsx           # Entry point
```

## Architecture and Design

The application is designed with a modular component-based architecture using React.js and TypeScript, ensuring scalability, maintainability, and clear code structure. For data persistence, we utilized localStorage, which not only retains user data across sessions but also eliminates unnecessary API calls by serving data directly from the browser storage. This approach enhances performance and reduces latency, making the application faster and more efficient.

Styling was implemented with TailwindCSS, allowing for a responsive and visually appealing user interface with minimal overhead. These choices create a lightweight, user-friendly application, balancing simplicity with functionality for an optimized user experience. For stakeholders, this architecture ensures a robust, low-maintenance product that prioritizes speed and reliability without over-reliance on server-side infrastructure.

## Challenges Faced

One challenge was balancing performance with simplicity. By choosing to persist data locally, I reduced the need for frequent API calls, which improved the app’s speed. However, it also meant meticulously handling edge cases like data synchronization and ensuring updates were reflected instantly on the UI without adding unnecessary complexity.

If I had more time, I would’ve implemented an intelligent syncing mechanism, combining localStorage with a lightweight IndexedDB or server-side fallback for scalability and integrate unit testing for key functionalities to ensure long-term reliability. While the current solution delivers on speed and efficiency, these additional layers would’ve elevated the app to handle even more complex scenarios gracefully

## Acknowledgments

Data sourced from a GraphQL countries API.
Developed with ❤️ by Khaykay.
