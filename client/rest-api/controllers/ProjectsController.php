<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Project;
use yii\helpers\ArrayHelper;

class ProjectsController extends ActiveController
{
    public $modelClass = 'app\models\Project';

    public function actionGetProjectTasks()
    {
        $user_id = 2;
        $request = Yii::$app->request;
        if ($request->isGet) {
            $projects = Project::find()
                ->where(['user_id' => $user_id])
                ->joinWith([
                    'tasks' => function (\yii\db\ActiveQuery $query) {
                        $query->orderBy('tasks.title');
                    }
                ])->all();

            $projects_array = array();
            foreach ($projects as $project) {
                $project_array = ArrayHelper::toArray($project);
                $tasks = ArrayHelper::toArray($project->tasks);
                usort($tasks, function ($a, $b) {
                    return $a['task_order'] - $b['task_order'];
                });
                $project_array['tasks'] = $tasks;
                $projects_array[] = $project_array;
            }

            \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            return $projects_array;
        }
        return false;
    }

}