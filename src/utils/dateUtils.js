export function formatDate(str) {
    if(!str) {
        return '';
    }

    const date = new Date(str);

    if(isNaN(date.getTime())) {
        return '';
    }

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);

    return formattedDate;
}