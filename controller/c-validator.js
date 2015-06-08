function Valida(enemy, what) {
    switch (what) {
        case 'str_num':
            return /^[a-zA-Z1-9][a-zA-Z0-9]{1,20}$/i.test(enemy);
        case 'email':
            return /^[\w\d\-\.]+@[\w\d\-\.]+$/.test(enemy);
        case 'url':
            return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(enemy);
    }
}
exports.Valida = Valida;