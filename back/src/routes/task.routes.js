const router = require('express').Router();


const {getTasks, postTask, putTask, deleteTask} = require('../controllers/task.controllers');

router.get('/getTasks', getTasks);
router.post('/postTask', postTask);
router.put('/putTask/:taskId', putTask);
router.delete('/deleteTask/:taskId', deleteTask);

module.exports = router;