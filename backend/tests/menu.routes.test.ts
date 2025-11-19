import request from "supertest";
import app from "../src/index";

describe("Menu API Endpoints", () => {
  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", "ok");
    });
  });

  describe("GET /api/menu", () => {
    it("should return all menu items", async () => {
      const response = await request(app).get("/api/menu");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("GET /api/menu/available", () => {
    it("should return only available items", async () => {
      const response = await request(app).get("/api/menu/available");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.every((item: any) => item.available)).toBe(
        true
      );
    });
  });

  describe("GET /api/menu/:id", () => {
    it("should return a specific menu item", async () => {
      const response = await request(app).get("/api/menu/1");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe("1");
    });

    it("should return 404 for non-existent item", async () => {
      const response = await request(app).get("/api/menu/999");
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("PATCH /api/menu/:id", () => {
    it("should update menu item availability", async () => {
      const response = await request(app)
        .patch("/api/menu/1")
        .send({ available: false });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Restore state
      await request(app).patch("/api/menu/1").send({ available: true });
    });

    it("should reject invalid updates", async () => {
      const response = await request(app)
        .patch("/api/menu/1")
        .send({ invalidField: "test" });

      expect(response.status).toBe(400);
    });

    it("should reject invalid price", async () => {
      const response = await request(app)
        .patch("/api/menu/1")
        .send({ price: -5 });

      expect(response.status).toBe(400);
    });
  });
});
