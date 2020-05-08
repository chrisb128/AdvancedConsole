pipeline {
  agent {
    docker {
      image 'node:10-alpine'
    }

  }
  stages {
    stage('Install Packages') {
      steps {
        sh 'cd server && npm install --verbose'
        sh 'cd client && npm install --verbose'
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