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
                    icon.style.visibility = 'hidden';
                }
                else {
                   
                    let textMsg="Location: "+data.location.concat(data.forecast);
                    errorMsg.textContent="";
                    //alert(textMsg);
                    responseMsg.textContent=textMsg;
                    icon.src=data.icon;
                    //var img=document.getElementById('icon');
                    icon.style.visibility = 'visible';
                }
            })
        })
        .catch(error => {
            console.log(error);
            // alert(error);
            errorMsg.textContent=error;
            responseMsg.textContent="";
            icon.style.visibility = 'hidden';
        })
}

const weatherForm = document.querySelector('form');
const addressToBeSearched=document.querySelector('input');
const errorMsg= document.querySelector('#errorMsg');
const responseMsg= document.querySelector('#resMsg');
const icon=document.querySelector("#icon");

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log('testing...');
    errorMsg.textContent="Loading..."
    submitHandler(addressToBeSearched.value);
})