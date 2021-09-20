// Variáveis de ambiente
const billContainer = document.querySelector('.bill-container')
const numberPeopleContainer = document.querySelector('.number-people')
const botoes = document.querySelectorAll('.tip-buttons button')
const inputValor = document.querySelector('.bill-form')
const formBotoes = document.querySelector('.tip-form')
const numberPeopleForm = document.querySelector('.number-people-form')
const valorPorPessoa = document.querySelector('.value-tip-up span')
const valorTotal = document.querySelector('.value-tip-down span')
const btnResetar = document.querySelector('.btn-reset')
// Variáveis de valor
let numero = 0
let porcentagem = 0
let numeroPessoas = 0

inputValor.onkeyup = function(){
	document.querySelectorAll('.erro').forEach(a => {a.remove()})
	inputValor.style.border = ''
	if(isNaN(Number(inputValor.value))){
		// Parâmetros: mensagem, elemento atual, container pai
		mostrarErro('Valor inválido', inputValor, billContainer)
	} else if(inputValor.value === ''){
		mostrarErro('Insira um número', inputValor, billContainer)
	} else if(Number(inputValor.value) === 0){
		mostrarErro('Valor não pode ser zero', inputValor, billContainer)
	} else {
		// Valor válido
		numero = Number(inputValor.value)
		if(porcentagem !== 0){
			calcularTudo()
		}
	}
}

// Botões de porcentagem
botoes.forEach(btn => {
	btn.onclick = function(){
		formBotoes.style.border = ''
		formBotoes.value = ''
		botoes.forEach(b => b.removeAttribute('id'))
		if(document.querySelector('.erro') === null && inputValor.value.length !== 0){
			porcentagem = Number(btn.value)
			btn.setAttribute('id', 'background-button')
			if(numberPeopleForm.value !== ''){
				calcularTudo()
			}
		}
	}
})

// Caixa custom de porcentagem
formBotoes.onkeyup = function(){
	formBotoes.style.border = ''
	botoes.forEach(btn => btn.removeAttribute('id'))
	if(isNaN(Number(formBotoes.value)) || formBotoes.value === '' || Number(formBotoes.value) === 0){
		formBotoes.style.border = '1px solid red'
	} else {
		if(document.querySelector('.erro') === null && inputValor.value.length !== 0){
			formBotoes.style.border = ''
			porcentagem = Number(formBotoes.value)
			if(numberPeopleForm.value !== ''){
				calcularTudo()
			}
		}
	}
}

numberPeopleForm.onkeyup = function(){
	document.querySelectorAll('.erro').forEach(a => {a.remove()})
	numberPeopleForm.style.border = ''
	if(isNaN(Number(numberPeopleForm.value))){
		mostrarErro('Valor inválido', numberPeopleForm, numberPeopleContainer)
	} else if(numberPeopleForm.value === ''){
		mostrarErro('Insira um número', numberPeopleForm, numberPeopleContainer)
	} else if(Number(numberPeopleForm.value) === 0){
		mostrarErro('Valor não pode ser zero', numberPeopleForm, numberPeopleContainer)
	} else {
		//Valor válido
		if(document.querySelector('.erro') === null && inputValor.value.length !== 0){
			numeroPessoas = Number(numberPeopleForm.value)
			calcularTudo()
		}
	}
}

// Botão de resetar
btnResetar.onclick = function(){
	numero = 0
	porcentagem = 0
	numeroPessoas = 0
	inputValor.value = ''
	formBotoes.value = ''
	numberPeopleForm.value = ''
	valorPorPessoa.innerText = `$0.00`
	valorTotal.innerText = '$0.00'
	btnResetar.setAttribute('disabled', 'disabled')
	botoes.forEach(btn => btn.removeAttribute('id'))
	document.querySelectorAll('input').forEach(input => input.style.border = '')
	document.querySelectorAll('.erro').forEach(a => {a.remove()})
}

function mostrarErro(texto, elemento, containerPai){
	let newElement = document.createElement('span')
	newElement.innerHTML = texto
	newElement.className = 'erro'
	containerPai.appendChild(newElement)
	elemento.style.border = '1px solid red'
}

function calcularTudo(){
	btnResetar.disabled = ''
	let perPerson = numero * (porcentagem / 100)
	let total = perPerson * numeroPessoas
	valorPorPessoa.innerText = `$${perPerson.toFixed(2)}`
	valorTotal.innerText = `$${total.toFixed(2)}`
}