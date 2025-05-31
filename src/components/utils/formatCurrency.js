export function formatCurrency(value) {
    const amount = Number(value)
    if (isNaN(amount)) return 'Rp 0'
    return value.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    })
}