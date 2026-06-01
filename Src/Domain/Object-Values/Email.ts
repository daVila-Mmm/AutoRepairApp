export class Email {
    private readonly emailValue: string;

    constructor(parEmail: string) {
        const defEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const normEmail = parEmail.
        trim().
        toLowerCase();

        if(!defEmail.test(normEmail)) {
            throw new Error("Invalid email.");
        }

        this.emailValue = normEmail;
    }

    getEmailValue() {
        return this.emailValue;
    }

}
