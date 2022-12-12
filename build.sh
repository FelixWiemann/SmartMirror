if [ "$target" = "" ]
then
  echo "usage:"
  echo "set global \$target variable before running this script"
  echo "e.g. export target='user@targettodeployto'"
  echo "target user needs to have root permissions to be able to clean the server path"
  exit -1
fi
  
echo "deploying build to" $target
rm -r ./weather/dist
pushd ./weather
ng build 
popd
rm ./mirror.tgz
tar -zcvf mirror.tgz ./weather/dist
echo "copy build to" $target
scp ./mirror.tgz $target:~/mirror.tgz
echo "installing build remotely" $target
ssh -t $target 'echo "deleting old build"; sudo rm -rf /var/www/html/; sudo mkdir /var/www/html;echo "unpacking" ;sudo tar -zxvf ~/mirror.tgz -C /var/www/html;echo "rebooting in 10..."; sleep 10; sudo reboot'