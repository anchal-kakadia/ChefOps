import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";

const menuService = new MenuService();

export const getAllMenuItems = (_req: Request, res: Response): void => {
  try {
    const items = menuService.getAllItems();
    res.json({ success: true, data: items });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch menu items" });
  }
};

export const getMenuItem = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const item = menuService.getItemById(id);

    if (!item) {
      res.status(404).json({ success: false, error: "Item not found" });
      return;
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch menu item" });
  }
};

export const getAvailableMenuItems = (_req: Request, res: Response): void => {
  try {
    const items = menuService.getAvailableItems();
    res.json({ success: true, data: items });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch available items" });
  }
};

export const getSpecialMenuItems = (_req: Request, res: Response): void => {
  try {
    const items = menuService.getSpecialItems();
    res.json({ success: true, data: items });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch special items" });
  }
};

export const updateMenuItem = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate update fields
    const allowedUpdates = ["price", "available", "isSpecial"];
    const updateKeys = Object.keys(updates);
    const isValidUpdate = updateKeys.every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidUpdate) {
      res.status(400).json({
        success: false,
        error: "Invalid updates. Allowed: price, available, isSpecial",
      });
      return;
    }

    if (
      updates.price !== undefined &&
      (typeof updates.price !== "number" || updates.price < 0)
    ) {
      res
        .status(400)
        .json({ success: false, error: "Price must be a positive number" });
      return;
    }

    const updatedItem = menuService.updateItem(id, updates);

    if (!updatedItem) {
      res.status(404).json({ success: false, error: "Item not found" });
      return;
    }

    res.json({ success: true, data: updatedItem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to update menu item" });
  }
};

export const createMenuItem = (req: Request, res: Response): void => {
  try {
    const { name, description, price, category, available, isSpecial } =
      req.body;

    // Validation
    if (!name || !description || price === undefined || !category) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: name, description, price, category",
      });
      return;
    }

    if (typeof price !== "number" || price < 0) {
      res
        .status(400)
        .json({ success: false, error: "Price must be a positive number" });
      return;
    }

    const newItem = menuService.createItem({
      name,
      description,
      price,
      category,
      available: available !== undefined ? available : true,
      isSpecial: isSpecial || false,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to create menu item" });
  }
};

export const deleteMenuItem = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const deleted = menuService.deleteItem(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: "Item not found" });
      return;
    }

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to delete menu item" });
  }
};
