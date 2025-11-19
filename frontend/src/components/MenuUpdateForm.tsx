import React, { useState, useEffect } from "react";
import { MenuItem } from "../types/menu.types";

interface MenuUpdateFormProps {
  item: MenuItem | null;
  onUpdate: (id: string, updates: Partial<MenuItem>) => Promise<void>;
  onClose: () => void;
}

export const MenuUpdateForm: React.FC<MenuUpdateFormProps> = ({
  item,
  onUpdate,
  onClose,
}) => {
  const [price, setPrice] = useState<string>("");
  const [available, setAvailable] = useState<boolean>(true);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (item) {
      setPrice(item.price.toString());
      setAvailable(item.available);
      setIsSpecial(item.isSpecial || false);
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const updates: Partial<MenuItem> = {
        price: parseFloat(price),
        available,
        isSpecial,
      };

      await onUpdate(item.id, updates);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#333" }}>Update Menu Item</h2>
        <h3 style={{ color: "#666", fontWeight: "normal", marginTop: "8px" }}>
          {item.name}
        </h3>

        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                style={{
                  marginRight: "8px",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontWeight: "bold", color: "#555" }}>
                Available for ordering
              </span>
            </label>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={isSpecial}
                onChange={(e) => setIsSpecial(e.target.checked)}
                style={{
                  marginRight: "8px",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontWeight: "bold", color: "#555" }}>
                Mark as Today's Special
              </span>
            </label>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: loading ? "#ccc" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Updating..." : "Update Item"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
