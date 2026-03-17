/**
 * Layout principal de la aplicación
 */
function Layout({ children }) {
  return (
    <div className="app">
      <nav
        style={{
          background: '#1a202c',
          color: 'white',
          padding: '1rem 2rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ margin: 0 }}>Panel Administrativo</h2>
        </div>
      </nav>
      <main>{children}</main>
      <footer
        style={{
          marginTop: '4rem',
          padding: '2rem',
          textAlign: 'center',
          color: '#718096',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <p>Panel Administrativo - CRUD con Node.js + React + Prisma</p>
      </footer>
    </div>
  );
}

export default Layout;
