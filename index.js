
const root = document.getElementById("root")

const customElement = {
    type : "a",
    props :{
        href: "https://google.com",
        target : "__blank",
        children : "Google Link"
    }
}

function customRender(customElement, container){
    const domElement = document.createElement(customElement.type)
    
    for(let prop in customElement.props){
        if (prop === "children") continue
        domElement.setAttribute(prop, customElement.props[prop])
    }

    domElement.innerHTML = customElement.props.children
    container.appendChild(domElement)
}

customRender(customElement, root)