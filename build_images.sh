 #!/bin/bash
 docker build -t frontend-image . && 
 cd server &&  
 docker build -t server-image . && 
 docker-compose up