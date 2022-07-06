// console.clear();

let contentTitle;

console.log(document.cookie);
function dynamicFashionSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = location.href.slice(0, location.href.lastIndexOf("/"))+"/contentDetails.html?" + ob.id;
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

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicFashionSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerFashion = document.getElementById("containerFashion");

// JSON CALLING

const url = "data.json";
function reqData(){
  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(json => {
    contentTitle = json.data
      // console.log("contentTitle",contentTitle)
      if (document.cookie.indexOf(",counter=") >= 0) {
        var counter = document.cookie.split(",")[1].split("=")[1];
        // console.log("counter",counter)
        // document.getElementById("badge").innerHTML = counter;
      }
      for (let i = 0; i < contentTitle.length; i++) {
        if (!contentTitle[i].isGadget) {
          containerFashion.appendChild(
            dynamicFashionSection(contentTitle[i])
          );
        }
      }
  })
  .catch((err)=>{console.log(err)});
}
reqData();

