// x=(preçoLinha * pesoUsado / pesoTotal + horas * valorHora); x += 0,2*x
/* 
    = Linha Usada
     Peso e Preço
    
    = Produto
     Peso

    = Horas
    Trabalhadas e Valor

    = Lucro (valor ou porcentagem)

    | Desconto (sim ou não)
    Porcentagem
    Valor
*/

// -
const resDiv = window.document.getElementById('res')
let inputs = {
    string: {
        price: null,
        weight: null,
    },
    productWeight: null,
    hours: {
        worked: null,
        value: null,
    },
    discount: {
        true: window.document.getElementById('discount_true'),
        false: window.document.getElementById('discount_false'),
        label: window.document.getElementById('discountLabel'),
        rad: {
            percent: null,
            value: null,
        },
        value: null,
    },
    profit: null,
    btn: {
        calc: window.document.getElementById('calc'),
        clear: window.document.getElementById('clear'),
        tutorial: window.document.getElementById('tutorial'),
    },
}

let discount = false
let childCreated = false
let discTypeParag = null

toggleDiscount = () => { 
    if (!childCreated) {
        const DiscTypeParag = window.document.createElement('p')
        DiscTypeParag.innerText = 'Descontar:'
        DiscTypeParag.id = 'discTypeParag'
        const percentRad = window.document.createElement('input')
        percentRad.type = 'radio'
        percentRad.name = 'disc2'
        percentRad.id = 'percentRad'
        inputs.discount.rad.percent = percentRad
        const valueRad = window.document.createElement('input')
        valueRad.type = 'radio'
        valueRad.name = 'disc2'
        valueRad.id = 'valueRad'
        inputs.discount.rad.value = valueRad
        valueRad.checked = true
        const discLabel1 = window.document.createElement('label')
        discLabel1.htmlFor = 'disc2'
        discLabel1.innerText = 'Porcentagem |'
        const discLabel2 = window.document.createElement('label')
        discLabel2.htmlFor = 'disc2'
        discLabel2.innerText = 'Valor'
        const discValue = window.document.createElement('input')
        discValue.className = 'num'
        discValue.id = 'discValue'
        discValue.placeholder = 'Desconto'
        inputs.discount.value = Number(discValue)
        DiscTypeParag.appendChild(percentRad)
        DiscTypeParag.appendChild(discLabel1)
        DiscTypeParag.appendChild(valueRad)
        DiscTypeParag.appendChild(discLabel2)
        DiscTypeParag.appendChild(window.document.createElement('br'))
        DiscTypeParag.appendChild(discValue)
        discTypeParag = DiscTypeParag
    }
    discount = true
    inputs.discount.label.appendChild(discTypeParag)
}

detachDiscountInput = () => {
    discount = false
    inputs.discount.label.removeChild(discTypeParag)
}

inputs.discount.true.addEventListener('change', toggleDiscount)
inputs.discount.false.addEventListener('change', detachDiscountInput)
inputs.btn.calc.addEventListener('click', calculate)
inputs.btn.clear.addEventListener('click', clear)
inputs.btn.tutorial.addEventListener('click', tutorial)

let tutorialShown = false
function tutorial() {
    if (!tutorialShown) {
        const calcDiv = window.document.createElement('div')
        calcDiv.className = 'small'
        calcDiv.id = 'calc'
        calcDiv.innerText = '(Preço da linha X peso do produto / peso da linha) + Horas X valor da hora; Acrescido do lucro, que é uma porcentagem desse valor.'
        
        resDiv.append(window.document.createElement('br'))
        resDiv.append('O cálculo é feito da seguinte forma:')
        resDiv.append(window.document.createElement('br'))
        resDiv.append(calcDiv)

        tutorialShown = true
    } else window.alert('O tutorial já está escrito!')
}
tutorial()

function clear() {
    let confirm = true
    if (inputs.string.price.value || inputs.string.weight.value || inputs.productWeight.value || inputs.hours.worked.value || inputs.hours.value.value || inputs.profit.value) {
        confirm = window.confirm('Tem certeza? Isso vai apagar todos os dados escritos!!')
    } 
    if (confirm) {
        inputs.string.price.value = ''
        inputs.string.weight.value = ''
        inputs.productWeight.value = ''
        inputs.hours.worked.value = ''
        inputs.hours.value.value = ''
        inputs.profit.value = ''
        resDiv.innerHTML = ''
        tutorialShown = false
    }
}

function calculate() {
    inputs.string.price = Number(window.document.getElementById('stringPrice').value)
    inputs.string.weight = Number(window.document.getElementById('stringWeight').value)
    inputs.productWeight = Number(window.document.getElementById('productWeight').value)
    inputs.hours.worked = Number(window.document.getElementById('workedHours').value)
    inputs.hours.value = Number(window.document.getElementById('hoursValue').value)
    inputs.profit = Number(window.document.getElementById('profit').value)

    if (!inputs.string.price || !inputs.string.weight || !inputs.productWeight || !inputs.hours.worked || !inputs.hours.value || !inputs.profit) {
        window.alert('Ainda falta preencher algum campo!')
    } else if (inputs.string.price.value < 0) {
        window.alert('O preço tem que ser pelo menos alguns centavos!')
    } else if (inputs.string.weight < 0) {
        window.alert('Cuidado pra essa linha não sair voando!')
    } else if (inputs.string.weight < 0) {
        window.alert('O peso da linha tem que ser pelo menos alguma fração de grama!')
    } else if (inputs.productWeight < 0) {
        window.alert('O peso do produto também tem que ser pelo menos alguma fração de grama!')
    } else if (inputs.hours.worked < 0) {
        window.alert('Informe pelo menos alguns minutos trabalhados, é só dividir o número por 60!')
    } else if (inputs.hours.value <= 0) {
        window.alert('Seu trabalho vale bem mais que isso!')
    } else if (inputs.hours.value < 6) {
        window.alert('Pode aumentar ainda!')
    } else if (inputs.hours.value <= 9) {
        window.alert('Ainda vale muito mais!')
    } else if (inputs.profit <= 1) {
        window.alert("O lucro tem que ser pelo menos 1%")
    } else if (inputs.discount.true.checked) {
        if (inputs.discount.rad.value.checked) {
            if (!inputs.discount.value) {
                window.alert('Informa um valor pra gente descontar!')
            }
        } else if (inputs.discount.rad.percent) {
            if (!inputs.discount.value) {
                window.alert('Informa uma porcentagem pra gente descontar!')
            }
        } else {
            window.alert('A página teve algum problema, recarrega ela!')
        }
    } else if (inputs.hours.value == 10) {
        window.alert('Olha, você ainda tem que aumentar, mas vou deixar você fazer a conta.')
    } else {
        
        let x = Number((inputs.string.price * inputs.productWeight / inputs.string.weight).toFixed(2))
        let y = Number((inputs.hours.worked * inputs.hours.value).toFixed(2))
        let z = Number((inputs.profit/100*(y+x)).toFixed(2))
        let calc = x + y + z
        
        let res = `(${inputs.string.price}$ * ${inputs.productWeight}g / ${inputs.string.weight}g) + (${inputs.hours.worked}h * ${inputs.hours.value}$) + ${inputs.profit}%`
        resDiv.append(window.document.createElement('br'))
        resDiv.append(res)
        resDiv.append(window.document.createElement('br'))
        resDiv.append(`${x} + ${y} + ${z}`)
        resDiv.append(window.document.createElement('br'))
        resDiv.append(calc)
    }
}
