pipeline {
  agent {
    docker {
      image 'node:12-alpine'
    }

  }
  stages {
    stage('Install Packages') {
      steps {
        sh 'cd server && npm install'
        sh 'cd client && npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'cd server && npm run build'
        sh 'cd client && npm run build'
      }
    }

  }
}