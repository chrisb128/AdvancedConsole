pipeline {
  agent {
    dockerfile {
      filename 'build.Dockerfile'
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

    stage('Build Images') {
      agent {
        docker {
          image 'docker:dind'
        }

      }
      steps {
        sh 'docker build storage -t advanced-console_storage'
        sh 'docker build server -t advanced-console_api'
        sh 'docker build client -t advanced-console_client'
      }
    }

  }
}