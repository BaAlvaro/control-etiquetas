const layoutStyle = {
  display: "flex",
  height: "100vh",
  width: "100%",
};

const sidebarStyle = {
  width: "250px",
  background: "#111827",
  color: "white",
  padding: "1.5rem",
  boxSizing: "border-box",
};

const contentStyle = {
  flex: 1,
  padding: "2rem",
  overflowY: "auto",
  background: "#1f2937",
  color: "white",
};

const MainLayout = ({ sidebar, children }) => {
  return (
    <div style={layoutStyle}>
      <aside style={sidebarStyle}>
        {sidebar}
      </aside>

      <main style={contentStyle}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
