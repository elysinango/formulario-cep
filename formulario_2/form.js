const cep = document.getElementById("cep");
const street = document.getElementById("street");
const neighborhood = document.getElementById("neighborhood");
const city = document.getElementById("city");
const uf = document.getElementById("uf");
const ibge = document.getElementById("ibge");
const ddd = document.getElementById("ddd");

const getAddress = async (cep) =>{
    

    try{
        const response = await fetch (`https://viacep.com.br/ws/${cep}/json/`)
        const address = await response.json();
            if (address.cep){
            street.value = address.logradouro
            neighborhood.value = address.bairro
            city.value = address.localidade
            uf.value = address.uf
            ibge.value = address.ibge
            ddd.value = address.ddd
            successFor('cep-container')
            }else{
                errorFor('cep-container', 'CEP não é válido')
                cleanUp();
            }
        
        }catch(error){
        errorFor('cep-container', 'Algo inesperado aconteceu')
    }
}
const checkCep = () =>{
    if(/^\d*$/.test(cep.value)){
        getAddress(cep.value)
    }else{
        console.log('apenas numeros')
        errorFor('cep-container', 'Insira apenas números')
    }
}

const cleanUp = () =>{
    if (cep.value.length === 0){
        street.value = ''
        neighborhood.value = ''
        city.value = ''
        uf.value = ''
        ibge.value = ''
        ddd.value = ''
        document.getElementById('cep-container').classList.remove('success')
        document.getElementById('cep-container').classList.remove('error')
    }
}

const errorFor = (input, message) => {
    const inputLocal = document.getElementById(input)
    const span = inputLocal.querySelector('span');

    span.innerText = message;

    inputLocal.className = "input-local error";

}

const successFor = (input) => {
    const inputLocal = document.getElementById(input)

    inputLocal.className = "input-local success";

}

cep.addEventListener("focusout", (e) =>{
    e.preventDefault();
    if (cep.value.length === 8){
        checkCep();
    }

    cleanUp();
})
