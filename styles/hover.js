document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    let isDropdownOpen = false;

    dropdownToggle.addEventListener('mouseover', function () {
        if (!isDropdownOpen) {
            dropdownToggle.click();
            isDropdownOpen = true;
        }
    });

    dropdownMenu.addEventListener('mouseleave', function () {
        if (isDropdownOpen) {
            dropdownToggle.click();
            isDropdownOpen = false;
        }
    });
});