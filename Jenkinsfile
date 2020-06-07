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
        archiveArtifacts artifacts: 'out/*.zip', fingerprint: true
      }
    }

    stage('Cleaning Up') {
      steps {
        sh 'docker system prune -a'
      }
    }

      stage('Deploy to Server') {
        steps {
          withCredentials([sshUserPrivateKey(credentialsId: 'adv-console-prod-ssh-key', keyFileVariable: 'identity', usernameVariable: 'userName')]) {
          
            def remote = [:]
            remote.name = ${env.DEPLOY_HOST}
            remote.host = ${env.DEPLOY_HOST}
            remote.user = userName
            remote.identityFile = identity
            remote.allowAnyHosts = true

            sh 'mkdir -p ~/.ssh'
            sh 'ssh-keyscan -t rsa ' + ${env.DEPLOY_HOST} + ' >> ~/.ssh/known_hosts'

            sshPut remote: remote, from: './out/', into: '/tmp/advanced-console'
            sshCommand remote: remote, command: 'docker load -i /tmp/advanced-console/out/storage.zip'
            sshCommand remote: remote, command: 'docker load -i /tmp/advanced-console/out/api.zip'
            sshCommand remote: remote, command: 'docker load -i /tmp/advanced-console/out/client.zip'
            sshCommand remote: remote, command: 'docker-compose -f docker/docker-compose.yml down'
            sshCommand remote: remote, command: 'docker-compose -f docker/docker-compose.yml up -d'
          }
        }
      }
    }
  }
}