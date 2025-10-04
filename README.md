PROJECT TITLE : MainTix

DESCRIPTION:
MainTix is an online support ticketing system created to help track and manage computer laboratory maintenance requests. Faculty and staff can submit maintenance requests (tickets), track the status of the request with the administrator/technician - all online. MainTix increases efficiency, decreases downtime, and provides accountability for lab concerns.


FEATURES:

		1. User Account Management - Faculty, IT Staff, and Administrators can log in with unique accounts
		2. Ticket Creation & Submission
		      Faculty can submit maintenance or software installation requests.
		      Ticket form includes: lab room, issue type, description, and priority level.
		3. Duplicate Request Detection - System flags similar or identical requests to avoid redundancy.
		4. Creating and Submitting Tickets  
		      Requests for software installation or maintenance can be made by faculty.  
		      The lab room, issue type, description, and priority level are all included in the ticket form.
		5. Workflow for Approval
		      IT personnel have the ability to examine, accept, reject, or mark tickets in progress or resolve.
		      The system automatically notifies the faculty when actions are taken.
   

TECHNOLOGY STACK:

	Frontend: HTML, CSS, JavaScript
	Backend: PHP
	Database: MySQL
	Server: XAMPP (Apache + MySQL + PHPMyAdmin)
	Prototyping Tool: Figma 
	Version Control: GitHub


INSTALLATION:

Requirements

    Access to https://github.com/Kiahrii/MainTix/
    Visual Studio Code
    Visual Studio Code Extensions: 
       - PHP Server by brapifra 
       - PHP Intelephense by Ben Mewburn 
       - Live Server by Riwtick Dey
       - JavaScript (ES6) code snippets by charalampos karypidis
       - Code Runner by Jun Han, Bootstrap 4, Font awesome 4, Font Awesome 5 by Ashok Koyi, 
       - Disable PHP Language Features by vscode
    XAMPP
       1. Navigate to the XAMPP installation folder.
       2. Open the htdocs directory.
       3. Create a new folder named MainTix.
       4. Copy and paste the project files from GitHub into this folder.
    MySQL 
		
Steps to set up the Database

     1. Open XAMPP and start both Apache and MySQL.
     2. Open a browser (e.g. Chrome) and type http://localhost/phpmyadmin
     3. On the left panel, click New (cylinder icon).
     4. Enter ‘maintix’ as the database name , then click Create.
     5. You will be prompted to create a table name and specify the number of columns.
        Note: You can do this directly through the phpMyAdmin interface, or Switch to the SQL tab and manually enter the schema.
        Refer to the Database Schema section at the end of this document for the list of required tables.
				
How to Run the Project

    1. Ensure that Apache and MySQL are running in XAMPP.
    2. Open your browser and type: http://localhost/MainTix/index.php
    3. The project will now run in your local environment.


FILE STRUCTURE 

This section provides a brief overview of the important files and their purposes within the project.

	index.php – The main entry point of the system; serves as the landing page and may handle login functionality.
	index.html – Static version of the homepage, primarily used for initial design or testing before integrating PHP.
	dashboard.html – User interface for the system dashboard, where users can access system features.
	dashboard.css – Stylesheet that defines the layout, design, and overall look of the dashboard.
	dashboard.js – JavaScript file responsible for interactive features and dynamic functionality within the dashboard.
	script.js – Handles general front-end behaviors, such as form validation and event handling.
	style.css – Main stylesheet for the project; defines the overall design of the system outside the dashboard.
	maintix.sql – Database schema file used to create and set up the project’s database in MySQL.

Note: The file structure is subject to change as the project progresses. Additional folders such as /assets, /includes, or /modules may be 
introduced later for better organization.


USAGE

    1. Register (Create Account)
          On the landing page, click the “Sign Up” button.
          Complete the registration form by providing the following details:
              - First Name
              - Last Name
              - TIN Number
              - Department
              - Email/Username
              - Password 
          Once the form is completed, click “Sign Up” to create a new account.
    2. Log In
          On the landing page, click the “Sign In” button.
          Enter your  registered email and password.
          Click the “Sign In” button to access the system.
    3. Submit Tickets
          Navigate to the Room Tab
          Select the room where the issue is occurring  (for example. PTC 303, MAC LAB, ITS 200, etc.)
          Select the issue(s) that require maintenance:
               - Missing Keyboard / Mouse
               - Non-working Keyboard / Mouse
               - Non-working PCs
               - Install Software (requires a specified field)
               - Missing Cables
               - Dirty/To Clean
               - Other Issue (to be specified manually)
          Select the Priority Level:
                - Low
                - Normal
                - High
                - Urgent
          Click the “Submit Request” button to submit the ticket
          Once the request has been submitted successfully, a confirmation message (e.g., “Request Sent”) will appear.
    4. View Submitted Tickets
          To check the tickets you submitted, navigate to the Requests section on the dashboard.
          Each ticket displays the following details:
               - Ticket ID
               - Room
               - Reported Concern
               - Current Status (Pending, In Progress, or Completed)
    5. Status Updates
          Changes in ticket status and updates will be reflected in the Status column of the Request table.
          This serves as a notification system to notify users of the current status and when the request has been completed.


DATABASE SCHEMA

	Table 1: user_info
	CREATE TABLE `user_info` (
	  `employee_id` INT(11) NOT NULL,
	  `first_name` VARCHAR(20) NOT NULL,
	  `last_name` VARCHAR(20) NOT NULL,
	  `tin_no` VARCHAR(11) NOT NULL,
	  `department` ENUM('CITE','CEA') NOT NULL,
	  `username` VARCHAR(50) NOT NULL,
	  `password_hash` VARCHAR(20) NOT NULL, 
	  `user_type` ENUM('requester','admin') NOT NULL DEFAULT 'requester',
	  `user_status` ENUM('active','inactive') NOT NULL DEFAULT 'active'
	);

	Table 2: concern
	CREATE TABLE `concern` (
	  `concern_id` INT(11) NOT NULL,
	  `concern_name` ENUM(
	    'Missing Keyboard',
	    'Missing Mouse',
	    'Missing Cables',
	    'Non-working Keyboard',
	    'Non-working Mouse',
	    'Non-working PCs',
	    'Need Cleaning'
	  ) NOT NULL,
	  `concern_install` VARCHAR(50) DEFAULT NULL,
	  `concern_other` VARCHAR(255) DEFAULT NULL
	);

	Table 3: ticket
	CREATE TABLE `ticket` (
	  `ticket_id` INT(11) NOT NULL,
	  `employee_id` INT(11) NOT NULL,
	  `lab_room` ENUM('ITS 200','ITS 201','MAC LAB','PTC 303','PTC 304','PTC 305','PTC 306') NOT NULL,
	  `status` ENUM('Pending','Approved','Declined','In Progress','Resolved') NOT NULL,
	  `priority` ENUM('low','normal','high','urgent') NOT NULL,
	  `date_submitted` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	  `date_resolved` DATETIME DEFAULT NULL
	);

	Table 4: request
	CREATE TABLE `request` (
	  `ticket_id` int(11) NOT NULL,
	  `concern_id` int(11) NOT NULL
	);

Constrains & Indexes
Primary keys

	ALTER TABLE `user_info`
	ADD PRIMARY KEY (`employee_id`),
	ADD UNIQUE KEY `username_unique` (`tin_no`, `username`);
	
	ALTER TABLE `concern`
	ADD PRIMARY KEY (`concern_id`);
	
	ALTER TABLE `ticket`
	ADD PRIMARY KEY (`ticket_id`),
	ADD KEY `fk_employee_id_ticket` (`employee_id`);
	
	ALTER TABLE `request`
	ADD PRIMARY KEY (`ticket_id`, `concern_id`),
	ADD KEY `fk_concern_id_ticket` (`concern_id`);

Auto-increment

	ALTER TABLE `user_info`
	MODIFY `employee_id` INT(11) NOT NULL AUTO_INCREMENT;
	
	ALTER TABLE `concern`
	MODIFY `concern_id` INT(11) NOT NULL AUTO_INCREMENT;
	
	ALTER TABLE `ticket`
	MODIFY `ticket_id` INT(11) NOT NULL AUTO_INCREMENT;

Foreign keys

	ALTER TABLE `ticket`
	ADD CONSTRAINT `fk_employee_id_ticket`
	FOREIGN KEY (`employee_id`) REFERENCES `user_info` (`employee_id`)
	ON UPDATE CASCADE;
	
	ALTER TABLE `request`
	ADD CONSTRAINT `fk_concern_id_ticket`
	FOREIGN KEY (`concern_id`) REFERENCES `concern` (`concern_id`)
	ON UPDATE CASCADE,
	
	ADD CONSTRAINT `fk_ticket_id_request`
	FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)
	ON UPDATE CASCADE;










