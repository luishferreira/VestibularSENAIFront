// const meses = [
//     "Jan",
//     "Fev",
//     "Mar",
//     "Abr",
//     "Mai",
//     "Jun",
//     "Jul",
//     "Ago",
//     "Set",
//     "Out",
//     "Nov",
//     "Dez"
// ];

module.exports = {
    Util: {
        // dateUtils: {
        //     monthNames: meses,
        //     getMonthName: (monthIndex) => {
        //         return meses[monthIndex];
        //     }
        // },
        AcceptOnlyNumbers: str => {
            str = str.toString()
            let newstr = str.replace(/[^\d]+/g, "");
            return newstr;
        },
        AcceptOnlyLetters: str => {
            let newstr = str.replace(/[^a-zà-ú]/gi, "");
            return newstr;
        },
        IsNullOrWhiteSpace: value => {
            if (
                value === undefined ||
                value === null ||
                value === "" ||
                isNaN(value)
            )
                return true;
            return false;
        },
        isEmail: emailAddress => {
            var regexEmail = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regexEmail.test(emailAddress)) return false;
            return true;
        },
        isCPF: strCPF => {
            var Soma;
            var Resto;
            Soma = 0;
            strCPF = strCPF
                .split(".")
                .join("")
                .split("-")
                .join("");
            if (strCPF === "00000000000") return false;

            for (let i = 1; i <= 9; i++)
                Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if (Resto === 10 || Resto === 11) Resto = 0;
            if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

            Soma = 0;
            for (let i = 1; i <= 10; i++)
                Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if (Resto === 10 || Resto === 11) Resto = 0;
            if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
            return true;
        },
        isCNPJ: strCNPJ => {
            let cnpj = strCNPJ.replace(/[^\d]+/g, "");

            if (cnpj === "") return false;

            if (cnpj.length !== 14) return false;

            // Elimina CNPJs invalidos conhecidos
            if (
                cnpj === "00000000000000" ||
                cnpj === "11111111111111" ||
                cnpj === "22222222222222" ||
                cnpj === "33333333333333" ||
                cnpj === "44444444444444" ||
                cnpj === "55555555555555" ||
                cnpj === "66666666666666" ||
                cnpj === "77777777777777" ||
                cnpj === "88888888888888" ||
                cnpj === "99999999999999"
            )
                return false;

            // Valida DVs
            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            let digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== digitos.charAt(0)) return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== digitos.charAt(1)) return false;

            return true;
        },
        maskCPF: strCPF => {
            try {
                strCPF = strCPF.replace(/[^0-9]/g, '');
                return strCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            } catch (error) {
                console.warn(`Não foi possível mascarar o CPF com o valor ${strCPF}.`, error);
                return strCPF;
            }
        },
        maskCNPJ: strCNPJ => {
            try {
                strCNPJ = strCNPJ.replace(/[^0-9]/g, '');
                return strCNPJ.replace(
                    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                    "$1.$2.$3/$4-$5"
                );
            } catch (error) {
                console.warn(`Não foi possível mascarar o CNPJ com o valor ${strCNPJ}.`, error);
                return strCNPJ;
            }
        },
        maskCEP: strCEP => {
            try {
                strCEP = strCEP.replace(/[^\d]+/g, "");
                return strCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
            } catch (error) {
                console.warn(`Não foi possível mascarar o CEP  com o valor ${strCEP}.`, error);
                return strCEP;
            }
        },
        maskCNAE: strCNAE => {
            try {
                strCNAE = strCNAE.replace(/[^0-9]/g, '')
                return strCNAE.replace(/(\d{4})/, "$1-");
            } catch (error) {
                console.warn(`Não foi possível mascarar o CNAE com o valor ${strCNAE}.`, error);
                return strCNAE;
            }
        },
        maskDateToBr: (dateObj, includeHour) => {

            if (dateObj === undefined)
                return "";

            let dateAux = new Date(dateObj);
            let hour = includeHour === true ? ` ${dateAux.getHours().toString().padStart(2, '0')}:${dateAux.getMinutes().toString().padStart(2, '0')}` : '';

            return (
                dateAux.getDate().toString().padStart(2, '0') +
                "/" +
                (dateAux.getMonth() + 1).toString().padStart(2, '0') +
                "/" +
                dateAux.getFullYear() +
                `${hour}`
            );
        },
        maskMoneyToBr: (number) => {
            try {
                let bankNotes = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
                return bankNotes;
            } catch (error) {
                console.error("Não foi possível converter " + number + " para o formato de moeda BR.", error);
                return number
            }
        },
        clearCNPJ: strCNPJ => {
            try {
                return strCNPJ
                    .replace(/\.|/g, "")
                    .replace("/", "");
            } catch (error) {
                return strCNPJ;
            }
        },
        clearCPF: strCPF => {
            try {
                return strCPF
                    .replace(/\.|-/g, "")
            } catch (error) {
                return strCPF;
            }
        },
        clearTel: strTel => {
            try {
                // eslint-disable-next-line
                return strTel.replace(/\_|\(|\)|\-|[ \t]/g, "")
            } catch (error) {
                
            }
        },
        cloneObject(obj) {
            return obj !== undefined ? JSON.parse(JSON.stringify(obj)) : obj;
        },
        isEmptyObject(obj) {
            return (obj !== undefined && (typeof obj === "object")) ? (!Object.keys(obj).length > 0) : true;
        },
        sumArrayNumbers(arrayNumbers) {
            return arrayNumbers.reduce((prev, current) => prev + current, 0);
        },
        contains(valueCompare, valueCompared, caseSensitive) {
            let val1 =
                caseSensitive === true ? valueCompare : valueCompare.toUpperCase();
            let val2 =
                caseSensitive === true ? valueCompared : valueCompared.toUpperCase();

            if (val1.indexOf(val2) >= 0) return true;
            return false;
        },
        /**
         * Testa se um valor é número
         */
        isNumber(value) {
            return Number.isInteger(value);
        },
        /**
         * Abrevia uma data para o formato MM / YYYY
         */
        // abbreviateDate: dateObject => {

        //     if (dateObject == undefined)
        //         return '';

        //     let auxDate = new Date(dateObject);

        //     if (auxDate === undefined)
        //         return '';
        //     let monthIndex = auxDate.getMonth();
        //     let monthName = meses[monthIndex]
        //     let year = auxDate.getFullYear();

        //     return `${monthName}/${year}`;
        // },
        /**
         * De uma data abreaviada, retorna uma nova data com o dia 1° de cada mês.
         */
        // unAbbreviateDate: dateAbbreviated => {

        //     let dateSplited = dateAbbreviated.split('/');
        //     if (dateSplited.length !== 2)
        //         return undefined;

        //     let month = dateSplited[0].trim('');
        //     let year = dateSplited[1].trim('');

        //     meses.forEach((value, index) => {
        //         if (value === month) month = index;
        //     });

        //     return new Date(year, month, 1);
        // },
        /**
         * Formata uma data no tipo dd/MM/AAAA
         */
        formatDate: date => {

            if (date === undefined || new Date(date) == null)
                return undefined;

            let dateObject = date.getDate === undefined ? new Date(date) : date;

            let day = dateObject.getDate().toString().padLeft(2, "0");
            let month = (dateObject.getMonth() + 1).toString().padLeft(2, "0");
            let year = dateObject.getFullYear().toString().padLeft(2, "0");

            return `${day}/${month}/${year}`;
        },
        /**
         * Testa se um valor é booleano
         */
        // download: (strData, strFileName, strMimeType) => {
        //     var D = document, A = arguments, a = D.createElement("a"),
        //         d = A[0], n = A[1], t = A[2] || "application/pdf";
        //     var newdata = "data:" + strMimeType + ";base64," + escape(strData);
        //     //build download link:
        //     a.href = newdata;
        //     if ('download' in a) {
        //         a.setAttribute("download", strFileName);
        //         a.innerHTML = "downloading...";
        //         D.body.appendChild(a);
        //         setTimeout(function () {

        //             var e = D.createEvent("MouseEvents");
        //             e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
        //             );
        //             a.dispatchEvent(e);
        //             D.body.removeChild(a);
        //         }, 66);
        //         return true;
        //     };
        // },
        /**
         *  Retorna um array agrupado pelo conteúdo encontrado informado no parâmetro 'keyToGroupBy'
         * @param { array } array onde tem  o conteúdo a ser filtrado.
         * @param { keyToGroupBy} a chave usada para filtrar o conteúdo dentro do array.
         * @param { expression } a expressão a ser aplicada para extrar o conteúdo. (opcional).
         */
        groupBy: (array, keyToGroupBy, expression, includeObjects) => {
            let arrayContent = [];

            arrayContent = array.map(item => expression !== undefined ? ({ groupByValue: expression(item[keyToGroupBy]) }) : ({ groupByValue: item[keyToGroupBy] }));

            let arrayResult = [];

            arrayContent.forEach(content => {
                let groupByValueExistInArray = arrayResult.some(ar => ar.groupByValue === content.groupByValue);
                if (!groupByValueExistInArray) arrayResult.push(content);
            });

            if (includeObjects)
                arrayContent.forEach(content => {
                    content.Objects = content.Objects === undefined ? [] : content.Objects;
                    content.Objects = array.filter(arr => (expression !== undefined ? expression(arr[keyToGroupBy]) : arr[keyToGroupBy]) === content.groupByValue);
                });


            return arrayResult;
        },
        sum: (array, propertyPath) => {
            return array.reduce((a, b) => a + b[propertyPath], 0);
        },
        // isDate: value => {
        //     var formats = [
        //         moment.ISO_8601,
        //         "MM/DD/YYYY  :)  HH*mm*ss"
        //     ];

        //     let hasSlash = value.indexOf("/") >= 0;
        //     let hasStoke = value.indexOf("-") >= 0;

        //     return moment(value, formats, true).isValid() && (hasSlash || hasStoke);
        // }
    }
};
