import { MenuService } from "../src/services/menu.service";

describe("MenuService", () => {
  let menuService: MenuService;

  beforeEach(() => {
    menuService = new MenuService();
  });

  describe("getAllItems", () => {
    it("should return all menu items", () => {
      const items = menuService.getAllItems();
      expect(items).toBeDefined();
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe("getItemById", () => {
    it("should return an item by id", () => {
      const item = menuService.getItemById("1");
      expect(item).toBeDefined();
      expect(item?.id).toBe("1");
    });

    it("should return null for non-existent id", () => {
      const item = menuService.getItemById("999");
      expect(item).toBeNull();
    });
  });

  describe("getAvailableItems", () => {
    it("should return only available items", () => {
      const items = menuService.getAvailableItems();
      expect(items.every((item) => item.available)).toBe(true);
    });
  });

  describe("getSpecialItems", () => {
    it("should return only special and available items", () => {
      const items = menuService.getSpecialItems();
      expect(items.every((item) => item.isSpecial && item.available)).toBe(
        true
      );
    });
  });

  describe("updateItem", () => {
    it("should update item availability", () => {
      const updated = menuService.updateItem("1", { available: false });
      expect(updated).toBeDefined();
      expect(updated?.available).toBe(false);

      // Restore original state
      menuService.updateItem("1", { available: true });
    });

    it("should update item price", () => {
      const originalItem = menuService.getItemById("1");
      const newPrice = 15.99;

      const updated = menuService.updateItem("1", { price: newPrice });
      expect(updated).toBeDefined();
      expect(updated?.price).toBe(newPrice);

      // Restore original state
      if (originalItem) {
        menuService.updateItem("1", { price: originalItem.price });
      }
    });

    it("should return null for non-existent item", () => {
      const updated = menuService.updateItem("999", { available: false });
      expect(updated).toBeNull();
    });
  });
});
