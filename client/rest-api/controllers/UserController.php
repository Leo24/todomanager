<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Users;
use \yii\base\DynamicModel;

class UserController extends ActiveController
{
    public $modelClass = 'app\models\Users';

    /**
     * @return array or bool
     */
    public function actionCheckUser()
    {
        $request = Yii::$app->request;
        if ($request->isPost) {
            $userData = $request->post('userData');
            if ($model = Users::findOne(['username' => $userData['username']])) {
                if ($userData['password'] === $model->password) {
                    $response['id'] = $model->id;
                    $response['username'] = $model->username;

                    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
                    return $response;
                }
            }
            return 'Login incorrect';
        }
        return false;

    }

    public function actionCreateUser()
    {
        $request = Yii::$app->request;
        if ($request->isPost) {
            $newUserData = $request->post('newUserData');

            $username   =   $newUserData['username'];
            $email      =   $newUserData['email'];
            $password   =   $newUserData['password'];

            $model = DynamicModel::validateData(compact('username', 'email', 'password'));
            $model->addRule(['username', 'email', 'password'], 'string', ['max' => 128])
                ->addRule('email', 'email')
                ->validate();

            if ($model->hasErrors()) {
                // validation fails
            } else {
                // validation succeeds
                if ($userData = Users::findOne(['username' => $username])) {
                    return 'User with such username already exists. Please choose another username.';
                }

                $user = new Users();
                $user->username =   $newUserData['username'];
                $user->email    =   $newUserData['email'];
                $user->password =   $newUserData['password'];
//                $user->save();
                if ($user->save() !== false) {
                    $userData = Users::findOne(['username' => $username]);
                    $response['id'] = $userData->id;
                    $response['username'] = $userData->username;
                    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
                    return $response;

                } else {
                    return 'User create failed';
                }

            }

        }
        return false;

    }
}
