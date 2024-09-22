function distanceMeterCalc ( x1, y1, x2, y2 ) {
    const x = x1 - x2;
    const y = y1 - y2;

    return Math.sqrt((x*x) + (y*y))*100000;
}

function dateCalc() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    return formattedDate;
}

export { distanceMeterCalc, dateCalc};