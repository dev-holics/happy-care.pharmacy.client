pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'echo "Test"'
            }
        }
        stage("Deploy Stage") {
            steps {
                sh 'echo "Deploy stage begin"'
            }
        }
    }
}
