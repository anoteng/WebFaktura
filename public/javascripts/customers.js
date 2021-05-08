const brreg = 'https://data.brreg.no/enhetsregisteret/api/'
function searchByName(string){
    fetch(brreg + 'enheter?navn=' + string + '&size=6')
        .then(response => response.json())
        .then(data => {
            if(data.page.totalElements > 0){
                fetch('/companycard', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data._embedded.enheter)
                })
                    .then(response => response.json())
                    .then(data => {
                        const cardgroup = document.createElement('div')
                        cardgroup.classList.add('row', 'row-cols', 'row-cols-md-2', 'g-4')
                        for(card of data){
                            cardgroup.innerHTML = cardgroup.innerHTML + card
                        }
                        const infoColoumn = document.querySelector('#infoColoumn')
                        infoColoumn.innerHTML = ''
                        infoColoumn.appendChild(cardgroup)
                        const allA = infoColoumn.querySelectorAll('a.btn')
                        for(let a of allA){

                            a.addEventListener('click', ()=>{
                                const orgNumber = a.id.split('-')[1]
                                getCompanyDetails(orgNumber, fillCompanyDetails)
                            })
                        }
                    })
            }
        })
}
document.querySelector('#newCustomerCompanyName').addEventListener('input', (e)=>{
    if(e.currentTarget.value.length > 3){
        searchByName(e.currentTarget.value)
    }else{
        document.querySelector('#infoColoumn').innerHTML = ''
    }
})
document.querySelector('#newCustomerOrgNumber').addEventListener('input', (e)=>{
    if(e.currentTarget.value.length == 9){
        getCompanyDetails(e.currentTarget.value, fillCompanyDetails)
    }
})
const getCompanyDetails = (orgNumber, callback) => {
    fetch(brreg + 'enheter/' + orgNumber)
        .then(response => response.json())
        .then(data => {
            callback(data)
        })
}
const fillCompanyDetails = (data) =>{
    //console.log(data)
    document.querySelector('#newCustomerCompanyName').value = data.navn
    document.querySelector('#newCustomerOrgNumber').value = data.organisasjonsnummer
    document.querySelector('#newCustomerAddress').value = data.forretningsadresse.adresse[0]
    document.querySelector('#newCustomerPostCode').value = data.forretningsadresse.postnummer
    document.querySelector('#newCustomerCity').value = data.forretningsadresse.poststed
}
document.querySelector('#newCustomerIsCompany').addEventListener('change', (e) =>{
    const companyName = document.querySelector('#newCustomerCompanyName')
    const orgNumber = document.querySelector('#newCustomerOrgNumber')
    if(e.currentTarget.value == 'true'){
        companyName.classList.remove('hidden')
        orgNumber.classList.remove('hidden')
    }else{
        companyName.classList.add('hidden')
        orgNumber.classList.add('hidden')
    }
})
document.querySelector('#btnNewCustomerSubmit').addEventListener('click', (e) =>{
    e.preventDefault()
    const inputs = {
        firstName: document.querySelector('#newCustomerFirstName').value,
        lastName: document.querySelector('#newCustomerLastName').value,
        isCompany: document.querySelector('#newCustomerIsCompany').value,
        companyName: document.querySelector('#newCustomerCompanyName').value,
        address: document.querySelector('#newCustomerAddress').value,
        email: document.querySelector('#newCustomerEmail').value,
        postCode: document.querySelector('#newCustomerPostCode').value,
        city: document.querySelector('#newCustomerCity').value,
        orgNumber: document.querySelector('#newCustomerOrgNumber').value
    }
    fetch('/customers', {
        method: 'post',
        body: JSON.stringify(inputs),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                document.querySelector('#newCustomerFirstName').classList.add('lagret')
                document.querySelector('#newCustomerLastName').classList.add('lagret')
                document.querySelector('#newCustomerIsCompany').classList.add('lagret')
                document.querySelector('#newCustomerCompanyName').classList.add('lagret')
                document.querySelector('#newCustomerAddress').classList.add('lagret')
                document.querySelector('#newCustomerEmail').classList.add('lagret')
                document.querySelector('#newCustomerPostCode').classList.add('lagret')
                document.querySelector('#newCustomerCity').classList.add('lagret')
                document.querySelector('#newCustomerOrgNumber').classList.add('lagret')
                document.querySelector('#newCustomerID').value = data.id
            }
        })
})
document.querySelector('#showCustomers').addEventListener('click', (e)=>{
    const maincol = document.querySelector('body > main > div > div.col-8')
    const innerdiv = document.querySelector('body > main > div > div.col-8 > div').classList.add('hidden')
    innerdiv.classList.add('hidden')

})