window.addEventListener('load', (e) => {
    let myBody = document.getElementsByTagName('body')[0];
    let myTable = document.createElement('table');
    let myHeading = document.createElement('h1');
    myHeading.textContent = 'this is my chessboard!';
    for (i = 0; i < 8; i++) {
        let myTr = document.createElement('tr');
        myTable.appendChild(myTr);
        for (n = 0; n < 8; n++) {
            let myTd = document.createElement('td');
            myTr.appendChild(myTd)
        }
        myTable.appendChild(myTr);
    }
    myBody.appendChild(myHeading);
    myBody.appendChild(myTable);
});
