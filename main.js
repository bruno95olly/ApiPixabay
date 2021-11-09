"use strict"

const apiPixabayAll = async (imagem) => {
    const chaveApi = "key=24046853-c6503f466db34a6e06f5d1973"
    const url = `https://pixabay.com/api/?${chaveApi}&q=${imagem}&image_type=all&pretty=true&lang=pt&per_page=30`
    const response = await fetch(url)
    const imagensAchadas = await response.json()

    return imagensAchadas
}

const apiPixabayPhotos = async (imagem) => {
    const chaveApi = "key=24046853-c6503f466db34a6e06f5d1973"
    const url = `https://pixabay.com/api/?${chaveApi}&q=${imagem}&image_type=photo&pretty=true&lang=pt&per_page=30`
    const response = await fetch(url)
    const imagensAchadas = await response.json()

    return imagensAchadas
}

const apiPixabayIllustration = async (imagem) => {
    const chaveApi = "key=24046853-c6503f466db34a6e06f5d1973"
    const url = `https://pixabay.com/api/?${chaveApi}&q=${imagem}&image_type=illustration&pretty=true&lang=pt&per_page=30`
    const response = await fetch(url)
    const imagensAchadas = await response.json()
    return imagensAchadas
}

const apiPixabayVector = async (imagem) => {
    const chaveApi = "key=24046853-c6503f466db34a6e06f5d1973"
    const url = `https://pixabay.com/api/?${chaveApi}&q=${imagem}&image_type=vector&pretty=true&lang=pt&per_page=30`
    const response = await fetch(url)
    const imagensAchadas = await response.json()
    return imagensAchadas
}


const all = 'Todos'
const photos = 'Fotos'
const ilustrations = 'Ilustrações'
const vectors = 'Vetores'

const selectType = document.querySelector('.selectTypes')

selectType.innerHTML = `<option>${all}</option>
<option>${photos}</option>
<option>${ilustrations}</option>
<option>${vectors}</option>`


const limpaBusca = (elemento) => {
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const buscarImagens = async(evento) => {
    const valueOption = selectType.options[selectType.selectedIndex].text
    if(valueOption == all){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await apiPixabayAll(imagemPesquisa)
            console.log(infoImagens)
            const arrayResultados = infoImagens.hits
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }   
    }
    else if(valueOption == photos){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await apiPixabayPhotos(imagemPesquisa)
            const arrayResultados = infoImagens.hits
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }   
    }
    else if(valueOption == ilustrations){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await apiPixabayIllustration(imagemPesquisa)
            const arrayResultados = infoImagens.hits
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }   
    }
    else if(valueOption == vectors){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await apiPixabayVector(imagemPesquisa)

            const arrayResultados = infoImagens.hits
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }   
    }
}


const criaCard = (elemento, indice, array) => {
    const container = document.querySelector(".galeriaImagens")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("card-imagem")
    novaDiv.innerHTML = 
    `<a href="${elemento.pageURL}" target="_blank">
        <img src="${elemento.largeImageURL}">
        <div class="descImg">
            ${elemento.tags}
            <ion-icon class="icons" name="heart"></ion-icon>${elemento.likes}
            <ion-icon class="icons" name="chatbubble"></ion-icon>${elemento.comments}
            <ion-icon class="icons" name="bookmark"></ion-icon>
        </div>
    </a>
    `
    container.appendChild(novaDiv)
}

const carregarResultados = (array) => {
    array.forEach(criaCard)
}


document.querySelector("#inputPesquisa").addEventListener('keypress', buscarImagens)