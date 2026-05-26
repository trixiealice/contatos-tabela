'use strict'

import {
    deleteContato,
    getContato,
    getContatos,
    postContato,
    putContato
    } from "./contatos.js"


const novoContato = {
    "nome": "",
    "celular": "",
    "foto": "",
    "email": "",
    "endereco": "",
    "cidade": ""


}

console.table(await postContato(novoContato))


const btn = document.getElementById('btn')
const listaContatos = document.getElementById('listaContatos')
let idContato = null

async function carregarContatos(){

    const contatos = await getContatos()

    listaContatos.innerHTML = ''

    contatos.forEach(contato => {

        listaContatos.innerHTML += `
            <tr>
                <td>${contato.id}</td>

                <td>${contato.nome}</td>

                <td>
                    <img src="${contato.foto}" width="60">
                </td>

                <td>
                <button onclick="editarContato(${contato.id})">
                    Atualizar
                </button>

                <button onclick="excluirContato(${contato.id})">
                    Excluir
                </button>
                </td>
            </tr>
        `
    })
}

btn.addEventListener('click', async () => {

    const novoContato = {
        nome: document.getElementById('nome').value,
        celular: document.getElementById('celular').value,
        foto: document.getElementById('foto').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value
    }

    if(idContato == null){

        await postContato(novoContato)
    
    }else{
    
        await putContato(idContato, novoContato)
    
        idContato = null
    }

    carregarContatos()

    document.getElementById('nome').value = ''
    document.getElementById('celular').value = ''
    document.getElementById('foto').value = ''
    document.getElementById('email').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value = ''
})

window.editarContato = async function(id){

    const contato = await getContato(id)

    document.getElementById('nome').value = contato.nome
    document.getElementById('celular').value = contato.celular
    document.getElementById('foto').value = contato.foto
    document.getElementById('email').value = contato.email
    document.getElementById('endereco').value = contato.endereco
    document.getElementById('cidade').value = contato.cidade

    idContato = id
}

window.excluirContato = async function(id){

    const confirmar = confirm('Deseja excluir este contato?')

    if(confirmar){

    await deleteContato(id)

    }

    carregarContatos()
}

carregarContatos()
