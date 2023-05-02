# ToDoBot

A discord bot we are making in order to help us track progress on a planned project.
   
  
## Funtions:
##### /todo [description] [user]
- Create a task and assign it to a user
- user is an optional parameter
   - leave blank to assign task to yourself
- example: ```/todo [Finish this project] [@RandomUser]```
##### /display
- Prints a list of all tasks
##### /remove [id]
- Removes the specified task from the list
- user is an optional parameter
   - leave blank to assign task to yourself
- example: ```/remove [1]```
##### /assign [id] [user]
- Assign the specified task (based on the id) to a user
- example: ```/assign [1] [@RandomUser]```
##### /edit [id] [description]
- Edit the specified tasks description
- example: ```/edit [1] [New Task Description]```
