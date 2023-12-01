import { API_URL } from "../../settings.js";

function showInputField() {
    var select = document.getElementById("chooseCategory");
    var newOptionGroup = document.getElementById("newOptionGroup");

    if (select.value === 'addNew') {
        newOptionGroup.style.display = 'block';
    } else {
        newOptionGroup.style.display = 'none';
    }
}

export async function initCreationform() {
    fetchCategories();
    document.getElementById('submitNewOption').addEventListener('click', async function () {
        var newCategoryName = document.getElementById('newOption').value;
        if (newCategoryName) {
            try {
                const response = await fetch(API_URL + '/categories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newCategoryName })
                });

                if (response.ok) {
                    fetchCategories(); // Fetch all categories again including the new one
                } else {
                    console.error('Error: Response not OK');
                }
            } catch (error) {
                console.error('Error adding category:', error);
            } finally {
                document.getElementById('newOption').value = '';
                document.getElementById('newOptionGroup').style.display = 'none';
            }
        }
    });

    document.getElementById('productForm').addEventListener('submit', submitProductForm);
    document.getElementById('chooseCategory').addEventListener("change", showInputField);
}

async function fetchCategories() {
    try {
        const response = await fetch(API_URL + '/categories');
        const categories = await response.json();
        populateCategoryDropdown(categories);
    } catch (error) {
        console.error('Error fetching categories', error);
    }
}

function populateCategoryDropdown(categories) {
    const select = document.getElementById('chooseCategory');
    // Clear existing options
    while (select.options.length > 2) { // assuming first 2 options are 'Select Category' and 'Add New'
        select.remove(2);
    }
    // Add fetched categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.text = category.name;
        select.appendChild(option);
    });
}

async function submitProductForm(event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('category', document.getElementById('chooseCategory').value);
    formData.append('price', document.getElementById('price').value);

    var fileInput = document.getElementById("images");
    for (var i = 0; i < fileInput.files.length; i++) {
        var file = fileInput.files[i];
        if (file) {
            formData.append("imageFiles", file);
        }
    }

    try {
        const response = await fetch(API_URL + '/products/addProduct', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log('Success:', data);
        window.router.navigate("/");
    } catch (error) {
        console.error('Error:', error);
    }
}
