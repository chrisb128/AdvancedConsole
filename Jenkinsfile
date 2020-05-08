pipeline {
  agent {
    dockerfile {
      filename 'build.Dockerfile'
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