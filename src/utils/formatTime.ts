export const formatTime = (time: number | undefined): string => {
    if (typeof time === 'undefined') {
        return '';
    }

    const date = new Date(time * 1000);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    const formattedDate = date.toLocaleString('ru', options);
    return formattedDate;
}