type ItemProperties = {
    itemId?: number | string;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
};

export class Item {
    private itemProperties: ItemProperties;

    constructor(parProperties: ItemProperties) {
        if (!parProperties.itemName) {
            throw new Error("Item name is required");
        }

        if (parProperties.itemPrice <= 0) {
            throw new Error("Item price must be greater than 0");
        }

        if (parProperties.itemQuantity <= 0) {
            throw new Error("Item quantity must be greater than 0");
        }

        this.itemProperties = parProperties;

    }

    chQuantity(newQtt: number): void {
        if (newQtt < 0) {
            throw new Error("Item quantity must be greater than 0");
        }

        this.itemProperties.itemQuantity = newQtt;
    }

    chPrice(newPrice: number): void {
        if (newPrice < 0) {
            throw new Error("Item price must be greater than 0");
        }
        this.itemProperties.itemPrice = newPrice;
    }

    getItemName(): string {
        return this.itemProperties.itemName;
    }

    getItemPrice(): number {
        const totalPrice: number = this.itemProperties.itemPrice * this.itemProperties.itemQuantity;
        return totalPrice;
    }

    getItemQtt(): number {
        return this.itemProperties.itemQuantity;
    }

}