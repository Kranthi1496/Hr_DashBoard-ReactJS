-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2018 at 02:00 PM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aec`
--

-- --------------------------------------------------------

--
-- Table structure for table `authentication`
--

CREATE TABLE `authentication` (
  `aid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `authentication`
--

INSERT INTO `authentication` (`aid`, `name`, `email`, `password`) VALUES
(52, 'kranthi', 'kranthi@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(53, 'durga', 'durga@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(54, 'admin', 'admin@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(55, 'rohit', 'rohit@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(56, 'mayank', 'mayank@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(57, 'abhinav', 'abhinav@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(58, 'varun', 'varun@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(59, 'dheeraj', 'dheeraj@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(60, 'pavan', 'pavan@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(61, 'akash', 'akash@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(62, 'kishan', 'kishan@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(63, 'aravind', 'aravind@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(65, 'sharath', 'sharath@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(66, 'sachin', 'sachin@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(68, 'bharath', 'bharath@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(69, 'anurag', 'anurag@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(73, 'shyam', 'shyam@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(74, 'ashutosh', 'ashutosh@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(75, 'sharan', 'sharan@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(76, 'pramod', 'pramod@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `sender` varchar(200) NOT NULL,
  `receiver` varchar(200) NOT NULL,
  `message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`sender`, `receiver`, `message`) VALUES
('varun', 'pavan', 'hi pavan'),
('pavan', 'varun', 'hi varun'),
('pavan', 'varun', 'project status'),
('varun', 'pavan', 'project status'),
('varun', 'pavan', 'hi');

-- --------------------------------------------------------

--
-- Table structure for table `leaverequest`
--

CREATE TABLE `leaverequest` (
  `uid` int(200) NOT NULL,
  `mid` int(200) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `status` enum('YES','NO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leaverequest`
--

INSERT INTO `leaverequest` (`uid`, `mid`, `subject`, `description`, `startdate`, `enddate`, `status`) VALUES
(52, 61, 'sdfsdf', 'sfsdf', '2018-02-05', '2018-02-06', 'NO'),
(52, 61, 'sdfsd', 'sdfsd', '2018-02-05', '2018-02-06', 'NO'),
(52, 61, 'fd', 'fddf', '2018-02-06', '2018-02-07', 'YES'),
(52, 61, 'ytjuy', 'hjghj', '2018-02-06', '2018-02-07', 'NO'),
(52, 61, 'dff', 'fdff', '2018-02-06', '2018-02-07', 'NO'),
(52, 61, 'qq', 'qqq', '2018-02-06', '2018-02-07', 'NO'),
(52, 61, 'ffff', 'fffff', '2018-02-06', '2018-02-08', 'NO'),
(52, 61, 'leave plan in march', 'qw', '2018-02-06', '2018-02-07', 'NO'),
(52, 61, 'dsdscds', 'dsvdsv', '2018-02-14', '2018-02-24', 'NO'),
(52, 61, 'Leave Plan in march', 'Personal work', '2018-03-06', '2018-03-07', 'NO'),
(52, 61, 'Leave plan in feb', 'personal work', '2018-02-07', '2018-02-08', 'NO'),
(60, 58, 'personal day off', 'personal problem', '2018-02-06', '2018-02-20', 'YES'),
(60, 58, 'leave plan in feb', 'personal work', '2018-02-06', '2018-02-07', 'YES'),
(60, 58, 'Half day leave', 'personal work', '2018-02-07', '2018-02-08', 'NO'),
(59, 57, 'Leave Plan in March', 'Personal work', '2018-03-01', '2018-03-03', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `dob` date NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `name`, `dob`, `address`) VALUES
(52, 'kranthi', '2018-01-19', 'mbnr'),
(53, 'durga', '2018-01-10', 'ejipura'),
(54, 'admin', '2016-06-06', 'Bangalore'),
(55, 'rohit', '1991-02-15', 'BTM'),
(56, 'mayank', '1993-02-02', 'lucknow'),
(57, 'abhinav', '1994-01-03', 'lucknow'),
(58, 'varun', '1994-01-11', 'hyderabad'),
(59, 'dheeraj', '1996-06-03', 'hyderabad'),
(60, 'pavan', '1996-01-08', 'chennai'),
(61, 'akash', '1985-02-05', 'Bangalore'),
(62, 'kishan', '1990-01-17', 'Ranchi'),
(63, 'aravind', '1996-06-04', 'Chennai'),
(65, 'sharath', '1995-01-17', 'Bangalore'),
(66, 'sachin', '1995-07-12', 'Bangalore'),
(68, 'bharath', '1982-02-02', 'Bangalore'),
(69, 'anurag', '1988-02-19', 'Bangalore'),
(73, 'shyam', '1995-02-06', 'Hyderabad'),
(74, 'ashutosh', '1994-01-03', 'Hyderabad'),
(75, 'sharan', '1991-02-05', 'Bangalore'),
(76, 'pramod', '1992-06-09', 'Hyderabad');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `emp_id` int(200) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `manager_id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`emp_id`, `designation`, `manager_id`) VALUES
(52, 'Team Lead', 61),
(53, 'Senior Software Engineer', 52),
(55, 'HR', 54),
(56, 'Software Engineer', 53),
(57, 'Senior Software Engineer', 52),
(58, 'Senior Software Engineer', 52),
(59, 'Software Engineer', 57),
(60, 'Software Engineer', 58),
(61, 'Manager', 61),
(62, 'Senior Software Engineer', 52),
(63, 'Software Engineer', 58),
(65, 'Software Engineer', 62),
(66, 'Software Engineer', 53),
(68, 'Team Lead', 61),
(69, 'Senior Software Engineer', 68),
(73, 'Software Engineer', 62),
(74, 'Software Engineer', 62),
(75, 'HR', 54),
(76, 'Software Engineer', 53);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `user_id` int(200) NOT NULL,
  `task_id` int(200) NOT NULL,
  `task_title` varchar(200) NOT NULL,
  `task_desc` varchar(200) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('ASSIGNED','INPROGRESS','FINISHED') NOT NULL,
  `timestamp` enum('ADDED','MODIFIED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`user_id`, `task_id`, `task_title`, `task_desc`, `start_date`, `end_date`, `status`, `timestamp`) VALUES
(60, 4, 'Jquery_Basics', 'CURD operations', '2018-01-01', '2018-01-18', 'FINISHED', 'ADDED'),
(60, 5, 'Angular_basics', 'Developed fb prorotype.', '2017-11-01', '2017-12-01', 'FINISHED', 'ADDED'),
(60, 6, 'Employee portal', 'Adding tasks ', '2018-01-01', '2018-12-31', 'INPROGRESS', 'ADDED'),
(59, 7, 'Payment Billing Product Project', 'An Institute having different branches at different locations, want to control and maintain the accountant salary and students personal and payment details.', '2017-11-01', '2018-01-01', 'FINISHED', 'ADDED'),
(63, 8, 'Online Quiz Project', 'It provides a common platform to connect student and teacher online.', '2018-01-03', '2018-01-31', 'INPROGRESS', 'ADDED'),
(58, 9, 'Online_Library ', 'A library management software', '2017-07-01', '2017-09-01', 'FINISHED', 'MODIFIED'),
(57, 10, 'Online Exam System', 'In this project, there are given 10 questions to play.', '2017-11-01', '2017-12-01', 'FINISHED', 'ADDED'),
(53, 11, 'Exam System', 'A library management software ', '2018-01-01', '2018-01-31', 'INPROGRESS', 'ADDED'),
(62, 12, 'Fee Report', 'A fee report software ', '2018-01-20', '2018-02-28', 'INPROGRESS', 'ADDED'),
(58, 13, 'Fee Management Portal', 'A fee management application where admin can add,edit,view,delete accountant and accountant can add,view,edit,delete student, check due fee and logout.', '2018-01-22', '2018-01-31', 'FINISHED', 'ADDED'),
(65, 17, 'Angular_project', 'Developed user authentication system.', '2017-08-01', '2017-10-01', 'FINISHED', 'ADDED'),
(66, 19, 'Mailcasting Project', 'User can send mails, receive mails and delete mails locally after getting logged in!', '2018-01-18', '2018-02-16', 'INPROGRESS', 'ADDED'),
(69, 21, 'Handlebars_Project', 'Developed Employee Portal using handlebars and javascript.', '2018-01-01', '2018-01-23', 'FINISHED', 'ADDED'),
(52, 23, 'Streaming analytics', 'This is a new type of transactional system that analyzes data bit by bit as you shunt it into an analytical system in parallel.', '2017-11-01', '2017-12-01', 'FINISHED', 'ADDED'),
(52, 24, 'Data consolidation', 'The idea is you have disparate data sources, and you want to perform analysis across them. ', '2018-01-01', '2018-01-30', 'FINISHED', 'ADDED'),
(60, 25, 'Fee_Report_Software', 'A fee report software where admin can add,view,delete accountant and accountant can add,view,edit,delete student, check due fee and logout.', '2018-02-03', '2018-02-28', 'INPROGRESS', 'ADDED'),
(52, 26, 'NodeJs_Project', 'Created chat application.', '2018-02-09', '2018-02-28', 'INPROGRESS', 'MODIFIED'),
(76, 27, 'Firebase_Project', 'CURD operations.', '2018-01-01', '2018-02-01', 'FINISHED', 'ADDED'),
(61, 28, 'Payment Billing Product Project', 'Technologies used:JSP, Javascript, Ajax', '2018-01-03', '2018-02-07', 'FINISHED', 'ADDED'),
(60, 29, 'copy board', 'chrome extension tool.', '2018-01-10', '2018-02-13', 'FINISHED', 'MODIFIED');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authentication`
--
ALTER TABLE `authentication`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD UNIQUE KEY `emp_id` (`emp_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authentication`
--
ALTER TABLE `authentication`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
