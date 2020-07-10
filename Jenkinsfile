properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: ''))])

pipeline {
  agent { node { label 'ec2'} }

  stages {
    
    stage('Init Report') {
      steps {
        sh 'docker info'
        sh 'id -u'
        sh 'id -g'
        sh 'export JUNIT_REPORT_PATH=./report/tests.xml'
      }
    }

    stage('Install Packages') {
      parallel {
        stage('Server') {
          steps {
            dir(path: 'server') {
              sh 'npm install'
            }
          }
        }
        stage('Client') {
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
        stage('Server') {
          steps {
            dir(path: 'server') {
              sh 'npm run build'
            }
          }
        }
        stage('Client') {
          steps {
            dir(path: 'client') {
              sh 'npm run build'
            }
          }
        }
      }
    }

    stage('Test') {
      parallel {
        stage('Server') {
          steps {
            dir(path: 'server') {
              sh 'npm run test-jenkins'
            }
          }
        }
      }
    }

    stage('Build Images') {
      parallel {
        stage('Server') {
          steps {
            sh 'docker build ./server -t advanced-console_api'
          }
        }
        stage('Client') {      
          steps {
            sh 'docker build ./client -t advanced-console_client --build-arg USE_SSL="1"'
          }
        }
        stage('Storage') {
          steps {
            sh 'docker build ./storage -t advanced-console_storage'
          }
        }
      }
    }

    stage('Save Images') {
      parallel {
        stage('Server') {
          steps {
            sh 'mkdir -p ./out'
            sh 'docker save --output ./out/api.zip advanced-console_api'
          }
        }
        stage('Client') {
          steps {
            sh 'mkdir -p ./out'
            sh 'docker save --output ./out/client.zip advanced-console_client'
          }
        }
        stage('Storage') {
          steps {
            sh 'mkdir -p ./out'
            sh 'docker save --output ./out/storage.zip advanced-console_storage'
          }
        }
      }
    }

    stage('Clean Up') {
      steps {
        sh 'docker system prune -af'
        sh 'docker volume prune -f'
      }
    }

    stage('Deploy to Server') {
      when { branch 'master' }
      steps {
        withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'adv-console-prod-ssh-key', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
          sh 'echo "Prefetching deploy host key"'
          sh 'mkdir -p ~/.ssh'
          sh 'ssh-keyscan -t rsa ' + env.DEPLOY_HOST + ' >> ~/.ssh/known_hosts'
          
          sh 'cp ' + identity + ' ~/.ssh/id_rsa'
          sh 'chmod 0400 ~/.ssh/id_rsa'

          sh 'echo "Sending files to server"'
          sh 'scp -Cr ./out/ ' + userName + '@' + env.DEPLOY_HOST + ':/tmp/advanced-console/'

          sh 'echo "Loading images"'
          sh 'ssh ' + userName + '@' + env.DEPLOY_HOST + ' docker load -i /tmp/advanced-console/out/storage.zip'
          sh 'ssh ' + userName + '@' + env.DEPLOY_HOST + ' docker load -i /tmp/advanced-console/out/api.zip'
          sh 'ssh ' + userName + '@' + env.DEPLOY_HOST + ' docker load -i /tmp/advanced-console/out/client.zip'
          
          sh 'echo "Taking down"'
          sh 'ssh ' + userName + '@' + env.DEPLOY_HOST + ' docker-compose -f docker/docker-compose.yml down'
          
          sh 'echo "Bringing up"'
          sh 'ssh ' + userName + '@' + env.DEPLOY_HOST + ' docker-compose -f docker/docker-compose.yml up -d'

          sh 'echo "Cleaning up"'
          sh 'ssh ' + userName + '@' + env.DEPLOY_HOST + ' docker system prune -af'
        }
      }
    }
  }
  
  post {
    success {
      archiveArtifacts artifacts: 'out/**/*.zip', fingerprint: true
    }
    always {
      junit '**/report/tests.xml'
    }
  }
}