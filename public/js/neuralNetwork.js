// provide optional config object (or undefined). Defaults shown.
const config = {
    binaryThresh: 0.5,
    hiddenLayers: [5,3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  };

  // create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

const data = [
    {"input":{"r":0,"g":0,"b":0},"output":[1]},
    {"input":{"r":1,"g":1,"b":1},"output":[0]},
    {"input":{"r":0.9946686414994091,"b":0.4807334455619977,"g":0.19171149517465236},"output":[0]},
    {"input":{"r":0.13559972555355793,"b":0.60739182412514,"g":0.5544208604665978},"output":[1]},
    {"input":{"r":0.8651727021968941,"b":0.08669904710485943,"g":0.8146488352255706},"output":[0]},
    {"input":{"r":0.03018639247671473,"b":0.994434320933795,"g":0.14787189906573484},"output":[1]},
    {"input":{"r":0.2411985983410745,"b":0.7485510807330887,"g":0.9996430265268781},"output":[0]},
    {"input":{"r":0.5900045285631096,"b":0.14519399329484417,"g":0.1474690530867625},"output":[1]},
    {"input":{"r":0.29999648054405703,"b":0.23847750696758852,"g":0.577630572942247},"output":[0]},
    {"input":{"r":0.8947797018611022,"b":0.884575576983862,"g":0.6552051914266552},"output":[0]},
    {"input":{"r":0.5094002878014817,"b":0.35231725395944413,"g":0.04500191634355177},"output":[1]},
    {"input":{"r":0.5249600379296813,"b":0.9219831074869407,"g":0.3046016983361599},"output":[1]},
    {"input":{"r":0.755365346901675,"b":0.7033827664823756,"g":0.7527033719183233},"output":[0]},
    {"input":{"r":0.7318765231727177,"b":0.4416822505693544,"g":0.4686927489356296},"output":[0]},
    {"input":{"r":0.7698929072687546,"b":0.037069016066851646,"g":0.4807772213808328},"output":[1]},
    {"input":{"r":0.8748999242373072,"b":0.016145272932732047,"g":0.6499841682639895},"output":[0]},
    {"input":{"r":0.2411265249185146,"b":0.1715967291584093,"g":0.7566673191160379},"output":[0]},
    {"input":{"r":0.5317805742904639,"b":0.2511252376008696,"g":0.4451943229215394},"output":[1]},
    {"input":{"r":0.12900299667724846,"b":0.7681145018810501,"g":0.07751701842016345},"output":[1]},
    {"input":{"r":0.772368324516598,"b":0.31380537330167757,"g":0.3272203512840043},"output":[0]}]

net.train(data);

const color1 = document.getElementById('color')
const guess1 = document.getElementById('guess')
const whiteButton = document.getElementById('white-button')
const blackButton = document.getElementById('black-button')
const printButton = document.getElementById('print-button')

let color

setRandomColor()

whiteButton.addEventListener('click', () => {
    chooseColor(1)
})

blackButton.addEventListener('click', () => {
    chooseColor(0)
})

printButton.addEventListener('click', printJsn)

function chooseColor(value){
    data.push({
        input: color,
        output: [value]
    })
    setRandomColor()

}

function printJsn(){
    console.log(JSON.stringify(data))
}

function setRandomColor() {
    color = {
        r: Math.random(),
        b: Math.random(),
        g: Math.random()
    }

    const guess = net.run(color)
    console.log(guess[0])

    color1.style.backgroundColor = 
    `rgba(${color.r * 255}, ${color.g*255}, ${color.b*255})`

    guess1.style.color = guess > .5 ? '#FFF' : '#000'
}

const diagram = document.getElementById('diagram')
diagram.innerHTML = brain.utilities.toSVG(net)