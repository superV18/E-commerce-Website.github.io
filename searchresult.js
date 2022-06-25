// console.clear();

let totalData;
let FilteredItems;
let searchedItem = document.getElementById("input").value

console.log("searchedItem",searchedItem);

console.log(document.cookie);
function dynamicFashionSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "/contentDetails.html?" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("rs  " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}


let mainContainer = document.getElementById("mainContainer");
let searchResult = document.getElementById("searchResult");

// JSON CALLING

const url = "data.json";
function reqData(searchedItem){
  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(json => {
    FilteredItems=[]
    totalData = json.data;
    if(searchedItem === ""){
        FilteredItems=totalData;
    } else{
        FilteredItems = totalData.filter((item) =>{
            return(item.name.toLowerCase().includes(searchedItem.toLowerCase()) ||
            item.description.toLowerCase().includes(searchedItem.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchedItem.toLowerCase()))
        })
    }  

      console.log("FilteredItems",FilteredItems)
      console.log("searchedItem",searchedItem)
      if (document.cookie.indexOf(",counter=") >= 0) {
        var counter = document.cookie.split(",")[1].split("=")[1];
        document.getElementById("badge").innerHTML = counter;
      }
      for (let i = 0; i < FilteredItems.length; i++) {
        if (FilteredItems[i]) {
            searchResult.appendChild(
            dynamicFashionSection(FilteredItems[i])
          );
        }
      }
  })
  .catch((err)=>{console.log(err)});
}
document.getElementById("searchIcon").addEventListener("click",()=>{
    searchedItem = document.getElementById("input").value
    searchResult.innerHTML="";
    reqData(searchedItem);
})

document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {  
    searchedItem = document.getElementById("input").value
    searchResult.innerHTML="";
    reqData(searchedItem);
  }
});

reqData(searchedItem);

