
export const formatDate = (date) => {
    if (!date) return '';
    date = new Date(date);
    if (!date) return '';
    var monthNames = [
        "Gennaio", "Febbraio", "Marzo",
        "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    if (isNaN(day) || isNaN(monthIndex) || isNaN(year)) return '';

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}