//function used for filling navigation with things in article
const fill_nav = (target) =>{
    const content_to_fill = document.querySelector(target);
    let to_fill = document.getElementById("article-features");
    let child = to_fill.lastElementChild; 
        while (child) {
            to_fill.removeChild(child);
            child = to_fill.lastElementChild;
        }
    //filling "In this article"
    let to_be_filled = document.createElement(`a`);
    to_be_filled.setAttribute("class", "nav-link");
    to_be_filled.setAttribute("href", `#${content_to_fill.id}`);
    to_be_filled.innerText = "In this article:";
    to_fill.appendChild(to_be_filled);
    //filling rest
    for(i=0; i<content_to_fill.children.length;i++){
        if(content_to_fill.children[i].classList.length > 0){
            let node = content_to_fill.children[i];
            to_be_filled = document.createElement(`a`);
            to_be_filled.setAttribute("class", "nav-link");
            let classes = ``;
            for(let j = 0; j < node.classList.length; j++){
                classes += `${node.classList[j]} `;
            }
            to_be_filled.setAttribute("href", `#${node.id}`);
            to_be_filled.innerText = classes;
            to_fill.appendChild(to_be_filled);
            //console.log(node); 
        }
    }
}
//This part of code job is to implement fill_nav on topics.
const fill_implementation = (name)=>{
    const topics = document.querySelector(`${name}`);
    //console.log(all_links);
    for (i=0; i<topics.children.length;i++){
        let node = topics.children[i].attributes
        //console.log(topics.children[i].attributes)
        for(j=0; j<node.length;j++){
            if(node[j].nodeName=="href"){
                console.log(node[j].value);
                let value = node[j].value;
                //topics.children[i].addEventListener("click", fill_nav(value));
                console.log(topics.children[i]);
                topics.children[i].setAttribute("onclick", `fill_nav("${value}")`)
            }
        }
        //
    }   
}
fill_implementation("#topics")
 
 //code for active documentation navigation stylization
 const activation = (name)=>{
    const all_links = document.querySelectorAll(`${name} > a`);
    let last_used = false;
    //console.log(all_links);

    for (i=0; i<all_links.length;i++){
        if("active" in all_links[i].classList){
            continue;
        }
        all_links[i].addEventListener("click", (event)=>{
            event.target.classList.add("active");
            if(!last_used){ last_used = event.target}
            else if(last_used == event.target){
                true;
            }
            else{
                last_used.classList.remove("active");
                last_used = event.target;
            }
        });
    }   
}
activation("#topics");
activation("#article-features");

//Code for searching using searchbar:
// let search = document.querySelector("#searchbar");
// search.addEventListener("keypress", (event)=>{
//     event.target.classList
// }

