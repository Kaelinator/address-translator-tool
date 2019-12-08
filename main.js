const UPPER_BITS = {
  '0000': { rlt: "open", rlb: "short" },
  '0001': { rlt: "976 kOhm", rlb: "102 kOhm" },
  '0010': { rlt: "976 kOhm", rlb: "182 kOhm" },
  '0011': { rlt: "1000 kOhm", rlb: "280 kOhm" },
  '0100': { rlt: "1000 kOhm", rlb: "392 kOhm" },
  '0101': { rlt: "1000 kOhm", rlb: "523 kOhm" },
  '0110': { rlt: "1000 kOhm", rlb: "681 kOhm" },
  '0111': { rlt: "1000 kOhm", rlb: "887 kOhm" },
  '1000': { rlt: "887 kOhm", rlb: "1000 kOhm" },
  '1001': { rlt: "681 kOhm", rlb: "1000 kOhm" },
  '1010': { rlt: "523 kOhm", rlb: "1000 kOhm" },
  '1011': { rlt: "392 kOhm", rlb: "1000 kOhm" },
  '1100': { rlt: "280 kOhm", rlb: "1000 kOhm" },
  '1101': { rlt: "182 kOhm", rlb: "976 kOhm" },
  '1110': { rlt: "102 kOhm", rlb: "976 kOhm" },
  '1111': { rlt: "short", rlb: "open" },
}

const LOWER_BITS = {
  '000': {rht: "open", rhb: "short"},
  '001': {rht: "976 kOhm", rhb: "102 kOhm"},
  '010': {rht: "976 kOhm", rhb: "182 kOhm"},
  '011': {rht: "1000 kOhm", rhb: "280 kOhm"},
  '100': {rht: "1000 kOhm", rhb: "392 kOhm"},
  '101': {rht: "1000 kOhm", rhb: "523 kOhm"},
  '110': {rht: "1000 kOhm", rhb: "681 kOhm"},
  '111': {rht: "1000 kOhm", rhb: "887 kOhm"},
}

let $binAddress, $hexAddress

document.addEventListener("DOMContentLoaded", () => {
  $binAddress = document.getElementById('bin-address')
  $binAddress.oninput = () => calculateBin($binAddress.value)
  $hexAddress = document.getElementById('hex-address')
  $hexAddress.oninput = () => calculateHex($hexAddress.value)
  setErrVisibility(false)
})

const calculateHex = address => {
  if (address.match(/[^0-9a-fA-F]+/) || address.length != 2)
    return setErrVisibility(true)

  const upperBits = parseInt(address.slice(0, 1), 16).toString(2).padStart(3, '0')

  if (upperBits.length > 3)
    return setErrVisibility(false)

  setErrVisibility(false)

  const lowerBits = parseInt(address.slice(1), 16).toString(2).padStart(4, '0')
  const binary = upperBits + lowerBits
  
  $binAddress.value = binary
  calculate(binary)
}

const calculateBin = address => {
  if (address.match(/[^10]+/) || address.length != 7)
    return setErrVisibility(true)

  setErrVisibility(false)

  $hexAddress.value = parseInt(address, 2).toString(16)

  calculate(address)
}

const calculate = binAddress => {

  const lowerBits = binAddress.slice(0, 3)
  const upperBits = binAddress.slice(3)

  const {rht, rhb} = LOWER_BITS[lowerBits]
  console.log(upperBits)
  const {rlt, rlb} = UPPER_BITS[upperBits]

  setResistorValues({rht, rhb, rlt, rlb})
}

const setResistorValues = ({ rht, rhb, rlt, rlb }) => {
  document.getElementById('rht').innerText = rht
  document.getElementById('rhb').innerText = rhb
  document.getElementById('rlt').innerText = rlt
  document.getElementById('rlb').innerText = rlb
}

const setErrVisibility = visible => {
  document.getElementById('invalid').style.visibility = visible ? 'visible' : 'hidden'
}
