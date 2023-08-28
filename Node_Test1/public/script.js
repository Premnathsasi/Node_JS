let myForm = document.querySelector("#myform");
let title = document.querySelector("#title");
let description = document.querySelector("#desc");
let pendingTask = document.querySelector("#taskPending");
let completedTask = document.querySelector("#taskCompleted");

myForm.addEventListener("submit", onSubmit);

async function onSubmit(event) {
  try {
    event.preventDefault();
    let data = {
      title: title.value,
      description: description.value,
    };
    const res = await axios
      .post("http://localhost:4000/todo/postTodo", data)
      .then((res) => {
        showOnscreen(res.data.data);
        console.log(res);
      });
  } catch (err) {
    document.body.innerHTML =
      document.body.innerHTML + "<h4> Something went wrong </h4>";
    console.log(err);
  }
}

const showOnscreen = async (obj) => {
  try {
    let li = document.createElement("li");
    let doneBtn = document.createElement("i");
    let delBtn = document.createElement("i");

    delBtn.className = "fa-solid fa-xmark";
    doneBtn.className = "fa-solid fa-check";

    li.appendChild(
      document.createTextNode(
        `Task: ${obj.title} <---> Description: ${obj.description}`
      )
    );

    if (obj.isCompleted) {
      completedTask.appendChild(li);
    }
    if (!obj.isCompleted) {
      pendingTask.appendChild(li);
      li.appendChild(doneBtn);
      li.appendChild(delBtn);
    }

    // Delete functionality
    delBtn.addEventListener("click", async () => {
      const res = await axios
        .delete(`http://localhost:4000/todo/deleteTodo/${obj.id}`)
        .then((res) => {
          pendingTask.removeChild(li);
        })
        .catch((err) => console.log(err));
    });

    //Complete Functionality
    doneBtn.addEventListener("click", async () => {
      const res = await axios
        .patch(`http://localhost:4000/todo/updateTodo/${obj.id}`)
        .then((res) => {
          if (res.data.data.isCompleted) {
            pendingTask.removeChild(li);
            let newli = document.createElement("li");
            newli.appendChild(
              document.createTextNode(
                `Task: ${res.data.data.title} <---> Description: ${res.data.data.description}`
              )
            );
            completedTask.appendChild(newli);
          }
        })
        .catch((err) => console.log(err));
    });

    myForm.reset();
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4000/todo/getTodo")
    .then((res) => {
      console.log(res.data.data);
      for (let i = 0; i < res.data.data.length; i++) {
        showOnscreen(res.data.data[i]);
      }
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> Something went wrong </h4>";
      console.log(err);
    });
});
