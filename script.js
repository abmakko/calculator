const root = document.documentElement;


checkBox = document.querySelector('input[type="checkbox"]');

checkBox.addEventListener("click", toggleTheme)


function toggleTheme() {
    if(checkBox.checked == false){
        root.className = "dark";
        }
    else root.className = 'light';
}