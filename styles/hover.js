document.addEventListener("DOMContentLoaded", function () {
    
});

document.addEventListener("DOMContentLoaded", function () {
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Navigate to the clicked item's href
            window.location.href = item.getAttribute('href');
        });
    });
});

