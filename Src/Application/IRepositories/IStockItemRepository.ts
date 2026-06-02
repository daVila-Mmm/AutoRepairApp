import {StockItem} from "../../Domain/Entities/StockItems";

export interface IStockItemRepository {
    createItem(newItem: StockItem): Promise<StockItem>;
    deleteItem(itemId: number | string): Promise<void>;

    findById(itemId: number | string): Promise<StockItem | null>;
    findByName(itemName: string): Promise<StockItem | null>;
    searchByName(itemName: string): Promise<StockItem[] | null>;
}