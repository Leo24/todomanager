<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Task;

class TasksController extends ActiveController
{
    public $modelClass = 'app\models\Task';

    public function actionProjectTasks()
    {
        $id = '';
        $request = Yii::$app->request;
        if ($request->isPost) {
            $id = $request->post('project_id');
        }
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $tasks = Task::find()->where(['project_id' => $id])->all();
        return $tasks;
    }

    public function actionReorderTasks()
    {
        $request = Yii::$app->request;
        if ($request->isPost) {
            $newTaskOrder = $request->post('newTaskOrder');
            $numItems = count($newTaskOrder);
            foreach ($newTaskOrder as $k => $v) {
                $task = Task::findOne($v['taskId']);
                $task->task_order = $v['taskOrder'];
                $task->update();
                if (($k+1) === $numItems) {
                    if ($task->update() !== false) {
                        return 'Task order updated successfully';
                    } else {
                        return 'Task order update failed';
                    }
                }
            }
        }
        return false;
    }

    public function actionCreateNewTask()
    {
        $date = date('Y/m/d', time());
        $request = Yii::$app->request;
        if ($request->isPost) {
            $newTask = $request->post('newTask');
            $task = new Task();
            $task->title         =   $newTask['taskTitle'];
            $task->description   =   $newTask['taskDescription'];
            $task->priority      =   $newTask['taskPriority'];
            $task->due_date      =   date('Y-m-d', strtotime($newTask['taskDueDate']));
            $task->create_date   =   $date;
            $task->project_id    =   $newTask['projectId'];
            $task->task_order    =   $newTask['taskOrder'];
            $task->complited     =   0;
            $task->save();

            if ($task->save() !== false) {
                return 'Task saved successfully';
            } else {
                return 'Task save: failed!';
            }
        }
        return false;
    }

    public function actionUpdateTask()
    {
        $request = Yii::$app->request;
        if ($request->isPost) {
            $newTask = $request->post('newTask');
            $task = Task::findOne($newTask['id']);
            $task->title         =   $newTask['title'];
            $task->description   =   $newTask['description'];
            $task->priority      =   $newTask['priority'];
            $task->due_date      =   date('Y-m-d', strtotime($newTask['due_date']));
            $task->create_date   =   $newTask['create_date'];
            $task->project_id    =   $newTask['project_id'];
            $task->task_order    =   $newTask['task_order'];
            $task->complited     =   $newTask['complited'];
            $task->update();

            if ($task->update() !== false) {
                return 'Task updated successfully';
            } else {
                return 'Task update: failed!';
            }
        }
        return false;
    }

}
