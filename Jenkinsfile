pipeline {
  agent none
  stages {
    stage('Build') {
      sh 'chmod +x ./gradlew'
      sh './gradlew buildAll'
    }
  }
}