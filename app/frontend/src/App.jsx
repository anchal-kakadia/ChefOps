import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setMenu(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <h1>ChefOps Cloud Kitchen</h1>
        <p>Explore today&apos;s curated menu crafted for cloud-first operations.</p>
      </header>

      {loading && <p className="status">Loading menu...</p>}
      {error && <p className="status error">Unable to load menu: {error}</p>}

      <section className="menu">
        {menu.map((item) => (
          <article key={item.id} className="menu-item">
            <h2>{item.name}</h2>
            <p className="category">{item.category}</p>
            <p>{item.description}</p>
            <p className="price">${item.price.toFixed(2)}</p>
          </article>
        ))}
        {!loading && !error && menu.length === 0 && (
          <p className="status">No menu items available.</p>
        )}
      </section>
    </div>
  );
}

export default App;
