pipeline {
  agent { 
    dockerfile {
      filename 'build.Dockerfile'
      dir '.'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

  stages {
    stage('Initialize Agent') {
      steps {
        docker.buildImage()
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
        sh 'docker build ./client -t advanced-console_client'
      }
    }
  }
}