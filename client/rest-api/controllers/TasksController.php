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
                $task = Task::findOne($v['id']);
                $task->task_order = $v['task_order'];
                $task->update();
                if (($k+1) === $numItems) {
                    if ($task->update() !== false) {
                        return 'Update successful';
                    } else {
                        return 'Update failed';
                    }
                }
            }
        }
        return false;
    }
}
