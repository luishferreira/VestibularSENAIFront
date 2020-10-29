import { Util } from './Utils'


export function validateForm(values) {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //valida cada objeto do email para ver se está vazio e adiciona no objeto errors os campos não preenchidos
    Object.keys(values).forEach(key => {
        if (!values[key]) {
            errors[key] = "*Campo obrigatório"
        }
    });

    if (values.Email && !regex.test(values.Email))
        errors.Email = "Email em um formato inválido";
    if (values.Senha && values.Senha.length < 4)
        errors.Senha = "A senha deve ter mais de 4 dígitos";

    if (values.CPF && !validateCPF(values.CPF))
        errors.CPF = "Insira um CPF válido";

    if (values.Telefone) {
        if (Util.clearTel(values.Telefone).length !== 11){
            errors.Telefone = "Insira um telefone válido";
        }
    }
    return errors;
}

const validateCPF = cpf => {
    let numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}