<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Project;
use app\models\Users;
use yii\helpers\ArrayHelper;

class ProjectsController extends ActiveController
{
    public $modelClass = 'app\models\Project';

    public function actionGetProjectTasks()
    {
        $request = Yii::$app->request;
        if ($request->isPost) {
            $user_id = $request->post('userId');
            $user =  Users::findOne($user_id);
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
                $projects = ArrayHelper::toArray($project->tasks);
                usort($projects, function ($a, $b) {
                    return $a['task_order'] - $b['task_order'];
                });
                $project_array['tasks'] = $projects;
                $project_array['username'] = $user->username;
                $projects_array[] = $project_array;
                usort($projects_array, function ($a, $b) {
                    return $a['project_order'] - $b['project_order'];
                });
            }

            \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            return $projects_array;
        }
        return false;
    }


    public function actionCreateNewProject()
    {
        $request = Yii::$app->request;
        if ($request->isPost) {
            $newProject = $request->post('newProject');
            $project = new Project();
            $project ->title = $newProject['projectTitle'];
            $project ->description = $newProject['projectDescription'];
            $project ->user_id = $newProject['userId'];
        }
    }




    public function actionReorderProjects()
    {
        $request = Yii::$app->request;
        if ($request->isPost) {
            $newProjectsOrder = $request->post('newProjectOrder');
            $numItems = count($newProjectsOrder);
            foreach ($newProjectsOrder as $k => $v) {
                $project = Project::findOne($v['projectId']);
                $project->project_order = $v['projectOrder'];
                $project->update();
                if (($k+1) === $numItems) {
                    if ($project->update() !== false) {
                        return 'Projects order updated successfully';
                    } else {
                        return 'Projects order update failed';
                    }
                }
            }
        }
        return false;
    }

    public function actionUpdateProject()
    {
        $request = Yii::$app->request;
        if ($request->isPost) {
            $newProject = $request->post('project');
            $project = Project::findOne($newProject['id']);
            $project->title         =   $newProject['title'];
            $project->description   =   $newProject['description'];
            $project->user_id       =   $newProject['user_id'];
            $project->project_order =   $newProject['project_order'];
            $project->update();

            if ($project->update() !== false) {
                return 'Project updated successfully';
            } else {
                return 'Project update: failed!';
            }
        }
        return false;
    }
    
    




}