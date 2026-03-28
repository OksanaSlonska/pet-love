# 🐾 PetLove — Social Platform for Pet Lovers

**PetLove** is a modern, full-featured React application designed for finding pets, browsing pet-related news, and managing a personal pet owner profile. This project demonstrates a robust architecture using the latest frontend technologies and best practices.

## 🚀 Key Features

- **User Authentication:** Full registration and login flow with secure token management.
- **User Profile:** Personal dashboard where users can update their information and view their pets.
- **Pet Marketplace (Notices):** Advanced filtering by category (sell, lost, in good hands), gender, and pet type.
- **News Feed:** Real-time news list with search functionality and smooth pagination.
- **My Pets:** A dedicated section to add and manage your own pets with form validation.
- **Favorites:** One-click "Add to Favorites" functionality for pet notices.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop views.

## 🛠 Tech Stack

- **Core:** React 18, TypeScript, Vite.
- **State Management:** Redux Toolkit (Slices, Operations, Selectors).
- **Routing:** React Router DOM (with Private and Restricted route logic).
- **API:** Axios (Global configuration with `baseURL` and Auth headers).
- **Forms:** React Hook Form + Yup (schema-based validation).
- **Styling:** CSS Modules, Modern-normalize.
- **UI Components:** React-spinners, React-paginate, Lucide-react (Icons).

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/OksanaSlonska/pet-love
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add:
    ```env
    VITE_API_BASE_URL=https://petlove.b.goit.study/api
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
5.  **Build for production:**
    ```bash
    npm run build
    ```

## 🏗 Project Architecture

The project follows a clean, modular structure:

- `src/redux` — Global state logic separated by features (auth, pets, notices).
- `src/pages` — View components for each route.
- `src/components` — Reusable UI elements (Modals, Forms, Navigation).
- `src/types` — Centralized TypeScript interfaces and types.
- `src/hooks` — Custom React hooks for shared logic.

---
