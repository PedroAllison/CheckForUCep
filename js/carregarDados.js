//Import do arquivo de dados que contém a base CEP
import { dadosCep } from "./dados.js"

//Receber o botão pesquisar no JS
const botaoPesquisar = document.getElementById('pesquisar')

//Função tradicional
function validarDados () {
    let caixaCep = String(document.getElementById('input-cep').value)
    let status = false

    //Validação da caixa em branco
    if(caixaCep == ''){
        alert('Não foi possível realizar a busca, pois a caixa esta vazia')
        status = true
        //Validação da quantidade de caracteres
    }else if(caixaCep.length != 9){
        alert('É obrigatório a entrada de 9 digitos para cep')
        status = true
    }
    
    return status
}

//Função anonima
//Manipula dados do array local
const getDadosCep = function(){

    /*
    let contador = 0
    while (contador < dadosCep.dados.length){
        console.log(dadosCep.dados[contador].cep)
        contador++
    }
    */

    

    //forEach -> é um metodo de um array que percorre o array e
    // retorna através de uma função de call back cada elemento do 
    //array
    
    let status = false
    let caixaCep = document.getElementById('input-cep').value

    dadosCep.dados.forEach(function(item){
        //Validação para buscar o cep digitado dentro do array
        if(caixaCep == item.cep){
            status = true
            setDadosForm(item)
        }
    })
return status
}

//Manipula dados da API do via cep
const getDadosCepAPI = async function(){

    let caixaCep = document.getElementById('input-cep').value

    //let url = 'https://viacep.com.br/ws/'+caixaCep+'/json/'
    let url = `https://viacep.com.br/ws/${caixaCep}/json/`

    //REaliza a requisição na API e aguarda o retorno dos dados
    let response = await fetch(url)

    //Converte o retorno do dados em formato JSON
    let dados = await response.json()

    setDadosForm(dados)
}

//Arrow Function
const setDadosForm = (dados) => {
    //Coloca no formulário os dados do Array
    document.getElementById('logradouro').value     = dados.logradouro
    document.getElementById('complemento').value    = dados.complemento
    document.getElementById('bairro').value         = dados.bairro
    document.getElementById('cidade').value         = dados.localidade
    document.getElementById('estado').value         = dados.uf
}


botaoPesquisar.addEventListener('click', function(){
    if(!validarDados()){
        if(!getDadosCepAPI()){
            alert('CEP não encontrado!')
        }
    }
})