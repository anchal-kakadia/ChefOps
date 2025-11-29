import React from "react";
import { MenuItem } from "../types/menu.types";

interface MenuListProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

export const MenuList: React.FC<MenuListProps> = ({ items, onSelectItem }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectItem(item)}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            cursor: "pointer",
            transition: "all 0.3s",
            backgroundColor: item.available ? "#fff" : "#f5f5f5",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {item.isSpecial && (
            <span
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "#ff6b6b",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              ⭐ SPECIAL
            </span>
          )}

          <h3 style={{ marginTop: 0, color: "#333" }}>{item.name}</h3>
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "12px" }}>
            {item.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ fontSize: "18px", fontWeight: "bold", color: "#2c3e50" }}
            >
              ${item.price.toFixed(2)}
            </span>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                backgroundColor: item.available ? "#d4edda" : "#f8d7da",
                color: item.available ? "#155724" : "#721c24",
              }}
            >
              {item.available ? "✓ Available" : "✗ Out of Stock"}
            </span>
          </div>

          <div style={{ marginTop: "8px", fontSize: "12px", color: "#999" }}>
            {item.category}
          </div>
        </div>
      ))}
    </div>
  );
};
