 export class Plate {
    private readonly plateValue: string;

    constructor(parValue: string) {
        const defRegex: RegExp = /^[A-Z]{3}\d{4}$/;
        const mercRegex: RegExp = /^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/; 
        const normPlate = parValue.
            trim().
            replace("-", "").
            toUpperCase();

        const matchDef = normPlate.match(defRegex);
        const matchMerc = normPlate.match(mercRegex);
        
        if (!matchDef && !matchMerc) {
            throw new Error("Invalid plate.");
        }

        this.plateValue = normPlate;
    }

    getPlateValue() {
        return this.plateValue;
    }
}