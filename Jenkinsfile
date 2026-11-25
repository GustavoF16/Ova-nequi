pipeline {
    agent any

    tools {
        nodejs 'NodeJS-LTS'
    }

    stages {

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test -- --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'www/**/*', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado correctamente'
        }

        failure {
            echo 'Pipeline falló'
        }
    }
}