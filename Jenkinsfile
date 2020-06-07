properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: ''))])

pipeline {
  agent any 

  stages {
    
    stage('Init Report') {
      steps {
        sh 'id -u'
        sh 'id -g'
        sh 'ls -al /var/artifacts'
      }
    }

    stage('Install Packages') {

      steps {
        dir(path: 'server') {
          sh 'npm install'
        }

        dir(path: 'client') {
          sh 'npm install'
        }
      }
    }

    stage('Build') {

      steps {
        dir(path: 'server') {
          sh 'npm run build'
        }

        dir(path: 'client') {
          sh 'npm run build'
        }
      }
    }

    stage('Build Images') {      
      steps {
        sh 'docker build ./storage -t advanced-console_storage'
        sh 'docker build ./server -t advanced-console_api'
        sh 'docker build ./client -t advanced-console_client --build-arg USE_SSL="1"'
      }
    }

    stage('Archive Images') {
      steps {

        sh 'mkdir -p ./out'
        sh 'docker save --output ./out/storage.zip advanced-console_storage'
        sh 'docker save --output ./out/api.zip advanced-console_api'
        sh 'docker save --output ./out/client.zip advanced-console_client'
        
        archiveArtifacts artifacts: 'out/**/*.zip', fingerprint: true
      }
    }

    stage('Cleaning Up') {
      steps {
        sh 'docker system prune -a'
      }
    }

    stage('Deploy to Server') {

      steps {
        withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'adv-console-prod-ssh-key', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
          sh 'echo "Prefetching deploy host key"'
          sh 'mkdir -p ~/.ssh'
          sh 'ssh-keyscan -t rsa ' + env.DEPLOY_HOST + ' >> ~/.ssh/known_hosts'

          sh 'echo "' + identity + '\n' + userName + '" >> /var/docker/secrets/id_info.txt'

          sh 'echo "Sending files to server"'
          sh 'scp -Cr -i ' + identity + ' ./out/ ' + userName + '@' + env.DEPLOY_HOST + ':/tmp/advanced-console/'

          sh 'echo "Loading images"'
          sh 'ssh -i ' + identity + ' '+ userName + '@' + env.DEPLOY_HOST + ' docker load -i /tmp/advanced-console/out/storage.zip'
          sh 'ssh -i ' + identity + ' '+ userName + '@' + env.DEPLOY_HOST + ' docker load -i /tmp/advanced-console/out/api.zip'
          sh 'ssh -i ' + identity + ' '+ userName + '@' + env.DEPLOY_HOST + ' docker load -i /tmp/advanced-console/out/client.zip'
          
          sh 'echo "Taking down"'
          sh 'ssh -i ' + identity + ' '+ userName + '@' + env.DEPLOY_HOST + ' docker-compose -f docker/docker-compose.yml down'
          
          sh 'echo "Bringing up"'
          sh 'ssh -i ' + identity + ' '+ userName + '@' + env.DEPLOY_HOST + ' docker-compose -f docker/docker-compose.yml up -d'
        }
      }
    }
  }
}