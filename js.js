//for removing children from an element
const remove_children = (where)=>{
    let child = where.lastElementChild; 
    while (child) {
        where.removeChild(child);
        child = where.lastElementChild;}
}
let last_used = [false,false];
//code for "activation" (style) ANY element.
const activation = (element, local_last_used = false)=>{
    element.classList.add("active");
    if(!local_last_used){return element;}
    else if(local_last_used == element){return element;}
    else{
        local_last_used.classList.remove("active");
        return element}
};
//Variables for path filling (over searchbar)
let path = document.getElementById("path");
let path_text = ['JS']
//code for applying "activation" (style) multiple elements with same name.
//and changing path.
const multi_activation = (name, top_art)=>{
    const all_links = document.querySelectorAll(`${name}`);
    for (i=0; i<all_links.length;i++){
        if("active" in all_links[i].classList){
            continue;}
        else if(top_art == "art"){
            all_links[i].addEventListener("click", (event)=>{
                last_used[1] = activation(event.target, last_used[1]);
                path_text[2] = event.target.innerText;
                path.innerText = path_text.join(' / ');
            }); }
        else if(top_art == "top"){
            all_links[i].addEventListener("click", (event)=>{
                last_used[0] = activation(event.target, last_used[0]);
                path_text[1] = event.target.innerText;
                if(path_text[2]){path_text.pop()}
                path.innerText = path_text.join(' / ');
            });}}   
}
multi_activation("#topics > a", "top");

//function for creating elements and assigning text to them, hrefs, classes, id's, title
const create_an_element = (what, id = false, classes = false, text = false, href = false, title = false)=>{
    let element_to_be_filled = document.createElement(`${what}`);
    if(id){ element_to_be_filled.setAttribute('id', id)}
    if(classes){
        classes.forEach((element)=>{
            element_to_be_filled.classList.add(element);
        });}
    if(text){ element_to_be_filled.innerText = text; }
    if(href){ element_to_be_filled.setAttribute('href', href)}
    if(title){ element_to_be_filled.setAttribute('title', title)}
    return element_to_be_filled;
}
//function used for filling navigation with things in article using title property
const fill_nav = (target) =>{
    const content_to_fill = document.querySelector(target);
    //Element which will be filled by to_be_filled
    let to_fill = document.getElementById("article-features");
    remove_children(to_fill);
    //filling "In this article"
    let to_be_filled = create_an_element("a", false, ["nav-link"], "In this article:", `#${content_to_fill.id}`);
    to_fill.appendChild(to_be_filled);
    //filling rest
    for(i=0; i<content_to_fill.children.length;i++){
        if(content_to_fill.children[i].title.length > 0){
            let node = content_to_fill.children[i];
            to_be_filled = create_an_element("a", false, ["nav-link"], `${node.title}`, `#${node.id}`);
            to_fill.appendChild(to_be_filled);}}
    //applying style
    multi_activation("#article-features > a", "art")

}

//This part of code job is to implement fill_nav on topics.
const fill_implementation = (name)=>{
    const topics = document.querySelector(`${name}`);
    for (i=0; i<topics.children.length;i++){
        let node = topics.children[i].attributes
        for(j=0; j<node.length;j++){
            if(node[j].nodeName=="href"){
                topics.children[i].setAttribute("onclick", `fill_nav("${node[j].value}")`)
            }}}   
    //applying style
    multi_activation("#article-features > a", "art");
}
fill_implementation("#topics")


//Code for searching using searchbar:
//
const searchbar = document.getElementById("searchbar")
    //Code for focusing searchbar when clicking on icon:
    const focus_search = ()=>{
        searchbar.focus();
    }

// Fills in searching results under searchbar
const fill_search = (target) =>{
    //target is meant to be filled IN to_be_filled
    let to_be_filled = document.getElementById("searched");
    let node = target.parentNode.id;
    let searched = create_an_element("a", false, false, target.innerText,`#${node}`)
    //similiar code to fill_implementation
    searched.addEventListener("click",(event)=>{
        const topics = document.querySelector(`#topics`);
        for (i=0; i<topics.children.length;i++){
                let node = topics.children[i].attributes
                for(j=0; j<node.length;j++){
                    if(node[j].nodeName=="href" && node[j].value == event.target.attributes[0].value){
                        topics.children[i].click(); //Simulating click to apply effects with ease.
                        i = topics.children.length; //to break loops;
                    }}}});
    to_be_filled.appendChild(searched);
}

let searchbar_focused;
searchbar.addEventListener('focusin', (event) => {
    searchbar_focused = document.querySelector("#searchbar:focus");
});
const search_results = document.getElementById("searched");
searchbar.addEventListener('focusout', (event) => {
    setTimeout(()=>{
    searchbar.style.boxShadow = "";
    search_results.style.display = "none";
    }, 200); // Set timeout is used at 200ms cap so the href can actually work!
    console.log('Henryk');
});

// Main searchbar function
searchbar.onkeyup = (e)=>{
    //When searchbar is blank, change style:
    const white_spaces_regex = /^\s+$/gm
    if(!searchbar.value || searchbar.value.match(white_spaces_regex)){
        remove_children(search_results);
        search_results.style.display = "none";
        searchbar_focused.style.boxShadow = "-2px -2px 0px #14AFF7, 2px -2px 0px #14AFF7, 2px 2px 0px #14AFF7, -2px 2px 0px #14AFF7";
        return;}
    else{
        //styling:
        search_results.style.display = "flex";
        searchbar_focused.style.boxShadow = "none";
        searchbar_focused.style.boxShadow = "-2px -2px 0px #14AFF7, 2px -2px 0px #14AFF7";
        //removing last results
        remove_children(search_results);
        //filling search
        const main_doc_elements = document.querySelector("#main-doc")
        let counter = 0
        for(i=0; i<main_doc_elements.children.length;i++){
            if(counter>4){break;}
            for(j=0; j<main_doc_elements.children[i].children.length;j++){
                if(counter<4){
                    if (main_doc_elements.children[i].children[j].textContent.toLowerCase().includes(searchbar.value.toLowerCase())){
                        fill_search(main_doc_elements.children[i].children[0]);
                        counter++;
                        break;
                    }}
                else{
                    break;}}}}
}
//Code responsible for burger functionality on mobile devices
const media_query = window.matchMedia("(max-width: 1023px)")
const menu = document.getElementById("nav-links");
const open_menu = (e)=>{
    if(media_query.matches){
        if(menu.style.display =="none" || menu.style.display == false){
            menu.style.display = "grid"
            menu.parentElement.style.gridTemplateRows = "40px minmax(0,64px) auto";
            menu.parentElement.style.gap = "8px";
        }
        else{
            menu.style.display = "none"
            menu.parentElement.style.gridTemplateRows = "40px auto";
            menu.parentElement.style.gap = "0px";
        }
    }
    else{
        menu.style.display = "grid";
        menu.parentElement.style.gridTemplateRows = "72px 40px 96px 1fr"
        menu.parentElement.style.gap = "24px";
    }
}
media_query.addListener(open_menu);