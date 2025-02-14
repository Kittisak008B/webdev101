// DOM (Document Object Model) is indeed a structured representation of an HTML document 
// that allows JavaScript to access, manipulate, and modify elements dynamically.

const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE' //default mode   
let selectedId = -1

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search) //window.location.search -> '?id=2'
    const id = urlParams.get('id')
    if (id) {  //If there is an id, change the mode to EDIT and store the id variable   (mode=CREATE -> post  mode=EDIT -> put)
      mode = 'EDIT'
      selectedId = id

      let firstNameDOM = document.querySelector('input[name=firstname]')
      let lastNameDOM = document.querySelector('input[name=lastname]')
      let ageDOM = document.querySelector('input[name=age]')
      let descriptionDOM = document.querySelector('textarea[name=description]')

      let genderDOMs = document.querySelectorAll('input[name=gender]')
      let interestDOMs = document.querySelectorAll('input[name=interest]')
      try{
        const response = await axios.get(`${BASE_URL}/users/${id}`) //get a specific user by id
        const user = response.data //old data
        // console.log(user)

        firstNameDOM.value = user.firstname //Fill the form with the old data
        lastNameDOM.value = user.lastname
        ageDOM.value = user.age
        descriptionDOM.value = user.description

        for (let i = 0; i < genderDOMs.length; i++) {
            if (user.gender == genderDOMs[i].value) {
                genderDOMs[i].checked = true
            }
        }

        const interest = user.interest.split(',').map(interest => interest.trim())
        for (let i = 0; i < interestDOMs.length; i++) {
            if (interest.includes(interestDOMs[i].value)) {
                interestDOMs[i].checked = true
            }
        }
      }catch(error){
        console.log('error', error)
      }
    }
}
  

const validateData = (userData) => {
    let errors = []
    if (!userData.firstname) {
        errors.push('Please enter firstname')
    }
    if (!userData.lastname) {
        errors.push('Please enter lastname')
    }
    if (!userData.age) {
        errors.push('Please enter age')
    }
    if (!userData.gender) {
        errors.push('Please select gender')
    }
    if (!userData.interest) {
        errors.push('Please select interest')
    }
    if (!userData.description) {
        errors.push('Please enter description')
    }
    return errors
}
  
const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')

    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {}

    let descriptionDOM = document.querySelector('textarea[name=description]')

    let responseMessageDOM = document.getElementById('response-message')

    try {
        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i != interestDOMs.length - 1) {
            interest += ', '
            }
        }
        let userData = {
            firstname: firstNameDOM.value,
            lastname: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interest: interest
        }
        //validate
        const errors = validateData(userData)
        if (errors.length > 0) {
            throw {message: 'Incomplete information entered', errors: errors}
        }
        
        console.log('submit data', userData)
        let successText = 'Form submission successful !'
        if (mode == 'EDIT'){
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData) //update a specific user by id 
            console.log('response data', response.data)
            successText = 'User updated successfully'
        } else {
            const response = await axios.post(`${BASE_URL}/users`, userData) //create a new user
            console.log('response data', response.data)
        }
        responseMessageDOM.innerText = successText
        responseMessageDOM.className = 'message success'

    } catch (error) {
        let htmlData = 'Form submission fail !'
        if (error.response){
            console.error(error.response.data.message)
        }
        if(error.errors && error.errors.length > 0) {
            htmlData = '<div>'
            htmlData += `<div>${error.message}</div>`
            htmlData += '<ul>'
            for (let i = 0 ; i < error.errors.length ; i++) {
                htmlData += `<li>${error.errors[i]}</li>`
            }
            htmlData += '</ul>'
            htmlData += '</div>' 
        }
        responseMessageDOM.innerHTML = htmlData
        responseMessageDOM.className = 'message danger'
    }
}