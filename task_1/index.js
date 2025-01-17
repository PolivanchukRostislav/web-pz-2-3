const images = document.querySelectorAll(".prs-images img");
const links = document.querySelectorAll(".prs-links a");
const personalDataForm = document.querySelector(".prs-form");
const textBlock = document.getElementById("demo");

const rotate = (degree) => `rotate(${degree}deg)`;

const getCurrentDegree = (str) => {
    if (str === "") return 90;
    const rotateValue = str.split("(")[1].split(")")[0];
    const rotateDegree = parseFloat(rotateValue) + 90;
    return rotateDegree === 360 ? 0 : rotateDegree;
};

images.forEach(image => {
    image.addEventListener("click", () => alert(image.getAttribute("src")));

    image.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        const currentDegree = image.style.transform;
        image.style.transform = rotate(getCurrentDegree(currentDegree));
    });
});

links.forEach(link => {
    link.addEventListener("mouseover", () => {
        const href = link.href;
        link.textContent += ` (${href})`;
    });

    link.addEventListener("mouseout", () => {
        const textArr = link.textContent.split(" ");
        textArr.pop();
        link.textContent = textArr.join(" ");
    });
});

const validationName = (name) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (name.length > 50 || name.length < 2) return false;
    return regex.test(name);
};

const validationAge = (age) => {
    if (age <= 0) return false;
    else return age <= 120;
};

personalDataForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const personalData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        age: document.getElementById('age').value,
    };

    const createDataWindow = (data) => {
        const dataWindow = document.createElement("div");
        dataWindow.classList.add("data-window");

        const content = `
            <p>First Name: ${data.firstName}</p>
            <p>Last Name: ${data.lastName}</p>
            <p>Age: ${data.age}</p>
        `;

        dataWindow.innerHTML = content;

        document.body.appendChild(dataWindow);
    };

    personalDataForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const personalData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            age: document.getElementById('age').value,
        };

        let isValid = true, message = ""; 
        document.getElementById('first-name').style.borderColor = "green";
        document.getElementById('last-name').style.borderColor = "green";
        document.getElementById('age').style.borderColor = "green";

        if (!validationName(personalData.firstName + " " + personalData.lastName)) {
            isValid = false;
            message += "First and last name must be letters without special characters and max length should be 50 characters.\n";
            document.getElementById('first-name').style.borderColor = "red";
            document.getElementById('last-name').style.borderColor = "red";
        }

        if (!validationAge(personalData.age)) {
            isValid = false;
            message += "Age must be only a number without a negative number.\n";
            document.getElementById('age').style.borderColor = "red";
        }

        if (isValid) {
        
            alert("This form is valid!!!");

            createDataWindow(personalData);
        } else {
            alert("This form is not valid!!!" + "\n" + message);
        }
    });

});

