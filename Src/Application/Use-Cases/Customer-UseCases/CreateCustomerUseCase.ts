import {Cpf} from "../../../Domain/Object-Values/Cpf";
import {Email} from "../../../Domain/Object-Values/Email";
import {Phone} from "../../../Domain/Object-Values/Phone";
import {Customer} from "../../../Domain/Entities/Customer";
import {IUserRepository} from "../../IRepositories/IUserRepository";


type Input = {
    inName: string;
    inSurname: string;
    inCpf: string;
    inEmail: string;
    inPhone: string;
}

export class CreateCustomerUseCase {
    constructor(
        private readonly customerRepository : IUserRepository
    ) {}

    async createCustomer(newCustomer: Input): Promise<Customer> {
        const custCpf = new Cpf(newCustomer.inCpf);
        const custEmail = new Email(newCustomer.inEmail);
        const custPhone = new Phone(newCustomer.inPhone);

        const customerExists =
            await this.customerRepository.findByCpf(custCpf);

        if (customerExists) {
            throw new Error("Customer already registered.");
        }

        const _Customer = new Customer({
            customerName: newCustomer.inName,
            customerSurname: newCustomer.inSurname,
            customerCpf: custCpf,
            customerEmail: custEmail,
            customerPhone: custPhone,
        });

        await this.customerRepository.createCustomer(_Customer);

        return _Customer;
    }
}