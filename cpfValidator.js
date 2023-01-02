function ValidatorCPF (cpfSended){
    Object.defineProperty(this, 'cleancpf', {
        enumerable: true,
        get: function(){
            return cpfSended.replace(/\D+/g, '');

            // This get is used for extract only the CPF numbers.
        }
    });
}

ValidatorCPF.prototype.validates = function(){
    if (typeof this.cleancpf === 'undefined') return false;
    if (this.cleancpf.length !== 11) return false;
    if (this.sequency()) return false;

    // That conditional loop is used to know if 

    const cpfInitial = this.cleancpf.slice(0, -2);
    const digitOne = this.charCount(cpfInitial);
    const digitTwo = this.charCount(cpfInitial + digitOne);

    const newCpf = cpfInitial + digitOne + digitTwo;
    return newCpf === this.cleancpf;
}

ValidatorCPF.prototype.charCount = (cpfInitial) => {
    const cpfArray = Array.from(cpfInitial);
    let regressive = cpfArray.length + 1;

    const total = cpfArray.reduce((ac, val) => {
        ac += (regressive * Number(val));
        regressive --;
        return ac;
    }, 0);

    const digit = 11 - (total % 11);
    return digit > 9 ? '0' : String(digit);
};

ValidatorCPF.prototype.sequency = function(){
    const sequency = this.cleancpf[0].repeat(this.cleancpf.length);
    return sequency === this.cleancpf;
};

