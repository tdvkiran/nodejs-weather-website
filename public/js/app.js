

const submitHandler = (address) => {
    fetch('/weather?address=' + address)
        .then(res => {
            res.json().then(data => {
                if (data.error) {
                    console.log(data.error);
                    //alert(data.error);
                    errorMsg.textContent = data.error;
                    responseMsg.textContent = "";
                    icon.style.visibility = 'hidden';
                }
                else {

                    errorMsg.textContent = "Location: " + data.location;

                    responseMsg.textContent = data.forecast;
                    icon.src = data.icon;
                    icon.style.visibility = 'visible';
                }
            })
        })
        .catch(error => {
            console.log(error);
            // alert(error);
            errorMsg.textContent = error;
            responseMsg.textContent = "";
            icon.style.visibility = 'hidden';
        })
}

const weatherForm = document.querySelector('form');
const addressToBeSearched = document.querySelector('input');
const errorMsg = document.querySelector('#errorMsg');
const responseMsg = document.querySelector('#resMsg');
const icon = document.querySelector("#icon");

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('testing...');
    errorMsg.textContent = "Loading..."
    submitHandler(addressToBeSearched.value);
})