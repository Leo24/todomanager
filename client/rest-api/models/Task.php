<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "tasks".
 *
 * @property integer $id
 * @property string $title
 * @property string $description
 * @property string $create_date
 * @property string $due_date
 * @property integer $priority
 * @property integer $project_id
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
            [['title', 'description', 'create_date', 'due_date', 'priority', 'project_id'], 'required'],
            [['description'], 'string'],
            [['create_date', 'due_date'], 'safe'],
            [['priority', 'project_id'], 'integer'],
            [['title'], 'string', 'max' => 128]
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
            'priority' => 'Priority',
            'project_id' => 'Project ID',
        ];
    }
}
