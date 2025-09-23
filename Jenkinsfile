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
                    echo "Parando e removendo containers antigos (mantendo volumes)..."
                    docker-compose down --remove-orphans

                    echo "Subindo containers com Docker Compose"
                    docker-compose up -d --build
                '''
            }
        }
    }
}
