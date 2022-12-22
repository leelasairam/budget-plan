let budget=JSON.parse(localStorage.getItem('budget')) || 0;
let Expanses = 0;
let MainList=JSON.parse(localStorage.getItem('expanses')) || [];
let list = ``;
let html = ``;
let NewSavings;
let UpdateId;

function PageLoad(){
    document.querySelector("#budget").innerHTML = `${budget}$`;
    document.querySelector("#savings").innerHTML = `${budget}$`;
    display()
    document.querySelector("#inp-budget").value=budget;
}

window.onload=PageLoad();

const AddBudget = () => {
    let GetBudget = document.querySelector("#inp-budget").value;
    if(GetBudget>0){
        budget=GetBudget;
        localStorage.setItem('budget', JSON.stringify(budget));
        document.querySelector("#budget").innerHTML = `${budget}$`;
        document.querySelector("#savings").innerHTML = `${budget}$`;
    }
    else{
        alert("Budget cannot be null or 0")
    }
}

const AddExpense = () => {
    let name = document.querySelector("#name").value;
    let amount = document.querySelector("#amount").value;
    if(name && amount && amount!=0 && budget){
        MainList.push({id:MainList.length+1,name:name,amount:amount});
        localStorage.setItem('expanses', JSON.stringify(MainList));
        display();
        document.querySelector("#name").value="";
        document.querySelector("#amount").value=0;
    }
    else{
        alert("Ensure [Expanse] [Amount] [Budget] are not equal to 0 or null");
    }
}

function display(){
    list =``;
    Expanses = 0;
    for(let i of MainList){
        Expanses+=parseInt(i.amount);
        list+=`<tr class="table"> <td id="name">${i.id}. ${i.name}</td> <td>${i.amount}</td> <td><a onclick="GetUpdateId(${i.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pencil-square"></i></a><a style="margin-left:0.3rem" onclick="DeteleItem(${i.id})"><i class="bi bi-trash3"></i></a></td> </tr>`;
    }
    NewSavings = budget - Expanses;
    document.querySelector("#savings").innerHTML = `${NewSavings}$`;
    document.querySelector("#expanses").innerHTML = `${Expanses}$`;
    html = `<table id="my-table" class="table"><thead><tr><th scope="col">Expanse</th><th scope="col">Amount($)</th><th scope="col">Actions</th></tr></thead><tbody>${list}<tbody></table>`;
    document.querySelector("#list").innerHTML = html;
}

function DeteleItem(id){
    MainList.splice(id-1, 1);
    display();
    localStorage.setItem('expanses', JSON.stringify(MainList));
}

function GetUpdateId(id){
    UpdateId=id;
    let objIndex = MainList.findIndex((obj => obj.id == UpdateId));
    document.querySelector("#updatename").value=MainList[objIndex].name;
    document.querySelector("#updateamount").value=MainList[objIndex].amount;
}

function UpdateItem(){
    let objIndex = MainList.findIndex((obj => obj.id == UpdateId));
    MainList[objIndex].name = document.querySelector("#updatename").value;
    MainList[objIndex].amount = document.querySelector("#updateamount").value;
    display();
    localStorage.setItem('expanses', JSON.stringify(MainList));
}

function generatePDF() {
    if(MainList.length>0){
        let axis = 60;
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text(`Budget-------->$${budget}`, 10, 10);
        doc.text(`Expanses---->$${Expanses}`, 10, 20);
        doc.text(`Savings------->$${NewSavings}`, 10, 30);
        doc.setFontSize(18);
        doc.text(`----------------------------`, 10, 40);
        doc.text(`Expanses Details :`, 10, 50);
        doc.setFontSize(16);
        //loopin list
        for(let i of MainList){
            doc.text(`${i.name} --- $${i.amount}`,10,axis);
            axis+=10;
        }
        doc.save("budget.pdf");
    }
    else{
        alert("Please add the expanses first to download.")
    }
}

function ResetLocalStorage(){
    if (confirm("Reset all Expanses and Budget?") == true) {
        MainList=[];
        budget=0;
        display();
        document.querySelector("#budget").innerHTML = budget;
        localStorage.setItem('expanses', JSON.stringify(MainList));
        localStorage.setItem('budget', JSON.stringify(budget));
    }
}