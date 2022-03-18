# queueup-bot

Queueup-bot is a discord queueing bot written in Typescript designed to be used for office hours for classes, or other queueing needs. 

Queue-bot features implementation of firebase and firestore as a database for storing the queue, chat history, and help history of the bot.

## Roles, Access, and Commands

**TA**

  -Access
  
    -All voice channels
    
    -All text channels
    
    -Server history
    
    -Queuing and current queue status
    
    -Dequeuing
    
  -Commands
  
    -"!next": returns next student in queue (Can only be used in ta-channel)
    
**Student**

  -Access
  
    -Queueing channel
    
    -Entering queue
    
  -Commands
  
    -"I need help": Enters student in queue (Can only be used in student-channel)
