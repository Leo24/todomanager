-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Фев 15 2016 г., 15:43
-- Версия сервера: 5.5.47-0ubuntu0.14.04.1
-- Версия PHP: 5.6.15-1+deb.sury.org~trusty+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `todo_manager`
--

-- --------------------------------------------------------

--
-- Структура таблицы `priority`
--

CREATE TABLE IF NOT EXISTS `priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `priority`
--

INSERT INTO `priority` (`id`, `title`) VALUES
(1, 'high'),
(2, 'medium'),
(3, 'low');

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `user_id`, `project_order`) VALUES
(1, 'Project_1', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n', 1, 1),
(2, 'Project_2', '    <script src="https://code.angularjs.org/1.2.28/angular-route.min.js"></script>', 2, 1),
(3, 'Project_3', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n', 3, 3),
(4, 'Project_4', 'use Yii;\r\nuse yii\\rest\\ActiveController;\r\nuse app\\models\\Task;', 2, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `create_date` date NOT NULL,
  `due_date` date NOT NULL,
  `complited` tinyint(1) NOT NULL,
  `priority` varchar(64) NOT NULL,
  `project_id` int(11) NOT NULL,
  `task_order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `create_date`, `due_date`, `complited`, `priority`, `project_id`, `task_order`) VALUES
(1, 'Task_10', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n', '2016-01-13', '2018-01-18', 0, 'low', 2, 0),
(3, 'Task_3', '3 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '2016-01-23', '2016-01-14', 1, 'medium', 2, 3),
(4, 'Task_4', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n', '2016-01-23', '2016-01-30', 0, 'medium', 2, 1),
(5, 'Task_5', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n', '2016-01-28', '2016-01-31', 1, 'high', 3, 1),
(6, 'Task_6', 'Task::find()->where([''project_id'' => $project_id])->all()', '2016-01-09', '2016-01-30', 0, 'high', 4, 0),
(8, 'Task_8', 'Task Description', '2016-02-04', '2016-02-17', 0, 'high', 2, 2),
(11, 'Task_11', '$newTask[''taskDueDate'']\nTask Description', '2016-02-04', '2016-02-12', 0, 'medium', 4, 1),
(12, 'Task_12', 'Task Description', '2016-02-04', '2017-02-03', 0, 'high', 4, 2),
(13, 'Task_13', 'Task Description', '2016-02-04', '2016-02-24', 0, 'high', 4, 3),
(14, 'Task_14', '1480629600000', '2016-02-04', '2016-03-26', 0, 'high', 4, 4),
(15, 'Task_258', 'Desc', '2016-02-10', '2016-05-20', 0, 'low', 4, 5),
(16, 'Task_2581', 'It is a long established fact that a reader will be distracted by the readable content of a page', '2016-02-12', '2016-03-05', 0, 'medium', 1, 0),
(18, 'Task_2582', 'o;p[0ifhdsgnhm,', '2016-02-15', '2016-02-24', 0, 'low', 4, 6),
(19, 'Task_2583', 'dfgjkuftgvkmhgj', '2016-02-15', '2016-04-21', 0, 'high', 4, 7),
(20, 'Task_2584', 'edthgfch', '2016-02-15', '2016-03-03', 0, 'medium', 4, 8),
(23, 'Task_2585', 'rdfogihofhgnk', '2016-02-15', '2016-03-14', 0, 'high', 4, 9),
(24, 'Task_2586', 'rgthyjuklohg', '2016-02-15', '2016-03-01', 0, 'high', 4, 10),
(25, 'Task_2587', 'ghjkln,jbhkmn', '2016-02-15', '2016-03-22', 0, 'high', 4, 11),
(26, 'Task_2588', 'gfcgjngvhngcvgngfcb', '2016-02-15', '2016-05-27', 0, 'low', 4, 12);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Leo', 'leo2410@i.ua', '21232f297a57a5a743894a0e4a801fc3'),
(2, 'admin', 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3'),
(3, 'John', 'john@yahoo.com', '21232f297a57a5a743894a0e4a801fc3');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
