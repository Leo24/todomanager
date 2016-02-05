<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tasks".
 *
 * @property integer $id
 * @property string $title
 * @property string $description
 * @property string $create_date
 * @property string $due_date
 * @property integer $complited
 * @property string $priority
 * @property integer $project_id
 * @property integer $task_order
 */
class Task extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tasks';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'description', 'create_date', 'due_date', 'complited', 'priority', 'project_id', 'task_order'], 'required'],
            [['description'], 'string'],
            [['create_date', 'due_date'], 'safe'],
            [['complited', 'project_id', 'task_order'], 'integer'],
            [['title'], 'string', 'max' => 128],
            [['priority'], 'string', 'max' => 64]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'description' => 'Description',
            'create_date' => 'Create Date',
            'due_date' => 'Due Date',
            'complited' => 'Complited',
            'priority' => 'Priority',
            'project_id' => 'Project ID',
            'task_order' => 'Task Order',
        ];
    }
}
