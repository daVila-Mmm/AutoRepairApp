import {Vehicle} from "../../Domain/Entities/Vehicle";
import {Plate} from "../../Domain/Object-Values/Plate";

export interface IVehicleRepository {
    createVehicle(newVehicle: Vehicle): Promise<Vehicle>;
    deleteVehicle(vehicleId: number | string): Promise<void>;

    findById(vehicleId: number | string): Promise<Vehicle | null>;
    findByPlate(vehiclePlate: Plate): Promise<Vehicle | null>;
}