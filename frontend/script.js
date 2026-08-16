let msmes = [];

fetch("http://localhost:8082/api/msmes")
    .then(response => response.json())
    .then(data => {
        msmes = data;
        displayMSMEs(msmes);  
    })
    .catch(error => console.error(error));
let editId = null;
function displayMSMEs(data){

    const container=document.getElementById("cardContainer");

    container.innerHTML="";

    data.forEach(item=>{

        container.innerHTML+=`

        <div class="card">

            <div class="card-content">

                <h2>${item.name}</h2>

                <p>${item.description}</p>

                <hr>

                <p><b> Offering :</b> ${item.offering}</p>

                <p><b>🏷 Category :</b> ${item.category}</p>

                <p><b> Location :</b> ${item.location}</p>

                <p><b> Phone :</b> ${item.phone}</p>

                <p><b> Email :</b> ${item.email}</p>

                <p><b> Rating :</b> ${item.rating}</p>
                <div class="action-buttons">

    <button class="edit-btn" onclick="editMSME(${item.id})">
        ✏️ Edit
    </button>
    <button class="delete-btn" onclick="deleteMSME(${item.id})">
    🗑 Delete
</button>

    <a href="tel:${item.phone}" class="call-btn">
        📞 Call
    </a>

    <a href="mailto:${item.email}" class="email-btn">
        📧 Email
    </a>

    <button class="share-btn" onclick="shareMSME(${item.id})">
        📤 Share
    </button>

</div>

    
</div>

                

            </div>

        </div>

        `;

    });

}




// Initial Load

displayMSMEs(msmes);


// Search
document.getElementById("search").addEventListener("keyup", function () {

    const keyword = this.value.trim();

    if (keyword === "") {
        displayMSMEs(msmes);
        return;
    }

    fetch(`http://localhost:8082/api/msmes/search?keyword=${encodeURIComponent(keyword)}`)
        .then(response => response.json())
        .then(data => {
            displayMSMEs(data);
        })
        .catch(error => {
            console.error("Search error:", error);
        });

});
// Category Filter

const buttons = document.querySelectorAll(".categories button");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class
        buttons.forEach(btn => btn.classList.remove("active"));

        // Add active class
        this.classList.add("active");

        const category = this.textContent.trim();

        // If All is selected
        if (category === "All") {
            displayMSMEs(msmes);
            return;
        }

        // Get category data from backend
        fetch(`http://localhost:8082/api/msmes/category/${encodeURIComponent(category)}`)
            .then(response => {

                if (!response.ok) {
                    throw new Error("Category API failed: " + response.status);
                }

                return response.json();
            })
            .then(data => {

                displayMSMEs(data);

            })
            .catch(error => {

                console.error("Category error:", error);

            });

    });

});
function showDetails(id){

    const company=msmes.find(x=>x.id===id);

    alert(
`Company : ${company.name}

Description : ${company.description}

Offering : ${company.offering}

Category : ${company.category}

Location : ${company.location}

Phone : ${company.phone}

Email : ${company.email}

Rating :  ${company.rating}`
);
    }
    function shareMSME(id) {

    const company = msmes.find(item => item.id === id);

    const message = `
Company: ${company.name}

Description: ${company.description}

Offering: ${company.offering}

Category: ${company.category}

Location: ${company.location}

Phone: ${company.phone}

Email: ${company.email}
`;

    if (navigator.share) {

        navigator.share({
            title: company.name,
            text: message
        });

    } else {

        navigator.clipboard.writeText(message);

        alert("MSME details copied to clipboard.");

    }
}
// Home
function goHome() {

    displayMSMEs(msmes);

    document.getElementById("search").value = "";

}

// Categories
function goCategory() {

    document.querySelector(".categories")
        .scrollIntoView({
            behavior: "smooth"
        });

}

// Saved
function showSaved() {

    alert("Favorites feature will be added later.");

}

// Profile
function showProfile() {

    alert("MSME Connect\n Developed by sai kiran");

}
const addBtn = document.getElementById("addBtn");
const formContainer = document.getElementById("formContainer");

addBtn.addEventListener("click", function () {

    if (formContainer.style.display === "none") {
        document.getElementById("formContainer").style.display = "block";
    } else {
        formContainer.style.display = "none";
    }

});
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", saveMSME);

function saveMSME() {

    const newMSME = {

        id: msmes.length + 1,

        name: document.getElementById("name").value,

        description: document.getElementById("description").value,

        offering: document.getElementById("offering").value,

        category: document.getElementById("category").value,

        location: document.getElementById("location").value,
 
        phone: document.getElementById("phone").value,

        email: document.getElementById("email").value,

        rating: parseFloat(document.getElementById("rating").value)

    };

   // Validation
    // Validation
if (
    newMSME.name.trim() === "" ||
    newMSME.description.trim() === "" ||
    newMSME.offering.trim() === "" ||
    newMSME.category.trim() === "" ||
    newMSME.location.trim() === "" ||
    newMSME.phone.trim() === "" ||
    newMSME.email.trim() === "" ||
    isNaN(newMSME.rating)
) {
    alert("Please fill all the fields.");
    return;
}

// Phone validation
if (!/^\d{10}$/.test(newMSME.phone)) {
    alert("Phone number must contain exactly 10 digits.");
    return;
}

// Email validation
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMSME.email)) {
    alert("Please enter a valid email address.");
    return;
}

// Rating validation
if (newMSME.rating < 0 || newMSME.rating > 5) {
    alert("Rating must be between 0 and 5.");
    return;
}
    // Add to array
    if (editId === null) {

    fetch("http://localhost:8082/api/msmes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMSME)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("name").value = "";
document.getElementById("description").value = "";
document.getElementById("offering").value = "";
document.getElementById("category").value = "";
document.getElementById("location").value = "";
document.getElementById("phone").value = "";
document.getElementById("email").value = "";
document.getElementById("rating").value = "";

        msmes.push(data);
        displayMSMEs(msmes);

        formContainer.style.display = "none";
        alert("MSME Added Successfully");

    })
    .catch(error => console.error(error));

    return;
}


else {

    newMSME.id = editId;

    fetch(`http://localhost:8082/api/msmes/${editId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMSME)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("name").value = "";
document.getElementById("description").value = "";
document.getElementById("offering").value = "";
document.getElementById("category").value = "";
document.getElementById("location").value = "";
document.getElementById("phone").value = "";
document.getElementById("email").value = "";
document.getElementById("rating").value = "";

        const index = msmes.findIndex(item => item.id === editId);

        msmes[index] = data;

        displayMSMEs(msmes);

        editId = null;

        document.getElementById("saveBtn").innerText = "Save MSME";

        formContainer.style.display = "none";

        alert("MSME Updated Successfully");

    })
    .catch(error => console.error(error));

    return; }
}

    

    
    // Refresh cards
    
function editMSME(id) {

    alert("Edit clicked. ID = " + id);

    editId = id;

    const company = msmes.find(item => item.id == id);

    console.log(company);

    if (!company) {
        alert("Company not found!");
        return;
    }

    document.getElementById("name").value = company.name;
    document.getElementById("description").value = company.description;
    document.getElementById("offering").value = company.offering;
    document.getElementById("category").value = company.category;
    document.getElementById("location").value = company.location;
    document.getElementById("phone").value = company.phone;
    document.getElementById("email").value = company.email;
    document.getElementById("rating").value = company.rating;

    document.getElementById("formContainer").style.display = "block";

    document.getElementById("saveBtn").innerText = "Update MSME";
}
function deleteMSME(id) {

    if (!confirm("Are you sure you want to delete this MSME?")) {
        return;
    }

    fetch(`http://localhost:8082/api/msmes/${id}`, {
        method: "DELETE"
    })
    .then(() => {

        msmes = msmes.filter(item => item.id !== id);

        displayMSMEs(msmes);

        alert("MSME Deleted Successfully");

    })
    .catch(error => console.error(error));
}