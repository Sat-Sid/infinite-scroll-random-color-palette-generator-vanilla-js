
const boxContainer = document.querySelector(".box-container");
const iconsClassNames = ["bi", "bi-clipboard", "bi-check2"];
const toolTipText = {
	onHoverTxt: "Copy to clipboard",
	onClickTxt: "Copied"
};


//Initialize with 5 cards (".box") to start with
for(let i=0; i< 5; i++){
	addNewBox();
}

let allBoxs = document.querySelectorAll(".box");
let targetLastBox = document.querySelector(".box:last-child");

addListenerFunction();

//Intersection Observer
const ob = new IntersectionObserver(function entriesCallBackFun(entries){

	const element = entries[0];
	const currentElemnt = element.target;

	if (element.isIntersecting){
		addNewBox();
		ob.disconnect(currentElemnt);

		targetLastBox = document.querySelector(".box:last-child");
		allBoxs = document.querySelectorAll(".box");

		ob.observe(targetLastBox);

		//addListenerFunction();
		

	} else {
		return;
	}

	addListenerFunction();

});

ob.observe(targetLastBox);


//Function to add new div element ("box") inside "box-container" 
function addNewBox(){

	const newBox = createNewElementFun("div", {"class": ["box"]});
	const iconAndValueDiv = createNewElementFun("div", {"class": ["copy-color-values"]});
	const tooltipMsgSpan = createNewElementFun("span", {"class": ["tool-tip-msg"]});
	const iconBtn = createNewElementFun("button", {"type": "button", "class": ["btn"]});
	const iconEle = createNewElementFun("i", {"class": [iconsClassNames[0], iconsClassNames[1]]});
	const colorValueDiv = createNewElementFun("div", {"class": ["copy-value"]});
	const colorValPara = createNewElementFun("p", {});

	const hslColorName = randomHSLColor()

	newBox.style.backgroundColor = hslColorName;

	appenNewChildFun(boxContainer, newBox);
	appenNewChildFun(newBox, iconAndValueDiv);
	appenNewChildFun(iconAndValueDiv, iconBtn);
	appenNewChildFun(iconBtn, iconEle);
	appenNewChildFun(iconAndValueDiv, tooltipMsgSpan);
	tooltipMsgSpan.innerText = toolTipText.onHoverTxt;

	appenNewChildFun(iconAndValueDiv, colorValueDiv);
	appenNewChildFun(colorValueDiv, colorValPara);
	colorValPara.innerText = hslColorName;

}


//Random number generator
function generateRandNum(maxValue){
	let num = Math.floor(Math.random() * maxValue);

	return num;
}


//Random HSL value generator
function randomHSLColor(){
	const h = generateRandNum(361);
	const s = generateRandNum(101);
	const l = generateRandNum(101);

	const randColorHSL = `hsl(${h}deg ${s}% ${l}%)`;

	return randColorHSL;
}


//Loop through all Boxs in allBoxs array & add event listener to each btn
function addListenerFunction(){

	allBoxs.forEach(function(eachBox){

		const btn = eachBox.firstElementChild.firstElementChild;
		btn.addEventListener("click", function(){

			const hslValue = this.parentElement.parentElement.lastChild.lastChild.innerText;
	
			//Copy to clipboard
			copyToClipboard(hslValue);
	
			tooltipTitleIconToggle(this);
	
		});
	});

}


//Function to copy text on to Clipboard
function copyToClipboard(copyedText) {

	//console.log(copyedText);
	navigator.clipboard.writeText(copyedText);
}


//Display tooltip message based on user action
function tooltipTitleIconToggle(btnClicked) {

	const siblingSpanEle = btnClicked.nextElementSibling; 

	//const iconEle = btnClicked.firstElementChild;
	const iconClassList = btnClicked.firstElementChild.classList;

	iconClassList.remove(iconsClassNames[1]);
	iconClassList.add(iconsClassNames[2]);

	// iconEle.classList.toggle("bi-clipboard");
	// iconEle.classList.toggle("bi-check2");

	//Wait for 3s & then change tool tip text and icon back to initial stage
	setTimeout(function(){

		iconClassList.remove(iconsClassNames[2]);
		iconClassList.add(iconsClassNames[1]);

		// iconEle.classList.toggle("bi-clipboard");
		// iconEle.classList.toggle("bi-check2");


		siblingSpanEle.innerText = toolTipText.onHoverTxt;

	}, 3000)


	siblingSpanEle.innerText = toolTipText.onClickTxt;
}


//Function to create new HTML element
function createNewElementFun(eleName, attrObj) {

	let newEle = document.createElement(`${eleName}`);

	for(const key in attrObj){
		if (key === "class"){
			for(const eachClass of attrObj[key]){
				newEle.classList.add(eachClass);
			}
		} else {
			newEle.setAttribute(`${key}`, `${attrObj[key]}`);
		}
	}

	return newEle;
}


//Function to append child element on parent element
function appenNewChildFun(parentEle, childEle) {

	parentEle.appendChild(childEle);
}