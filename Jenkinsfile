pipeline {
  agent any
  stages {
    stage('Install Packages') {
      agent {
        node {
          label 'master'
        }

      }
      steps {
        sh 'cd server && npm install'
        sh 'cd client && npm install'
      }
    }

    stage('Build') {
      agent {
        node {
          label 'master'
        }

      }
      steps {
        sh 'cd server && npm run build'
        sh 'cd client && npm run build'
      }
    }

  }
}