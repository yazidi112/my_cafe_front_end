const date = () => {
    const d = new Date();
    const date = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
    const time = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
    return date+' '+time;
}

export default date;