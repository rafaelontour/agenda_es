pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'prototipo', url: 'https://github.com/rafaelontour/agenda_es.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                    echo "Subindo containers com Docker Compose"
                    docker-compose down
                    docker-compose up -d --build
                '''
            }
        }
    }
}
