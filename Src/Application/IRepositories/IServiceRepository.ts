import {Service} from "../../Domain/Entities/Service";

export interface IServiceRepository {
    createService(newService: Service): Promise<Service>;
    deleteService(serviceId: number | string): Promise<void>

    findById(serviceId: number | string): Promise<Service | null>;
    findByName(serviceName: string): Promise<Service | null>;
}