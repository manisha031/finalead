const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dm55Z21za2tndGpvZ2hzdGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2NzUwMzksImV4cCI6MTk4NTI1MTAzOX0.ZPy4arGJv5_vA8rzv9Y7KQHv69k7DE0tbzoaMI5GFeE";

const url = "https://evvnygmskkgtjoghstku.supabase.co";

const database = supabase.createClient(url, key);

let save = document.querySelector("#save");
save.addEventListener("click", async (e) => {
    e.preventDefault();
    let productname = document.querySelector("#productname").value;
    let category = document.querySelector("#category").value;
    let gender = document.querySelector("#gender").value;
    let price = document.querySelector("#price").value;
    save.innerText = "Saving....";
    save.setAttribute("disabled", true);
    let res = await database.from("Coach").insert({
        productname : productname,
        category : category,
        gender : gender,
        price : price
    })
    if (res) {
        alert("Item Added Successfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
        productname = "";
        category = "";
        gender = "";
        price = "";
        getItem();
        getTotalCount();


    } else {
        alert("Item Not Add Successfully")
        save.innerText = "Save"
        save.setAttribute("disabled", false);
    }
})

const getItem = async () => {
    let loading = document.getElementById("loading");
    
    loading.innerText = "Loading...."
    const res = await database.from("Coach").select("*");
    
    if (res) {
        displayData(res.data);
        
    }

}

getItem();

const getTotalCount = async () => {
    let total = document.querySelector("#total");
    const res = await database.from("Coach").select("*", { count: "exact" });
    total.innerText = res.data.length;
}

getTotalCount();

const editCoach = async (id) => {


    const res = await database.from("Coach").select("*").eq("id", id);
    if (res) {
        
        document.getElementById("edit-productname").value = res.data[0].productname;
        document.getElementById("edit-category").value = res.data[0].category;
        document.getElementById("edit-gender").value = res.data[0].gender;
        document.getElementById("edit-price").value = res.data[0].price;
    }
}

const update = document.getElementById("update");

update.addEventListener("click", async () => {
    let id = document.getElementById("id").value;
    let productname = document.getElementById("edit-productname").value
    let category = document.getElementById("edit-category").value;
    let gender = document.getElementById("edit-gender").value;
    let price = document.getElementById("edit-price").value;
    update.innerText = "Updateing...."
    update.setAttribute("disabled", true);
    const res = await database.from("Coach").update({
        productname, category, gender, price
    }).eq("id", id)

    if (res) {
        alert("Item Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
        productname = "";
        category = "";
        gender = "";
        price = "";
        getItem();
        getTotalCount();

    } else {
        alert("Item Not Update Successfully")
        update.innerText = "Update"
        update.setAttribute("disabled", false);
    }
})


const deleteItem = async (id) => {
    const res = await database.from("Coach").delete().eq("id", id)

    if (res) {
        alert("Item Deleted successfully")
        getItem();
        getTotalCount();

    } else {
        alert("Item Deleted successfully")
    }
}

const filterdata = async() => {
    const searchVal = `%${document.getElementById('myInput').value}%`;
let res = await database
  .from('Coach')
  .select("*")
  .ilike('productname', searchVal)
  displayData(res.data);
} 


const displayData = (data) => {
    let tbody = document.getElementById("tbody");
    let loading = document.getElementById("loading");

    let tr = "";
    for (var i in data) {
        tr += `<tr>
     <td>${parseInt(i) + 1}</td>
     
     <td>${data[i].productname}</td>
     <td>${data[i].category}</td>
     <td>${data[i].gender}</td>
     <td>${data[i].price}</td>
     <td><button class="btn btn-primary" data-bs-toggle="modal"
     onclick='editCoach(${data[i].id})' data-bs-target="#editModel">Update</button></td>
     <td><button onclick='deleteItem(${data[i].id})' class="btn btn-danger">Remove</button></td>
     </tr>`;
    }
    tbody.innerHTML = tr;
    loading.innerText = ""
}