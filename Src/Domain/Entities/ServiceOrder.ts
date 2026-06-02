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
        if (this.cannotModifyComposition()) {
            throw new Error("Cannot add diagnosis to this service order status.");
        }
        this.osProperties.osDiagnosis.push(newDiagnosis);
    }

    addItem(newItem: Item): void {
        if (this.cannotModifyComposition()) {
            throw new Error("Cannot add item to this service order status.");
        }
        this.osProperties.osItems.push(newItem);
    }

    removeItem(itemId: number | string): void {
        if (this.cannotModifyComposition()) {
            throw new Error("Cannot remove item from this service order status.");
        }
        const index = this.osProperties.osItems.findIndex(item => item.getItemId() === itemId);
        if (index === -1) {
            throw new Error("Item not found in this service order.");
        }
        this.osProperties.osItems.splice(index, 1);
    }

    addService(newService: Service): void {
        if (this.cannotModifyComposition()) {
            throw new Error("Cannot add service to this service order status");
        }
        this.osProperties.osServices.push(newService);
    }

    removeService(serviceId: number | string): void {
        if (this.cannotModifyComposition()) {
            throw new Error("Cannot remove service from this service order status.");
        }
        const index = this.osProperties.osServices.findIndex(service => service.getServiceId() === serviceId);
        if (index === -1) {
            throw new Error("Service not found in this service order.");
        }
        this.osProperties.osServices.splice(index, 1);
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

    private cannotModifyComposition(): boolean {
        const blockedStatus: Status[] = [
            "Received",
            "AwaitingApproval",
            "Finished",
            "Delivered",
            "Canceled"
        ];
        return blockedStatus.includes(this.osProperties.osStatus);
    }

    startDiagnosis(): void {
        if (this.osProperties.osStatus !== "Received") {
            throw new Error("Only opened services can start diagnosis");
        }
        this.osProperties.osStatus = "InDiagnosis";
    }

    sendToApproval(): void {
        if (this.osProperties.osStatus !== "InDiagnosis") {
            throw new Error("Only diagnosis orders can be sent to approval");
        }
        if (this.osProperties.osDiagnosis.length === 0) {
            throw new Error("Cannot send OS to be approved without any diagnosis");
        }
        if (this.osProperties.osItems.length === 0 && this.osProperties.osServices.length === 0) {
            throw new Error("Cannot send OS to be approved without any items or services");
        }
        this.osProperties.osStatus = "AwaitingApproval";
    }

    approve(): void {
        if (this.osProperties.osStatus !== "AwaitingApproval") {
            throw new Error("Only orders awaiting approval can be approved");
        }
        this.osProperties.osStatus = "Approved";
    }

    rejectApproval(): void {
        if (this.osProperties.osStatus !== "AwaitingApproval") {
            throw new Error("Only orders awaiting approval can be rejected");
        }
        this.osProperties.osStatus = "InDiagnosis";
    }

    startWork(): void {
        if (this.osProperties.osStatus !== "Approved") {
            throw new Error("Only approved orders can start work");
        }
        this.osProperties.osStatus = "InProgress";
    }

    finish(): void {
        if (this.osProperties.osStatus !== "InProgress") {
            throw new Error("Only orders in progress can be finished");
        }
        if (this.osProperties.osItems.length === 0) {
            throw new Error("Cannot finish an order without any items used");
        }
        this.osProperties.osStatus = "Finished";
        this.osProperties.osFinishedAt = new Date();
    }

    deliver(): void {
        if (this.osProperties.osStatus !== "Finished") {
            throw new Error("Only finished orders can be delivered");
        }
        if (this.osProperties.osSolutions.length === 0) {
            throw new Error("Cannot deliver an order without any solution registered");
        }
        this.osProperties.osStatus = "Delivered";
    }

    cancel(): void {
        if (this.osProperties.osStatus === "Delivered") {
            throw new Error("Delivered orders cannot be canceled");
        }
        if (this.osProperties.osStatus === "Canceled") {
            throw new Error("Order is already canceled");
        }
        this.osProperties.osStatus = "Canceled";
    }

    getStatus(): Status {
        return this.osProperties.osStatus;
    }
 }



