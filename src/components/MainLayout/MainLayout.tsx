import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

// import Header from "../Header/Header";

// import Loader from '../Loader/Loader';

const MainLayout: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* ---  ДЛЯ ТЕСТУ --- */}
      <header
        style={{
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
          paddingBottom: "10px",
        }}
      >
        <nav style={{ display: "flex", gap: "15px" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({ color: isActive ? "orange" : "blue" })}
          >
            Home
          </NavLink>
          <NavLink
            to="/news"
            style={({ isActive }) => ({ color: isActive ? "orange" : "blue" })}
          >
            News
          </NavLink>
          <NavLink
            to="/notices"
            style={({ isActive }) => ({ color: isActive ? "orange" : "blue" })}
          >
            Find Pet
          </NavLink>
          <NavLink
            to="/friends"
            style={({ isActive }) => ({ color: isActive ? "orange" : "blue" })}
          >
            Friends
          </NavLink>
        </nav>
      </header>
      {/* -------------------------------- */}

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
