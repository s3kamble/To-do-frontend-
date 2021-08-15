var Tasks=[];
const taskList= document.getElementById("taskList");

window.onload = function () {
    everyTask = JSON.parse(localStorage.getItem('Task'));

           
          if ( everyTask!= null) {       
            everyTask.forEach((task) => {
                   addTaskToDom(task);
                   if(task.isCompleted==="true"){
                     let completeDiv=document.getElementById(task.taskId);
                     completeDiv.style.backgroundColor="rgba(172, 255, 47, 0.384)";
                     completeDiv.lastChild.textContent="Done";
                     completeDiv.lastChild.disabled="true";
                   }
 
             });
         
     }
       
   
  
   Tasks=everyTask.slice();
   everyTask= [];
    return;
};


let updateLocalStorage = ()=>{
    localStorage.setItem('Task', JSON.stringify(Tasks));
}

 
function Task(description,date=new Date().toLocaleString()){
    this.taskId=uuidv4();
    this.description=description;
    this.createdAt=date;
    this.isCompleted="false"
}

const addTaskToDom = (task) => {

    let taskDiv= document.createElement("div");
    let taskDesc =document.createElement("textarea");
    let taskLog = document.createElement("p");
    let delBtn =  document.createElement("button");
    let completeBtn =  document.createElement("button");
    let updateBtn =  document.createElement("button");
   
    taskDiv.className="mainCard";
    taskDiv.id=task.taskId;
    console.log(task);
    taskDesc.textContent=task.description
    taskDesc.className="taskAdded";
    taskDesc.disabled="true";

    taskLog.className="date"; 
    taskLog.textContent=task.createdAt;
    
    delBtn.textContent="Delete";
    delBtn.className="btn-danger";

    updateBtn.textContent="Edit task";
    updateBtn.className="editTask";

    completeBtn.textContent="Mark As Done";
    completeBtn.className="completeBtn";


    delBtn.onclick=()=>{
        deleteTask(taskDiv.id);
    }

    updateBtn.onclick=(e)=>{
        updateTask(taskDiv.id,taskDesc,taskLog);
    }

    completeBtn.onclick=()=>{
        completeTask(taskDiv.id);
    }

    taskDiv.appendChild(taskDesc);
    taskDiv.appendChild(taskLog);
    taskDiv.appendChild(updateBtn);
    taskDiv.appendChild(delBtn);
    taskDiv.appendChild(completeBtn);

    taskList.appendChild(taskDiv);
    
}


const taskSubmission =(event)=>{
    event.preventDefault();
   
        let taskDesc=document.taskInput.task.value;
        if(taskDesc!=" "){
            let newTask=new Task(taskDesc);
            Tasks.push(newTask);        
            addTaskToDom(newTask);
            updateLocalStorage();
            document.taskInput.task.value=" ";

    }
    else{
        alert("Empty input");
    }    
}


const deleteTask = (Taskid) =>{
   
    const index = Tasks.findIndex(obj => {
        return obj.taskId === Taskid;
    });    
    Tasks.splice(index,1);
    updateLocalStorage();

    let removeDiv=document.getElementById(Taskid);
    alert("This task will be permanently deleted");
    removeDiv.remove();

  
}


const completeTask = (Taskid) => {
 
    const index = Tasks.findIndex(obj => {
        return obj.taskId === Taskid;
    });  
   
    alert("Mark as completed?");
    Tasks[index].isCompleted="true";
    updateLocalStorage();     
    
    let completeDiv=document.getElementById(Taskid);

    if(completeDiv.isCompleted="false"){
        completeDiv.style.backgroundColor="rgba(172, 255, 47, 0.384)";
        completeDiv.lastChild.textContent="Done";
        completeDiv.lastChild.disabled="true";
    }
}



const updateTask=(Taskid,desc,log)=>{


    const index = Tasks.findIndex(obj => {
        return obj.taskId === Taskid;
    });

    if(Tasks[index].isCompleted==="false"){
        let completeDiv=document.getElementById(Taskid); 
        completeDiv.lastChild.hidden=true;
        desc.disabled="";
        
        let taskUpdate=completeDiv.getElementsByTagName("button")[0]; 
        taskUpdate.textContent="Save";

    
        taskUpdate.onclick=()=>{
            
                completeDiv.lastChild.hidden=false;
                desc.disabled="true";
                taskUpdate.textContent="Edit Task";
        
                log.textContent= new Date().toLocaleString();
                desc.textContent=desc.value;
                
                Tasks[index].description=desc.value;
                Tasks[index].createdAt=log.textContent;
            
                updateLocalStorage();
                window.location.reload();
            
            }
    }
   
          
}
 
