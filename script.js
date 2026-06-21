const formate_Doc = (cmd, value='false')=> {
  // console.log("Formating");
  if(value) {
    document.execCommand(cmd, false, value);
  }
  else{
    document.execCommand(cmd);
  }
  
}
let activeBtn = document.querySelector(".container");
let firstPage = document.querySelector(".firstPage");

const startBtn = () => {
  activeBtn.classList.remove("inactive");
  firstPage.classList.add("inactive");
}

const handleAddLink = () => {
  const url = prompt("Enter the URL");
  formate_Doc("createLink", url);
}

let content = document.getElementById("content");
content.addEventListener('mouseenter', () => {
  let anchors = content.querySelectorAll("a");
  

  anchors.forEach((anchor) => {
    anchor.addEventListener('mouseenter', (e) => {
      anchor.setAttribute("target", "_blank");
      content.setAttribute("contenteditable", "false");
    });
    anchor.addEventListener('mouseleave', (e) => {
      
      content.setAttribute("contenteditable", "true");
    });
  });
});
let fileName = document.getElementById("file-name");
const handleFileUpLoad = (value) => {
  if(value === "new"){
    content.innerHTML="";
    fileName.value = "File Name";
  }
  if(value === "pdf"){
    html2pdf(content).save(fileName.value);
  }
  if(value === "txt") {
    const extrectedText = content.innerText;
    const blob = new Blob([extrectedText]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.value + ".txt";
    a.click();
  }
}

const clearContent = () => {
  content.innerHTML = "";
}