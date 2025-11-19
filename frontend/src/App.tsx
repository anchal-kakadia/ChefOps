import { useState, useEffect, useCallback } from "react";
import { MenuList } from "./components/MenuList";
import { MenuUpdateForm } from "./components/MenuUpdateForm";
import { MenuItem } from "./types/menu.types";
import { api } from "./services/api";

function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "available" | "specials">("all");

  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      let items: MenuItem[];

      switch (filter) {
        case "available":
          items = await api.getAvailableMenuItems();
          break;
        case "specials":
          items = await api.getSpecialMenuItems();
          break;
        default:
          items = await api.getAllMenuItems();
      }

      setMenuItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load menu");
    } finally {
      setLoading(false);
    }
  }, [filter]); // Add filter as dependency here

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]); // Now include fetchMenuItems

  const handleUpdateItem = async (id: string, updates: Partial<MenuItem>) => {
    await api.updateMenuItem(id, updates);
    await fetchMenuItems();
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: "32px" }}>
            🍕 ChefOps Cloud Kitchen
          </h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>
            Serving seamless deployments, hot and ready
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: "white",
          padding: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", color: "#555" }}>Filter:</span>
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "8px 16px",
              backgroundColor: filter === "all" ? "#2c3e50" : "white",
              color: filter === "all" ? "white" : "#2c3e50",
              border: "1px solid #2c3e50",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            All Items
          </button>
          <button
            onClick={() => setFilter("available")}
            style={{
              padding: "8px 16px",
              backgroundColor: filter === "available" ? "#28a745" : "white",
              color: filter === "available" ? "white" : "#28a745",
              border: "1px solid #28a745",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Available Only
          </button>
          <button
            onClick={() => setFilter("specials")}
            style={{
              padding: "8px 16px",
              backgroundColor: filter === "specials" ? "#ff6b6b" : "white",
              color: filter === "specials" ? "white" : "#ff6b6b",
              border: "1px solid #ff6b6b",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Today&apos;s Specials
          </button>
          <button
            onClick={fetchMenuItems}
            style={{
              marginLeft: "auto",
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <div style={{ fontSize: "24px", marginBottom: "12px" }}>⏳</div>
            <div>Loading menu...</div>
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && menuItems.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🍽️</div>
            <div>No items found for this filter</div>
          </div>
        )}

        {!loading && !error && menuItems.length > 0 && (
          <>
            <div
              style={{
                marginBottom: "16px",
                padding: "12px",
                backgroundColor: "#e3f2fd",
                borderRadius: "6px",
                color: "#1565c0",
              }}
            >
              💡 <strong>Admin Tip:</strong> Click on any menu item to update
              its price, availability, or special status
            </div>
            <MenuList items={menuItems} onSelectItem={setSelectedItem} />
          </>
        )}
      </main>

      {/* Update Modal */}
      {selectedItem && (
        <MenuUpdateForm
          item={selectedItem}
          onUpdate={handleUpdateItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default App;