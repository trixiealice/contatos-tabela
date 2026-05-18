'use strict'

import { deleteContato, getContato, getContatos, postContato, putContato } from "./contatos.js"

/*
const novoContato = {
"nome": "Marinette Dupain-Cheng",
  "celular": "+33 6 9999 9999",
  "foto": "https://img.freepik.com/psd-gratuitas/renderizacao-3d-do-estilo-de-cabelo-para-o-design-do-avatar_23-2151869121.jpg",
  "email": "marinette.baking@gmail.com",
  "endereco": "12 Rue Gotlib",
  "cidade": "Paris"
}
console.table(await postContato(novoContato))
*/

const btn = document.getElementById('btn')
const listaContatos = document.getElementById('listaContatos')

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

    await postContato(novoContato)

    carregarContatos()

    document.getElementById('nome').value = ''
    document.getElementById('celular').value = ''
    document.getElementById('foto').value = ''
    document.getElementById('email').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value = ''
})

window.excluirContato = async function(id){

    await deleteContato(id)

    carregarContatos()
}

carregarContatos()
