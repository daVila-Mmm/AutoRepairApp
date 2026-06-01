export class Cpf {
    private readonly cpfValue: string;

    constructor(parCpf: string) {
        const defCpf: RegExp = /^\d{11}$/;

        const normCpf = parCpf.
        trim().
        replace(/\D/g, "");

        if(!defCpf.test(normCpf)) {
            throw new Error("Invalid CPF.");
        }

        this.cpfValue = normCpf;
    }

    getCpfValue() {
        return this.cpfValue;
    }

}