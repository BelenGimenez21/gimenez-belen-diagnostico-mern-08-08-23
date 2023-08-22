const Task = require('../models/Task');

const taskController = {};

/*----------controlador para obtener todas las tareas----------*/
taskController.getTasks = async (req, res) => {

    const tasks = await Task.find({ isActive: true });

    if (!tasks || tasks.length===0) {
        return res.status(400).json({
            message: 'No se encontraron tareas.'
        });
    }

    return res.json({
        message: 'Tareas encontradas.',
        tasks
    });
};


/*----------controlador para crear una nueva tarea y guardarla en la bd----------*/
taskController.postTask = async (req, res) => {
    //se obtienen los datos
    const { title, description } = req.body;

    //se instancia un nuevo documento de MDB para ser guardado
    const newTask = new Task({
        title,
        description,
    });

    try {
        //se almacena en la bd
        const task = await newTask.save();
        //se devuelve un mensaje y la tarea creada
        return res.json({
            message: 'Tarea creada correctamente',
            task
        })
    } catch (error) {
        console.log(error)
        return res.json('Error al crear la tarea')
    }
};

/*----------controlador para marcar una tarea como completada----------*/
taskController.putTask = async (req, res) => {
    const taskId = req.params.taskId;

    const filter = { _id: taskId, isActive: true }
    const update = { finished: true }

    const updatedTask = await Task.findOneAndUpdate(filter, update);

    if (!updatedTask) {
        return res.status(400).json({
            message: 'No se pudo marcar como completada.'
        })
    }

    const task = await Task.findById(taskId)

    return res.json({
        message: 'Tarea completada.',
        task
    })

};

/*----------controlador para eliminar una tarea----------*/
taskController.deleteTask = async (req, res) => {
    const taskId = req.params.taskId;

    const filter = { _id: taskId, isActive: true }
    const update = { isActive: false }

    const deletedTask = await Task.findOneAndUpdate(filter, update);

    if (!deletedTask) {
        return res.status(400).json({
            message: 'No se pudo eliminar la tarea.'
        });
    }

    return res.json({
        message: 'Tarea eliminada correctamente.'
    });
};

module.exports = taskController;