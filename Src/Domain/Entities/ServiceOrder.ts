import {Customer} from "./Customer";
import {Vehicle} from "./Vehicle";
import {Item} from "./Items";
import {Service} from "./Service";
import {Status} from "../Object-Values/Status";

type OSProperties = {
    readonly osId?: number | string;
    readonly Customer: Customer;
    readonly osCreatedAt: Date;
    readonly osVehicle: Vehicle;
    osDiagnosis: string[];
    osItems: Item[];
    osServices: Service[];
    osSolutions: string[];
    osStatus: Status;
    osFinishedAt: Date;
};

export class ServiceOrder {
    private osProperties: OSProperties;

    constructor(parProperties: OSProperties) {
        // Create if statements for constructor;
        this.osProperties = parProperties;
    }

    // Methods
    addDiagnosis(newDiagnosis: string) {
        if (this.cannotAdd()) {
            throw new Error("Cannot add diagnosis to this service order status.");
        }
        this.osProperties.osDiagnosis.push(newDiagnosis);
    }

    addItem(newItem: Item): void {
        if (this.cannotAdd()) {
            throw new Error("Cannot add item to this service order status.");
        }
        this.osProperties.osItems.push(newItem);
    }

    addService(newService: Service): void {
        if (this.cannotAdd()) {
            throw new Error("Cannot add service to this service order status");
        }
        this.osProperties.osServices.push(newService);
    }

    addSolution(newSolution: string): void {
        if (this.osProperties.osStatus !== "Finished") {
            throw new Error("Solution must be inserted when service order is finished.");
        }
        this.osProperties.osSolutions.push(newSolution);
    }

    getTotalItemPrice(): number {
        let totalSum: number = 0;
        for (const _Item of this.osProperties.osItems) {
            totalSum += _Item.getItemPrice();
        }
        return totalSum;
    }

    getTotalServicePrice(): number {
        let totalSum: number = 0;
        for (const _Service of this.osProperties.osServices) {
            totalSum += _Service.getServicePrice();
        }
        return totalSum;
    }

    getTotalOSPrice(): number {
        return this.getTotalItemPrice() + this.getTotalServicePrice();
    }

    private cannotAdd(): boolean {
        const blockedStatus = [
            "Received",
            "Finished",
            "Delivered"
        ];
        return blockedStatus.includes(this.osProperties.osStatus);
    }


 }



