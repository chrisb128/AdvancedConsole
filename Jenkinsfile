pipeline {
  agent { 
    dockerfile {
      filename 'build.Dockerfile'
      dir '.'
      args '--volume /var/jenkins_home:/var/jenkins_home --env DOCKER_HOST=tcp://docker:2376  --env DOCKER_CERT_PATH=/certs/client  --env DOCKER_TLS_VERIFY=1 --volume jenkins-docker-certs:/certs/client'
    }
  }

  stages {

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