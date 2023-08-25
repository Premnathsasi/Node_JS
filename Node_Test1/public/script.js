let myForm = document.querySelector("#myform");
let title = document.querySelector("#title");
let description = document.querySelector("#desc");
let pendingTask = document.querySelector("#taskPending");
let completedTask = document.querySelector("#taskCompleted");

myForm.addEventListener("submit", submitHandler);

async function submitHandler(event) {
  try {
    event.preventDefault();
    let data = {
      title: title.value,
      description: description.value,
      isCompleted: false,
    };
    const res = await axios.post(
      "https://crudcrud.com/api/24015575f0fe4784a03c2ae110576039",
      data
    );
    console.log(res);
    showOnscreen(data);
  } catch (err) {
    document.body.innerHTML =
      document.body.innerHTML + "<h4> Something went wrong </h4>";
    console.log(err);
  }
}

const showOnscreen = async (obj) => {
  try {
    let li = document.createElement("li");
    let delBtn = document.createElement("i");
    let doneBtn = document.createElement("i");
    delBtn.className = "fa-solid fa-xmark";
    doneBtn.className = "fa-solid fa-check";

    li.appendChild(
      document.createTextNode(
        `Task: ${obj.title} <---> Description:${obj.description}`
      )
    );

    if (obj.isCompleted) {
      completedTask.appendChild(li);
    } else {
      pendingTask.appendChild(li);
      li.appendChild(doneBtn);
      li.appendChild(delBtn);
    }

    myForm.reset();
  } catch (err) {}
};
