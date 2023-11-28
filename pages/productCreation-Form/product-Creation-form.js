
    import { API_URL } from "../../settings.js";
function showInputField() {
	var select = document.getElementById("chooseCategory");
	var newOptionGroup = document.getElementById("newOptionGroup");

        // Check if the 'Add a new option' is selected
        if(select.value === 'addNew') {
            newOptionGroup.style.display = 'block'; // Show the input field and button
        } else {
            newOptionGroup.style.display = 'none';  // Hide the input field and button
        }
    }
    export async function initCreationform(){
        document.getElementById('submitNewOption').addEventListener('click', function() {
            var newOptionValue = document.getElementById('newOption').value;
            if(newOptionValue) {
                var select = document.getElementById('chooseCategory');
                var option = document.createElement('option');
                option.value = newOptionValue;
                option.text = newOptionValue;
                select.appendChild(option);
                select.value = newOptionValue;
                document.getElementById('newOption').value = '';
                document.getElementById('newOptionGroup').style.display = 'none';
            }
        });
        document.getElementById('productForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
        
            var formData = new FormData();
            formData.append('name', document.getElementById('name').value);
            formData.append('description', document.getElementById('description').value);
            formData.append('category', document.getElementById('chooseCategory').value);
            formData.append('price', document.getElementById('price').value);
            // Add the file to formData
            var fileInput = document.getElementById("images");
        for (var i = 0; i < fileInput.files.length; i++) {
            var file = fileInput.files[i]; // Get the file from the input
            if (file) {
                formData.append("imageFiles", file); // Append the file to formData
            }
        }
        
            fetch(API_URL + '/products/addProduct', {
                method: 'POST',
                body:formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.router.navigate("/")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
     document.getElementById('chooseCategory').addEventListener("change", showInputField)

    
    }
    