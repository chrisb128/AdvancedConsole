pipeline {
  agent {
    dockerfile {
      filename 'build.Dockerfile'
    }

  }
  stages {
    stage('Install Packages') {
      steps {
        dir(path: 'server') {
          sh 'npm install'
        }

      }
      steps {
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

      }
      steps {
        dir(path: 'client') {
          sh 'npm run build'
        }

      }
    }
  }
}