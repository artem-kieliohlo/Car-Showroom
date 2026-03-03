
# 🚗 Car Showroom

A single-page application (SPA) of a virtual car showroom built with React.  
Users can browse vehicles, filter them, open a specific vehicle page, and leave comments.

🔗 **Live demo:**  
https://car-showroom-theta.vercel.app/

---

# 📦 Installation and Local Setup

## 1. Clone the repository

```bash
git clone https://github.com/artem-kieliohlo/Car-Showroom.git
cd Car-Showroom
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run in development mode

```bash
npm run dev
```

After starting the development server, the application will be available at:

```
http://localhost:5173
```

> If a different port is used, it will be shown in the terminal.

## 4. Production build (optional)

```bash
npm run build
npm run preview
```

---

# 🧠 Tech Stack

* **React**
* **TypeScript**
* **React Router**
* **Redux Toolkit**
* **RTK Query**
* **React Hook Form**
* **Zod**
* **clsx**
* CSS (component-based structure)

---

# ⚙️ Implemented Features

## Home Page `/`

* Fetching vehicle list via **RTK Query**
* Search by title, brand, and tags
* Filtering by brand
* Handling query states:

  * loading
  * error
  * empty state
* Navigation to vehicle details page

---

## Vehicle Page `/vehicles/:vehicleId`

* Fetching vehicle data by ID via RTK Query
* Image gallery
* Detailed vehicle information
* 404 handling (Vehicle not found)
* Request error handling

---

## Comments

* Displaying reviews from API
* Adding user comments
* Form validation using **React Hook Form + Zod**
* Persisting comments in **localStorage**
* Automatic comment restoration on page reload (hydration via `preloadedState`)

---

# 🗂 Project Structure

```
src/
 ├── app/
 │   ├── layouts/
 │   └── store/
 │
 ├── features/
 │   ├── vehicles/
 │   └── comments/
 │
 ├── shared/
 │   ├── api/
 │   ├── storage/
 │   ├── ui/
 │   └── utils/
 │
 ├── pages/
 │   ├── HomePage/
 │   └── VehiclePage/
```

### Architectural Principles

* Feature-based project structure
* RTK Query for API communication
* Redux slice for UI state (filters) and local comments
* Shared utilities and UI components placed under `shared`
* Comment state hydration implemented via `preloadedState`

---

# 🧩 Implementation Highlights

* Unified query state handler component (`QueryState`)
* Separation of API reviews and local comments with merge on presentation layer
* Strict API response typing
* Minimal and responsive UI without external UI frameworks

---

# 🚀 Deployment

The application is deployed on **Vercel**.
Production build is generated automatically during deployment.
