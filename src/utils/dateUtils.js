export function formatDate(str) {
    if(!str) {
        return '';
    }

    const date = new Date(str);

    if(isNaN(date.getTime())) {
        return '';
    }

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);

    return formattedDate;
}