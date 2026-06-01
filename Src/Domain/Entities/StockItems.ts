type StockItemProperties = {
    stockItemId?: number | string;
    stockItemName: string;
    stockItemUnitPrice: number;
    stockItemQuantity: number;
};

export class StockItem {
    private stockItemProperties: StockItemProperties;

    constructor(parProperties: StockItemProperties) {
        if (!parProperties.stockItemName) {
            throw new Error("Stock item name is required");
        }

        if (parProperties.stockItemUnitPrice <= 0) {
            throw new Error("Stock item unit price must be greater than 0");
        }

        if (parProperties.stockItemQuantity < 0) {
            throw new Error("Stock item quantity cannot be negative");
        }

        this.stockItemProperties = parProperties;
    }

    chQuantity(newQtt: number): void {
        if (newQtt < 0) {
            throw new Error("Stock item quantity cannot be negative");
        }

        this.stockItemProperties.stockItemQuantity = newQtt;
    }

    addStock(amount: number): void {
        if (amount <= 0) {
            throw new Error("Amount to add must be greater than 0");
        }

        this.stockItemProperties.stockItemQuantity += amount;
    }

    removeStock(amount: number): void {
        if (amount <= 0) {
            throw new Error("Amount to remove must be greater than 0");
        }

        if (amount > this.stockItemProperties.stockItemQuantity) {
            throw new Error("Not enough stock available");
        }

        this.stockItemProperties.stockItemQuantity -= amount;
    }

    chUnitPrice(newPrice: number): void {
        if (newPrice <= 0) {
            throw new Error("Stock item unit price must be greater than 0");
        }

        this.stockItemProperties.stockItemUnitPrice = newPrice;
    }

    getStockItemName(): string {
        return this.stockItemProperties.stockItemName;
    }

    getStockItemUnitPrice(): number {
        return this.stockItemProperties.stockItemUnitPrice;
    }

    getStockItemQtt(): number {
        return this.stockItemProperties.stockItemQuantity;
    }

    getTotalStockValue(): number {
        return this.stockItemProperties.stockItemUnitPrice * this.stockItemProperties.stockItemQuantity;
    }

}
