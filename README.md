
pm2 start service.js --name "server"
pm2 start api.js --name "api"
pm2 start npm --name "my-app" -- run start




pm2 start --name app npx -- serve -s build
d


------------
pm2 delete server
pm2 delete service
pm2 delete api

-----

pm2 start npm --name "croco" -- start
pm2 start serve --name "app" -- -s build

pm2 start pm2.config.js --name "app"

node --max-old-space-size=4096 node_modules/.bin/craco build


nodemon --ignore data


htop
pm2 monit


Stop-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess -Force

--------------------
$path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
$newPath = "$path;C:\Program Files\Git\cmd"
[System.Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")

sudo kill -9 $(sudo lsof -t -i:3001)
#   d a s h b o a r d  
 