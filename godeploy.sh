#!/usr/bin/env bash
#echo off
SHORT_SERVER_IP=$1

SERVICE_NAME=flx-admin

# default value
SERVER_IP=129.226.53.20;
ENV=prod
SERVER_USER=root
SERVER_PWD=Flx940226
SERVICE_BASEDIR=/data/node-server/flx-admin
WORKERS=

case "$SHORT_SERVER_IP" in
#20
"ol20")
	SERVER_IP=129.226.53.20;
	ENV=prod
	SERVER_USER=root
	SERVER_PWD=Flx940226
	SERVICE_BASEDIR=/data/node-server/flx-admin
	WORKERS=
	;;

esac


TIMESTAMP=$(date +%s)


npm run build

tar -czf out/${SERVICE_NAME}-${TIMESTAMP}.tar.gz  app config client dispatch.js package.json yarn.lock ecosystem.json

scp out/${SERVICE_NAME}-${TIMESTAMP}.tar.gz ${SERVER_USER}@${SERVER_IP}:${SERVICE_BASEDIR}


echo "
  cd ${SERVICE_BASEDIR}
  mkdir ${SERVICE_NAME}-${TIMESTAMP}
  tar -zxvf ${SERVICE_NAME}-${TIMESTAMP}.tar.gz -C ${SERVICE_NAME}-${TIMESTAMP}
  cd ${SERVICE_NAME}-${TIMESTAMP}
  yarn install
  npm run build:node
  node_modules/.bin/eggctl stop --title=flx-admin
  echo nodeProcess: \`ps -ef|grep ${SERVICE_NAME}|grep /usr/bin/node |wc -l\`
  cd ${SERVICE_BASEDIR}
  rm current
  ln -s ${SERVICE_NAME}-${TIMESTAMP} current
  cd current
  ENABLE_NODE_LOG=yes node_modules/.bin/eggctl start --title=flx-admin  --port=6001 --env=${ENV} --framework=beidou --daemon
  echo nodeProcess: \`ps -ef|grep ${SERVICE_NAME}|grep /usr/bin/node |wc -l\`

  #######

";
