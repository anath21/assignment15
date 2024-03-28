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

        crafts.forEach((craft) => {
            const craftCard = document.createElement('div');
            craftCard.classList.add('craft-card', 'w3-card', 'w3-margin', 'w3-center');
            galleryContainer.appendChild(craftCard);

            const craftLink = document.createElement('a');
            craftLink.href = "#";
            craftCard.appendChild(craftLink);

            const craftImage = document.createElement('img');
            craftImage.src = `/crafts/${craft.image}`;
            craftImage.classList.add('w3-image');
            craftImage.onclick = () => {
                console.log('Craft clicked:', craft);
                openDialog(craft);
            };
            craftLink.appendChild(craftImage);
        });
    };

    const openDialog = (id) => {
        document.getElementById("dialog").style.display = "block";
        document.querySelectorAll("#dialog-details > *").forEach((craft) => {
            craft.classList.add("hidden");
        });
        document.getElementById(id).classList.remove("hidden");
    };

    const showCraftForm = (e) => {
        e.preventDefault();
        openDialog("add-craft-form");
    };

    const addSupply = (e) => {
        e.preventDefault();
        const section = document.getElementById("supply-boxes");
        const input = document.createElement("input");
        input.type = "text";
        section.appendChild(input);
    };

    const resetForm = () => {
        const form = document.getElementById("add-craft-form");
        form.reset();
        document.getElementById("supply-boxes").innerHTML = "";
        document.getElementById("img-prev").src = "";
    };

    showCrafts();
    document.getElementById("add-link").onclick = showCraftForm;
    document.getElementById("add-supply").onclick = addSupply;

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