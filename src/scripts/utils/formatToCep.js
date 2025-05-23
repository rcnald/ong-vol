export function formatToCEP(value) {

    const valueRaw = value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 8)

    return valueRaw
        .padStart(8, '0')
        .replace(/^(\d{5})(\d)/, '$1-$2')
}
