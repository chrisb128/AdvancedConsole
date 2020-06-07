properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: ''))])

pipeline {
  agent { any }
  
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
        sh 'docker system prune'
      }
    }

    stage('Deploy to Server') {
      steps {
        sh 'chmod u+x ./deploy.sh'
        sh './deploy.sh'
      }
    }
  }
}