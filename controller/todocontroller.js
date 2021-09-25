const Todo = require("../model/Todo");



exports.addtodo = async (req, res) => {

    try{
        let new_todo = new Todo(req.body)
        return res.status(200).send({
            error:null,
            data: new_todo,
            message: "Todo created successfully"
        })
    }catch(err){
        return res.status(400).send({
            error: err.message,
            data:null,
            message:"Error while adding to the database"
        })
    }

};



exports.getalltodo = async (req, res) => {

    try{
        let all_todo = await Todo.find().sort({createdAt: 'desc'})   // 'asc'
        return res.status(200).send({
            error:null,
            data: all_todo,
            message: "All tasks found successfully"
        })
    }catch(err){
        return res.status(400).send({
            error: err.message,
            data:null,
            message:"Error while fetching data"
        })
    }
};



exports.gettodoById = async (req, res) => {

    try{
        let todo = await Todo.findById({ _id: req.params.id });
        return res.status(200).send({
            error:null,
            data: todo,
            message: "Task found successfully"
        })
    }catch(err){
        return res.status(400).send({
            error: err.message,
            data:null,
            message:"Error while fetching data"
        })
    }
};

exports.updatetodo = async (req, res) => {

    let id = req.params.id;

    try{
        let updated_todo = await Todo.findByIdAndUpdate(id, req.body,{new:true})
        return res.status(200).send({
            error:null,
            data: updated_todo,
            message: "Task updated successfully"
        })
    }catch(err){
        return res.status(400).send({
            error: err.message,
            data:null,
            message:"Error while updating data"
        })
    }
    
}


exports.deletetodo = async (req, res) => {
    
    let id = req.params.id;
    try{
        const todo = await Todo.findOneAndDelete({ _id: id });
        return res.status(200).send({
            error:null,
            data: todo,
            message: "Todo deleted successfully"
        })
    }catch(err){
        return res.status(400).send({
            error: err.message,
            data:null,
            message:"Error while deleting data"
        })
    }
};


exports.bytitle = async (req, res) => {
    
    const title = req.body.title
 
    try{
        let todo = await Todo.find({ title: title });
        if(todo.length == 0){
            return res.status(200).send({
                error:null,
                data: todo,
                message: `Task titled ${title} not present in the database`
            })
        }else{
            return res.status(200).send({
                error:null,
                data: todo,
                message: `Task titled ${title} found successfully`
            })
        }
    }catch(err){
        return res.status(400).send({
            error: err.message,
            data:null,
            message:"Error while fetching data"
        })
    }
}

exports.bycategory = async (req, res) => {
    
    const cat = req.body.category

    try{
        let todo = await Todo.find({ category: cat });
        return res.status(200).send({
            error:null,
            data: todo,
            message: `Tasks found for category ${cat} `
        })
    }catch(err){
        return res.status(400).send({
            error: err.message,
            data:null,
            message:"Error while fetching data"
        })
    }
}


exports.completetodo = async (req, res) => {

    let id = req.params.id;

    try{
        let todo = await Todo.findById({ _id: req.params.id });
        // console.log(todo)
        if(todo.todo_status == "completed"){
            return res.status(200).send({
                error:null,
                data: todo,
                message: "Task is already completed"
            })
        }
        let updated_todo = await Todo.findByIdAndUpdate(id, {todo_status:"completed"},{new:true})
        return res.status(200).send({
            error:null,
            data: updated_todo,
            message: "Task updated successfully"
        })
    }catch(err){
        return res.status(400).send({
            error: err.message,
            data:null,
            message:"Error while updating data"
        })
    }
    
}