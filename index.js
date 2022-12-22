let budget;
let Expanses = 0;
let MainList=[];
let list = ``;
let html = ``;
let NewSavings;
let UpdateId;

window.onbeforeunload = function(event)
    {
        return confirm("Confirm refresh");
    };

const AddBudget = () => {
    let GetBudget = document.querySelector("#inp-budget").value;
    if(GetBudget>0){
        budget=GetBudget;
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
        list+=`<tr class="table-danger"> <td>${i.id}. &nbsp; ${i.name}</td> <td>${i.amount}</td> <td><button onclick="GetUpdateId(${i.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pencil-square"></i></button><button style="margin-left:0.3rem" onclick="DeteleItem(${i.id})"><i class="bi bi-trash3"></i></button></td> </tr>`;
    }
    NewSavings = budget - Expanses;
    document.querySelector("#savings").innerHTML = `${NewSavings}$`;
    document.querySelector("#expanses").innerHTML = `${Expanses}$`;
    html = `<table class="table"><thead><tr><th scope="col">Expanse</th><th scope="col">Amount($)</th><th scope="col">Actions</th></tr></thead><tbody>${list}<tbody></table>`;
    document.querySelector("#list").innerHTML = html;
}

function DeteleItem(id){
    MainList.splice(id-1, 1);
    display();
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
}

function generatePDF() {
    if(MainList.length>0){
        const element = document.getElementById('pdf-content');
        html2pdf().from(element).save();
    }
    else{
        alert("Please add the expanses first to download.")
    }
}