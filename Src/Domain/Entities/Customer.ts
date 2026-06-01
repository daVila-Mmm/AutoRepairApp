import {Email} from "../Object-Values/Email";
import {Phone} from "../Object-Values/Phone";
import {Cpf} from "../Object-Values/Cpf";
import {Vehicle} from "./Vehicle";

type CustomerProperties = {
    customerId?: number | string;
    customerName: string;
    customerSurname: string;
    customerCpf: Cpf;
    customerEmail: Email;
    customerPhone: Phone[];
    customerVehicle: Vehicle[];
}

export class Customer {
    private customerProperties: CustomerProperties;

    constructor(parProperties: CustomerProperties) {
        this.customerProperties = parProperties;
    }

    addVehicle(parNewVehicle: Vehicle): void {
        const newVehiclePlate: string = parNewVehicle.getVehiclePlate();
        const alreadyExists = this.customerProperties.customerVehicle.some(
            (arrayVehicles) => {
                return arrayVehicles.getVehiclePlate() === newVehiclePlate;
            }
        )

        if (alreadyExists) {
            throw new Error("Vehicle already registered for this customer.");
        }

        this.customerProperties.customerVehicle.push(parNewVehicle);
    }



}