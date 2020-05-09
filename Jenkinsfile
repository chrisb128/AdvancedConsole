pipeline {
  agent {
    docker {
      filename: 'build.Dockerfile'
      args: '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }
  stages {
    stage('Install Packages') {
      parallel {
        stage('Install Packages - API') {
          steps {
            dir(path: 'server') {
              sh 'npm install'
            }

          }
        }

        stage('Install Packages - Client') {
          steps {
            dir(path: 'client') {
              sh 'npm install'
            }

          }
        }

      }
    }

    stage('Build') {
      parallel {
        stage('Build Server') {
          steps {
            dir(path: 'server') {
              sh 'npm run build'
            }

          }
        }

        stage('Build Client') {
          steps {
            dir(path: 'client') {
              sh 'npm run build'
            }

          }
        }

      }
    }
  }
}