function customRender(reactElement, mainContainer) {
  /* Version 1 Hardcoded Approach (Manually setting each attribute)

  const domElement = document.createElement(reactElement.type);
  domElement.innerHTML = reactElement.children;
  domElement.setAttribute("href", reactElement.props.href);
  domElement.setAttribute("target", reactElement.props.target);

  mainContainer.appendChild(domElement);

  */
  /* Version 2 Modular (Matches how react actually works) */

  const domElement = document.createElement(reactElement.type);
  domElement.innerHTML = reactElement.children;

  for (const key in reactElement.props) {
    if (key === "children") continue;

    domElement.setAttribute(key, reactElement.props[key]);
  }
  mainContainer.appendChild(domElement);
}

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_parent",
  },
  children: "Click me to visit google",
};

const mainContainer = document.getElementById("root");

customRender(reactElement, mainContainer);
