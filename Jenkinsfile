pipeline {
  agent none
  stages {
    stage('Build') {
      steps {
        sh 'chmod +x ./gradlew'
        sh './gradlew buildAll'
      }
    }
  }
}