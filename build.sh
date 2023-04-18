if [ "$target" = "" ]
then
  echo "usage:"
  echo "set global \$target variable before running this script"
  echo "e.g. export target='user@targettodeployto'"
  echo "target user needs to have root permissions to be able to clean the server path"
  exit -1
fi
  
echo "deploying build to" $target
rm -r ./display/dist
pushd ./display
ng build 
popd
rm ./mirror.tgz
tar -zcvf mirror.tgz -C ./display/dist/display .
pushd ./core
python -m pip freeze > requirements.txt
popd
# exclude cache from develop machine
# exclude GPIO development implementation for development env 
tar --exclude='*/__pycache__*' --exclude='*/pyGPIO2*' -zcvf core.tgz -C ./core .
echo "copy build to" $target
scp ./mirror.tgz $target:~/mirror.tgz
scp ./core.tgz $target:~/core.tgz
echo "installing build remotely" $target
ssh -t $target 'echo "deleting old build";
 sudo rm -rf /var/www/html/; 
 sudo mkdir /var/www/html;
 sudo rm -rf /var/mirror/; 
 sudo mkdir /var/mirror;
 [ ! -d "/var/log/mirror" ] && sudo mkdir /var/log/mirror;
 echo "unpacking" ;
 sudo tar -zxvf ~/mirror.tgz -C /var/www/html;
 sudo tar -zxvf ~/core.tgz -C /var/mirror;
 cd /var/mirror;
 echo "installing requirements" ;
 # sudo python3 -m pip install -r requirements.txt;
 echo "rebooting in 10..."; 
 sleep 10; 
 sudo reboot'
 
sleep 60
ssh $target -t "tail -f /var/log/mirror/server.log"
