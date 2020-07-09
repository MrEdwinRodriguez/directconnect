
const formatDate = date => {
    if (date != "" || date != undefined || date != null ) {
        let newDate = new Date(date)
        let month = String(newDate.getMonth() + 1);
        const year = String(newDate.getFullYear());
        if (month.length < 2) month = '0' + month;
        return `${month}/${year}`;
    }
    return 'MM/YYYY';
}
export default formatDate;
