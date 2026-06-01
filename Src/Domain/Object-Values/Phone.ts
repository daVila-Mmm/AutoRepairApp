export class Phone {
    private readonly phoneValue: string;

    constructor(parPhone: string) {
        const defPhone: RegExp = /^\d{10,11}$/;

        const normPhone = parPhone.
        trim().
        replace(/\D/g, "");

        if(!defPhone.test(normPhone)) {
            throw new Error("Invalid phone.");
        }

        this.phoneValue = normPhone;
    }

    getPhoneValue() {
        return this.phoneValue;
    }

}
