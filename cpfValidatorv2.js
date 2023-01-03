class Validate {
    constructor(cpf){

        // That part is responsable for cleaning. The CPF will lost the '.' and the '-' and became an unique string with the numbers
        // Using the object properties to avoid changes.

        Object.defineProperty(this, 'cleanCPF', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpf.replace(/\D+/g, '')
        });
    }

    // Method to know if the CPF number is a Sequency, using repeat to show the same number nine times.
    sequency (){
        return this.cleanCPF.charAt(0).repeat(11) === this.cleanCPF;
    }

   // Uset to join the CPF digits, its part of the validation.

    createNewcpf(){
        const noDigit = this.cleanCPF.slice(0, -2);
        const digitOne = Validate.digitGenerate(noDigit);
        const digitTwo = Validate.digitGenerate(noDigit + digitOne);
        this.newCpf = noDigit + digitOne + digitTwo;
    } 

     // Used to create the CPF digits to made the correct validation.

    static digitGenerate(noDigit){
        let total = 0;
        let reverse = noDigit.length + 1;

        for(let numbString of noDigit){
            total += reverse * Number(numbString);
            reverse--;
        }

        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : '0';
    }

    // Conditions to validate the CPF number, in case of being without numbers, empty and the correct length.

    validates(){
        if(!this.cleanCPF) return false;
        if(typeof this.cleanCPF !== 'string') return false;
        if(this.cleanCPF.length !== 11) return false;
        if(this.sequency()) return false; 
        this.createNewcpf()

        
        return this.newCpf === this.cleanCPF;
    }
}


