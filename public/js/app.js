console.log("done!!");

const submitHandler = (address) => {
    fetch('/weather?address=' + address)
        .then(res => {
            res.json().then(data => {
                if (data.error) {
                    console.log(data.error);
                    //alert(data.error);
                    errorMsg.textContent=data.error;
                    responseMsg.textContent="";
                }
                else {
                   
                    let textMsg=data.location.concat(" "+data.forecast);
                    errorMsg.textContent="";
                    //alert(textMsg);
                    responseMsg.textContent=textMsg;
                }
            })
        })
        .catch(error => {
            console.log(error);
            // alert(error);
            errorMsg.textContent=error;
            responseMsg.textContent="";
        })
}

const weatherForm = document.querySelector('form');
const addressToBeSearched=document.querySelector('input');
const errorMsg= document.querySelector('#errorMsg');
const responseMsg= document.querySelector('#resMsg');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log('testing...');
    errorMsg.textContent="Loading..."
    submitHandler(addressToBeSearched.value);
})