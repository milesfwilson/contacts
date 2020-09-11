let contacts = [];

function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }

  contacts.push(contact)
  saveContacts()
  form.reset()
  drawContacts()
}

function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
}

function loadContacts() {
  let jsonString = window.localStorage.getItem("contacts")
  contacts = JSON.parse(jsonString)
}


function drawContacts() {
  let template = ""

  contacts.forEach(contacts => {
    template += `
    <div class="card mt-1 mb-1 ${contacts.emergencyContact ? 'emergency-contact' : ''}">
        <h3 class="mt-1 mb-1">${contacts.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contacts.phone}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact(${contacts.id})"></i>
          </div>
      </div>
      `
  })
  document.getElementById("contact-list").innerHTML = template
}


function removeContact(contactId) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]['id'] == contactId) {
      contacts.splice(i, 1)
      saveContacts()
      drawContacts()
    }
  }
}

function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.remove("hidden")
  saveContacts()
  drawContacts()
}

function hideContactForm() {
  document.getElementById("new-contact-form").classList.add("hidden")
  saveContacts()
  drawContacts()
}


function generateId() {
  return Math.floor(Math.random() * 10000000) + ""
}


loadContacts()
drawContacts()
