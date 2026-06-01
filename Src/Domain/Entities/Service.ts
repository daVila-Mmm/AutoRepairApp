type ServiceProperties = {
    serviceId?: number | string;
    serviceName: string;
    servicePrice: number;
};

export class Service {
    private serviceProperties: ServiceProperties;

    constructor(parProperties: ServiceProperties) {
        if (!parProperties.serviceName) {
            throw new Error("Service name is required");
        }

        if (parProperties.servicePrice <= 0) {
            throw new Error("Service price must be greater than 0");
        }

        this.serviceProperties = parProperties;

    }

    chPrice(newPrice: number): void {
        if (newPrice < 0) {
            throw new Error("Service price must be greater than 0");
        }
        this.serviceProperties.servicePrice = newPrice;
    }

    getServiceName(): string {
        return this.serviceProperties.serviceName;
    }

    getServicePrice(): number {
        return this.serviceProperties.servicePrice;
    }

}
