document.addEventListener("DOMContentLoaded", function() {
    const getCrafts = async () => {
        try {
            return (await fetch("/api/crafts")).json();
        } catch (error) {
            console.log(error);
        }
    };

    const showCrafts = async () => {
        const crafts = await getCrafts();
        const galleryContainer = document.getElementById('galleryContainer');
        galleryContainer.innerHTML = "";

        crafts.forEach((craft) => {
            const craftCard = document.createElement('div');
            craftCard.classList.add('gallery-item', 'w3-card', 'w3-responsive');
            galleryContainer.appendChild(craftCard);

            const craftLink = document.createElement('a');
            craftLink.href = "#";
            craftCard.appendChild(craftLink);

            const craftImage = document.createElement('img');
            craftImage.src = `/crafts/${craft.image}`;
            craftImage.onclick = () => {
                console.log('Craft clicked:', craft);
                displayCraftDetails(craft);
            };
            craftLink.appendChild(craftImage);
        });
    };

    const displayCraftDetails = (craft) => {
        openDialog("craft-details");
    
        const dialogDetails = document.getElementById("craft-details");
        if (dialogDetails) {
            dialogDetails.innerHTML = "";
    
            const h2 = document.createElement("h2");
            h2.textContent = craft.name;
            dialogDetails.appendChild(h2);
    
            const img = document.createElement("img");
            img.src = `/crafts/${craft.image}`;
            img.alt = craft.name;
            img.style.maxWidth = "350px";
            img.style.maxHeight = "300px";
            img.style.width = "auto";
            img.style.height = "auto";
            dialogDetails.appendChild(img);
    
            const p = document.createElement("p");
            p.textContent = craft.description;
            dialogDetails.appendChild(p);
    
            const suppliesList = document.createElement("ul");
            craft.supplies.forEach((supply) => {
                const li = document.createElement("li");
                li.textContent = supply;
                suppliesList.appendChild(li);
            });
            dialogDetails.appendChild(suppliesList);
        }
    };
    

    const openDialog = (id) => {
        document.getElementById("dialog").style.display = "block";
        document.querySelectorAll("#dialog-details > *").forEach((section) => {
            section.classList.add("hidden");
        });
        document.getElementById(id).classList.remove("hidden");
    };

    const showCraftForm = (e) => {
        e.preventDefault();
        console.log("in show craft form");
        resetForm();
        openDialog("add-craft-form");
    };

    const addSupply = (e) => {
        e.preventDefault();
        const section = document.getElementById("supply-boxes");
        const input = document.createElement("input");
        input.type = "text";
        section.append(input);
    };

    const resetForm = () => {
        const form = document.getElementById("add-craft-form");
        form.reset();
        document.getElementById("supply-boxes").innerHTML = "";
        document.getElementById("img-prev").src = "";
    };

    const addCraft = async(e) => {
        e.preventDefault();
        const form = document.getElementById("add-craft-form");
        const formData = new FormData(form);
        formData.append("supplies", getSupplies());
        console.log(...formData);

        const response = await fetch("/api/crafts", {
            method:"POST",
            body:formData
        });

        if(response.status != 200) {
            console.log("there was an error posting");
        }

        await response.json();
        resetForm();
        document.getElementById("dialog").style.display = "none";
        showCrafts()
    };

    const getSupplies = () => {
        const inputs = document.querySelectorAll("#supply-boxes input");
        const supplies = [];

        inputs.forEach((input) => {
            supplies.push(input.value);
        });
        return supplies;
    };

    const cancelForm = () => {
        resetForm();
        document.getElementById("dialog").style.display = "none";
        showCrafts();
    }

    showCrafts();
    document.getElementById("add-link").onclick = showCraftForm;
    document.getElementById("add-supply").onclick = addSupply;
    document.getElementById("add-craft-form").onsubmit = addCraft;
    document.getElementById("cancel-button").onclick = cancelForm;

    document.getElementById("img").onchange = (e) => {
        const prev = document.getElementById("img-prev");
    
        //if they did not pick a file
        if(!e.target.files.length) {
            prev.src = "";
            return;
        }
    
        prev.src = URL.createObjectURL(e.target.files.item(0));
    };
});