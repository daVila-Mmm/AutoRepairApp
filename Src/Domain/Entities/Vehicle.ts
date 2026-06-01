import { Plate } from "../Object-Values/Plate"

type VehicleProperties = {
    readonly vehicleId?: number | string;
    vehiclePlate: Plate;
    vehicleBrand: string;
    vehicleModel: string;
    vehicleYear: number;
};

export class Vehicle {
    private vehicleProperties: VehicleProperties;

    constructor(parProperties: VehicleProperties) {
        if (!parProperties.vehicleBrand) {
            throw new Error("Vehicle brand is required.");
        }

        this.vehicleProperties = parProperties;
    }

    getVehicleId(): number | string | undefined {
        return this.vehicleProperties.vehicleId;
    }

    getVehiclePlate(): string {
        return this.vehicleProperties.vehiclePlate.getPlateValue();
    }

    getVehicleBrand(): string {
        return this.vehicleProperties.vehicleBrand;
    }

    getVehicleModel(): string {
        return this.vehicleProperties.vehicleModel;
    }

    getVehicleYear(): number {
        return this.vehicleProperties.vehicleYear;
    }
}
