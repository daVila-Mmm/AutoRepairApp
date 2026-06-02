import {Customer} from "../../Domain/Entities/Customer";
import {Cpf} from "../../Domain/Object-Values/Cpf";

export interface ICustomerRepository {
    createCustomer(newCustomer: Customer): Promise<Customer>;
    deleteCustomer(customerId: number | string): Promise<void>;

    findById(customerId: number | string): Promise<Customer | null>;
    findByCpf(customerCpf: Cpf): Promise<Customer | null>;
}

