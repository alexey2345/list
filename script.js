const listStorage ={ };
const list = document.querySelector(".list");

function add() {
    const input = document.querySelector('input');

    if (!input.value) {
        return;
    }

    const li = document.createElement('li');
    list.appendChild(li);

    const div = document.createElement('div');
    div.innerHTML = input.value ;
    div.contentEditable = true;
    li.appendChild(div);


    const btn = document.createElement('button');
    btn.innerHTML = 'X';


    btn.addEventListener('click', function() {
        const isAllowed = confirm(`are you sure you want to delete ${div.innerHTML}?`);

        if (isAllowed) {
            li.remove();
            removeFromLocalStorage(div.innerHTML);
        }
    });
    li.appendChild(btn);


    input.value = '';
    div.addEventListener('blur', saveDate);
    list.appendChild(li);
    saveDate();
}

const input = document.getElementById("input")
function keyup(ev) {
    if (ev.key == 'Enter') {
        add();
    }
};

function removeFromLocalStorage(text) {
    const storedList = JSON.parse(localStorage.getItem("storedList"));
    const updatedList = storedList.filter(item => item !== text);
    localStorage.setItem("storedList", JSON.stringify(updatedList));
}
function clearList() {
    if (!list.firstChild) {
        alert("Nothing to remove");
        return;
    }

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    localStorage.clear();
    alert("List is cleared");
}


    function saveDate(){
        let savedDate = [];
        const lis =document.querySelectorAll(".list li div");
        for (const el of lis){
            savedDate.push(el.innerHTML);
        }
        localStorage.setItem("storedList", JSON.stringify(savedDate));
    }
    function loadDate(){ 
        if (localStorage.storedList){
            const showList = JSON.parse(localStorage.storedList);

            for (const el of showList){
                const li = document.createElement("li");
                const div = document.createElement('div');
                div.innerHTML = el;
                div.contentEditable = true;
                li.appendChild(div);
    
                const btn = document.createElement('button');
                btn.innerHTML = 'X';
                li.appendChild(btn);
            
            
                btn.addEventListener('click', function() {
                    const isAllowed = confirm(`are you sure you want to delete ${div.innerHTML}?`);
            
                    if (isAllowed) {
                        li.remove();
                        removeFromLocalStorage(el);
                        saveDate();
                    }
                });
                
                
                div.addEventListener('blur', saveDate);
                list.appendChild(li);
                
            }
        }
    }

    window.addEventListener("load", loadDate);