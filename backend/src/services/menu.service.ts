import fs from 'fs';
import path from 'path';
import { MenuItem, MenuUpdateRequest } from '../models/menu.model';

const MENU_FILE_PATH = path.join(__dirname, '../data/menu.json');

// eslint-disable-next-line import/prefer-default-export
export class MenuService {
  // eslint-disable-next-line class-methods-use-this
  private readMenuData(): { items: MenuItem[] } {
    const data = fs.readFileSync(MENU_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  }

  // eslint-disable-next-line class-methods-use-this
  private writeMenuData(data: { items: MenuItem[] }): void {
    fs.writeFileSync(MENU_FILE_PATH, JSON.stringify(data, null, 2));
  }

  getAllItems(): MenuItem[] {
    const data = this.readMenuData();
    return data.items;
  }

  getItemById(id: string): MenuItem | null {
    const data = this.readMenuData();
    const item = data.items.find((i) => i.id === id);
    return item || null;
  }

  getAvailableItems(): MenuItem[] {
    const data = this.readMenuData();
    return data.items.filter((item) => item.available);
  }

  getSpecialItems(): MenuItem[] {
    const data = this.readMenuData();
    return data.items.filter((item) => item.isSpecial && item.available);
  }

  updateItem(id: string, updates: MenuUpdateRequest): MenuItem | null {
    const data = this.readMenuData();
    const itemIndex = data.items.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      return null;
    }

    data.items[itemIndex] = {
      ...data.items[itemIndex],
      ...updates,
    };

    this.writeMenuData(data);
    return data.items[itemIndex];
  }

  createItem(item: Omit<MenuItem, 'id'>): MenuItem {
    const data = this.readMenuData();
    const newId = (
      Math.max(...data.items.map((i) => parseInt(i.id, 10))) + 1
    ).toString();

    const newItem: MenuItem = {
      id: newId,
      ...item,
    };

    data.items.push(newItem);
    this.writeMenuData(data);
    return newItem;
  }

  deleteItem(id: string): boolean {
    const data = this.readMenuData();
    const initialLength = data.items.length;
    data.items = data.items.filter((i) => i.id !== id);

    if (data.items.length === initialLength) {
      return false;
    }

    this.writeMenuData(data);
    return true;
  }
}
