import { MenuItem, ApiResponse } from "../types/menu.types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = {
  async getAllMenuItems(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE_URL}/menu`);
    const data: ApiResponse<MenuItem[]> = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.error || "Failed to fetch menu items");
    }
    return data.data;
  },

  async getAvailableMenuItems(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE_URL}/menu/available`);
    const data: ApiResponse<MenuItem[]> = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.error || "Failed to fetch available items");
    }
    return data.data;
  },

  async getSpecialMenuItems(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE_URL}/menu/specials`);
    const data: ApiResponse<MenuItem[]> = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.error || "Failed to fetch special items");
    }
    return data.data;
  },

  async updateMenuItem(
    id: string,
    updates: Partial<MenuItem>
  ): Promise<MenuItem> {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    const data: ApiResponse<MenuItem> = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.error || "Failed to update menu item");
    }
    return data.data;
  },
};
