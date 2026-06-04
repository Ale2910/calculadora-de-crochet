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
        box: window.document.getElementById('disc'),
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
    multi: {
        box: window.document.getElementById('multi'),
    },
}

let isThereValidInput = null
let isThereBlankInput = null
let allInputsAreBlank = null
const updateInputs = () => {
    inputs.string.price = window.document.getElementById('stringPrice')
    inputs.string.weight = window.document.getElementById('stringWeight')
    inputs.productWeight = window.document.getElementById('productWeight')
    inputs.hours.worked = window.document.getElementById('workedHours')
    inputs.hours.value = window.document.getElementById('hoursValue')
    inputs.profit = window.document.getElementById('profit')

    isThereValidInput = inputs.string.price.value || inputs.string.weight.value || inputs.productWeight.value || inputs.hours.worked.value || inputs.hours.value.value || inputs.profit.value || inputs.discount.value || inputs.discount.box.checked
    allInputsAreValid = inputs.string.price.value && inputs.string.weight.value && inputs.productWeight.value && inputs.hours.worked.value && inputs.hours.value.value
    isThereBlankInput = !inputs.string.price.value || !inputs.string.weight.value || !inputs.productWeight.value || !inputs.hours.worked.value || !inputs.hours.value.value
    allInputsAreBlank = !inputs.string.price.value && !inputs.string.weight.value && !inputs.productWeight.value && !inputs.hours.worked.value && !inputs.hours.value.value

    if(inputs.discount.box.checked) {
        inputs.discount.value = window.document.getElementById('discValue')
        inputs.discount.box = window.document.getElementById('disc')
        inputs.discount.label = window.document.getElementById('discountLabel')
        inputs.discount.rad.percent = percentRad
        inputs.discount.value = valueRad
    }
}

const setInputsAsValues = () => {
    inputs.string.price = inputs.string.price.value
    inputs.string.weight = inputs.string.weight.value
    inputs.productWeight = inputs.productWeight.value
    inputs.hours.worked = inputs.hours.worked.value
    inputs.hours.value = inputs.hours.value.value
    inputs.profit = inputs.profit.value

    if(inputs.discount.box.checked) {
        inputs.discount.value = inputs.discount.value.value
    }
}

const create = (element) => window.document.createElement(element)

let discount = false
let childCreated = false
let discTypeParag = null
let percentRad = null
let valueRad = null
let discLabel1 = null
let discLabel2 = null
let discValue = null
const toggleDiscount = () => { 
    if (discount) {
        discount = false
        discValue = ''
        inputs.discount.label.removeChild(discTypeParag)
    } else if (!discount) {
        if (!childCreated) {
            discTypeParag = create('p')
            discTypeParag.innerText = 'Descontar:'
            discTypeParag.id = 'discTypeParag'
    
            percentRad = create('input')
            percentRad.type = 'radio'
            percentRad.name = 'disc2'
            percentRad.id = 'percentRad'
            inputs.discount.rad.percent = percentRad
    
            valueRad = create('input')
            valueRad.type = 'radio'
            valueRad.name = 'disc2'
            valueRad.id = 'valueRad'
            inputs.discount.rad.value = valueRad
            valueRad.checked = true
    
            discLabel1 = create('label')
            discLabel1.htmlFor = 'disc2'
            discLabel1.innerText = 'Porcentagem |'
    
            discLabel2 = create('label')
            discLabel2.htmlFor = 'disc2'
            discLabel2.innerText = 'Valor'
    
            discValue = create('input')
            discValue.className = 'num'
            discValue.id = 'discValue'
            discValue.placeholder = 'Desconto'
    
            inputs.discount.value = Number(discValue)
            discTypeParag.appendChild(percentRad)
            discTypeParag.appendChild(discLabel1)
            discTypeParag.appendChild(valueRad)
            discTypeParag.appendChild(discLabel2)
            discTypeParag.appendChild(create('br'))
            discTypeParag.appendChild(discValue)
            childCreated = true
        }
        discount = true
        inputs.discount.label.appendChild(discTypeParag)
    }
}

let tutorialShown = false
function tutorial() {
    if (!tutorialShown) {
        const calcDiv = create('div')
        calcDiv.className = 'small'
        calcDiv.id = 'calc'
        calcDiv.innerText = '(Preço da linha X peso do produto / peso da linha) + Horas X valor da hora; Acrescido do lucro, que é uma porcentagem desse valor.'
        
        resDiv.append(create('br'))
        resDiv.append('O cálculo é feito da seguinte forma:')
        resDiv.append(create('br'))
        resDiv.append(calcDiv)

        tutorialShown = true
    } else window.alert('O tutorial já está escrito!')
}
tutorial()

let resDivIsClean = true
function clear() {
    let confirm = true
    updateInputs()
    if (isThereValidInput) {
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
        resDivIsClean? 0: resDivIsClean = true

        if (inputs.discount.box.checked) {
            toggleDiscount()
            inputs.discount.box.checked = false
        }
        
        if (inputs.multi.box.checked) inputs.multi.box.checked = false
    }
}

inputs.discount.box.addEventListener('change', toggleDiscount)
inputs.btn.calc.addEventListener('click', calculate)
inputs.btn.clear.addEventListener('click', clear)
inputs.btn.tutorial.addEventListener('click', tutorial)

let multiCalcWarningShown = false
let firstCalc = true
function calculate() {
    updateInputs()
    setInputsAsValues()
    try {
        if (allInputsAreValid && !inputs.profit && inputs.multi.bpx.checked) {
            let continuar = window.confirm('Quer mesmo calcular sem o lucro?')
            if (!continuar) return 0 
        } else if (inputs.multi.box.checked && (inputs.profit || (Number(inputs.profit) == 0 && inputs.profit != ''))) {
            throw 'Calculando várias linhas, você calcula o lucro por último, apenas ele, depois de todas as linhas. Limpa o campo de lucro pra gente poder fazer a conta!'
        }
        if (allInputsAreBlank) {
            throw 'Todos os campos estão vazios, começa a preencher pra gente fazer a conta!'
        } else if (!inputs.multi.box.checked && (!inputs.profit || Number(inputs.profit) < 0)) {
            throw 'O lucro precisa ser pelo menos 0. Ou seja, sem lucro!'
        } else if (!inputs.string.price || Number(inputs.string.price) <= 0) {
            throw 'Você precisa fornecer um valor pra linha que seja pelo menos centavos!'
        } else if (!inputs.string.weight || Number(inputs.string.weight) < 1) {
            throw 'Cuidado pra linha não sair voando!'
        } else if (!inputs.productWeight || Number(inputs.productWeight) < 1) {
            throw 'O peso do produto tem que ser pelo menos 1 grama'
        } else if (!inputs.hours.worked || Number(inputs.hours.worked) <= 0) {
            throw 'Informe pelo menos alguns minutos de trabalho. Basta dividir os minutos por 60!'
        } else if (!inputs.hours.value) {
            throw 'Informe um valor para suas horas de trabalho'
        } else if (Number(inputs.hours.value) < 5) {
            throw `${inputs.hours.value}? Sério? Suas horas valem bem mais que isso!`
        } else if (Number(inputs.hours.value) < 10) {
            throw `${inputs.hours.value} reais ainda está pouco, aumenta mais aí!`
        } else if (Number(inputs.hours.value) == 10) {
            window.alert('A sua hora ainda vale mais que isso, mas eu vou te deixar fazer a conta.')
        }
        if (inputs.discount.box.checked) {
            if (!inputs.discount.rad.value.checked && !inputs.discound.rad.percent.checked) {
                throw 'Nenhuma opção de desconto está marcada. Marca ou cancele o desconto pra gente poder fazer a conta!'
            } else if (!inputs.discount.value || Number(inputs.discount.value) <= 0) {
                throw 'O desconto precisa ser uma fração ou de porcentagem ou de reais. Se optar por não descontar, cancele o desconto pra gente fazer a conta!'
            }
        }
    } catch (e) { window.alert(e); return 0 }
    
    firstCalc? firstCalc = false: 0
    resDivIsClean? resDivIsClean = false: 0

    let x = Number((inputs.string.price * inputs.productWeight / inputs.string.weight).toFixed(2))
    let y = Number((inputs.hours.worked * inputs.hours.value).toFixed(2))
    let z = Number((inputs.profit/100*(y+x)).toFixed(2))
    let calc = x + y + z
    
    let res = `(${inputs.string.price}$ * ${inputs.productWeight}g / ${inputs.string.weight}g) + (${inputs.hours.worked}h * ${inputs.hours.value}$) + ${inputs.profit}%`
    resDiv.append(create('br'))
    resDiv.append(res)
    resDiv.append(create('br'))
    resDiv.append(`${x} + ${y} + ${z}`)
    resDiv.append(create('br'))
    resDiv.append(calc)
}
